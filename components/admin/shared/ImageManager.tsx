"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Image, UploadCloud, Loader2, Link as LinkIcon, ChevronDown, ChevronUp } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { StorageCMS } from "@/lib/supabase-cms"
import type { ProjectImage } from "@/lib/supabase"

type Props = {
  images: ProjectImage[]
  onImagesChange: (images: ProjectImage[]) => void
  bucketName: 'project-images' | 'blog-images'
  placeholder?: string
}

export function ImageManager({ images, onImagesChange, bucketName, placeholder }: Props) {
  const { mode, color } = useThemeContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploadingIndices, setUploadingIndices] = useState<Set<number>>(new Set())
  const [bulkUploading, setBulkUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [showUrlInput, setShowUrlInput] = useState<Set<number>>(new Set())
  // Track newly uploaded images that need alt/caption
  const [needsMetadata, setNeedsMetadata] = useState<Set<number>>(new Set())

  const isDark = mode === "dark" || color === "black"

  const nextId = () => Math.max(0, ...images.map(img => img.id)) + 1

  const addImage = () => {
    onImagesChange([...images, { id: nextId(), url: "", alt: "", caption: "" }])
  }

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
    setNeedsMetadata(prev => { const n = new Set(prev); n.delete(index); return n })
  }

  const updateImage = (index: number, field: keyof ProjectImage, value: string | number) => {
    const updated = [...images]
    updated[index] = { ...updated[index], [field]: value }
    onImagesChange(updated)
    // Clear metadata highlight once user fills alt
    if (field === "alt" && typeof value === "string" && value.trim()) {
      setNeedsMetadata(prev => { const n = new Set(prev); n.delete(index); return n })
    }
  }

  const toggleUrlInput = (index: number) => {
    setShowUrlInput(prev => {
      const n = new Set(prev)
      if (n.has(index)) n.delete(index); else n.add(index)
      return n
    })
  }

  // Upload a single file and return the public URL
  const uploadFile = async (file: File): Promise<string> => {
    return StorageCMS.uploadImage(file, bucketName)
  }

  // Handle file(s) from picker or drop
  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArr = Array.from(files)
    if (fileArr.length === 0) return

    setBulkUploading(true)
    setUploadError(null)

    let currentId = nextId()
    const newImages: ProjectImage[] = []
    const newNeedsMetadata = new Set(needsMetadata)

    for (const file of fileArr) {
      const tempIndex = images.length + newImages.length
      try {
        const url = await uploadFile(file)
        if (url) {
          newImages.push({
            id: currentId,
            url,
            alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            caption: "",
          })
          newNeedsMetadata.add(tempIndex)
          currentId++
        }
      } catch (e: any) {
        setUploadError(e?.message || `Failed to upload ${file.name}`)
      }
    }

    if (newImages.length > 0) {
      // Remove any empty placeholder rows (no URL) before appending uploaded images
      const existingWithContent = images.filter(img => img.url.trim() !== "")
      const merged = [...existingWithContent, ...newImages]
      // Recalculate metadata indices based on merged array
      const finalMetadata = new Set<number>()
      merged.forEach((img, idx) => {
        if (idx >= existingWithContent.length) finalMetadata.add(idx)
      })
      onImagesChange(merged)
      setNeedsMetadata(finalMetadata)
    }
    setBulkUploading(false)
  }, [images, needsMetadata, bucketName])

  // Per-image upload (replace URL on existing row)
  const handleSingleUpload = async (index: number, file: File) => {
    setUploadingIndices(prev => new Set(prev).add(index))
    setUploadError(null)
    try {
      const url = await uploadFile(file)
      if (url) {
        const updated = [...images]
        updated[index] = {
          ...updated[index],
          url,
          alt: updated[index].alt || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        }
        onImagesChange(updated)
        setNeedsMetadata(prev => new Set(prev).add(index))
      }
    } catch (e: any) {
      setUploadError(e?.message || "Upload failed")
    } finally {
      setUploadingIndices(prev => { const n = new Set(prev); n.delete(index); return n })
    }
  }

  // Drag-and-drop handlers
  const onDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragOver(true) }, [])
  const onDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragOver(false) }, [])
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium theme-text theme-transition">
          <Image className="inline w-4 h-4 mr-2" />
          {bucketName === 'blog-images' ? 'Blog Images' : 'Project Images'}
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.currentTarget.value = "" }}
          />
          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={bulkUploading} className="bg-transparent">
            <UploadCloud className="w-4 h-4 mr-1" />
            {bulkUploading ? "Uploading..." : "Upload"}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={addImage} className="bg-transparent">
            <Plus className="w-4 h-4 mr-1" />
            Add URL
          </Button>
        </div>
      </div>

      {uploadError && <p className="text-sm text-red-500 mb-2">{uploadError}</p>}

      {/* Drop zone — shown when empty OR when dragging */}
      {(images.length === 0 || dragOver) && (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-8 mb-3 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/10 scale-[1.01]"
              : isDark ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {bulkUploading ? (
            <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-primary" />
          ) : (
            <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${dragOver ? "text-primary" : "opacity-50"}`} />
          )}
          <p className="text-sm theme-text opacity-70">
            {bulkUploading ? "Uploading images..." : dragOver ? "Drop images here" : "Drag & drop images here, or click to browse"}
          </p>
          <p className="text-xs theme-text opacity-40 mt-1">
            Uploads to <span className="font-mono">{bucketName}</span> bucket
          </p>
        </div>
      )}

      {/* Image list */}
      <div className="space-y-3 max-h-[28rem] overflow-y-auto">
        {images.map((image, index) => {
          const isUploading = uploadingIndices.has(index)
          const highlightMeta = needsMetadata.has(index) && image.url && !image.alt?.trim()

          return (
            <div
              key={image.id}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`p-3 border rounded-lg transition-colors ${isDark ? "border-gray-600 bg-gray-800/30" : "border-gray-300 bg-gray-50/30"}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Thumbnail */}
                <div className="md:col-span-2 flex items-center justify-center">
                  <div className="relative w-full aspect-video max-h-24 overflow-hidden rounded bg-muted">
                    {isUploading ? (
                      <div className="flex items-center justify-center h-full"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                    ) : image.url ? (
                      <img src={image.url} alt={image.alt || "Preview"} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Image className="w-6 h-6 opacity-30" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Alt & Caption */}
                <div className="md:col-span-4">
                  <label className="block text-[11px] font-medium theme-text opacity-60 mb-0.5">Alt Text *</label>
                  <Input
                    value={image.alt}
                    onChange={(e) => updateImage(index, 'alt', e.target.value)}
                    placeholder="Describe the image"
                    className={`theme-text bg-transparent text-sm ${highlightMeta ? "border-amber-400 ring-1 ring-amber-400/50" : ""}`}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-medium theme-text opacity-60 mb-0.5">Caption</label>
                  <Input
                    value={image.caption || ""}
                    onChange={(e) => updateImage(index, 'caption', e.target.value)}
                    placeholder="Optional caption"
                    className="theme-text bg-transparent text-sm"
                  />
                </div>

                {/* Actions */}
                <div className="md:col-span-3 flex items-center gap-1.5 justify-end">
                  <input
                    id={`img-upload-${image.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleSingleUpload(index, f); e.currentTarget.value = "" }}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById(`img-upload-${image.id}`)?.click()} disabled={isUploading || bulkUploading} className="bg-transparent text-xs">
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => toggleUrlInput(index)} className="bg-transparent text-xs" title="Paste URL">
                    <LinkIcon className="w-3.5 h-3.5" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeImage(index)} className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Collapsible URL input */}
              {showUrlInput.has(index) && (
                <div className="mt-2">
                  <Input
                    value={image.url}
                    onChange={(e) => updateImage(index, 'url', e.target.value)}
                    placeholder={placeholder || `https://.../${bucketName}/your-image.jpg`}
                    className="theme-text bg-transparent font-mono text-xs"
                  />
                </div>
              )}

              {/* Highlight prompt */}
              {highlightMeta && (
                <p className="text-xs text-amber-500 mt-1.5">Please add an alt text for this image</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}