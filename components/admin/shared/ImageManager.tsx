"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Image } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import type { ProjectImage } from "@/lib/supabase"

type Props = {
  images: ProjectImage[]
  onImagesChange: (images: ProjectImage[]) => void
  bucketName: 'project-images' | 'blog-images'
  placeholder?: string
}

export function ImageManager({ images, onImagesChange, bucketName, placeholder }: Props) {
  const { mode, color } = useThemeContext()
  
  const getBucketUrl = () => {
    return `https://fmwzrgjfxgxnnislysya.supabase.co/storage/v1/object/public/${bucketName}/`
  }

  const addImage = () => {
    const newImage: ProjectImage = {
      id: Math.max(0, ...images.map(img => img.id)) + 1,
      url: "",
      alt: "",
      caption: ""
    }
    onImagesChange([...images, newImage])
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    onImagesChange(updatedImages)
  }

  const updateImage = (index: number, field: keyof ProjectImage, value: string | number) => {
    const updatedImages = [...images]
    updatedImages[index] = { ...updatedImages[index], [field]: value }
    onImagesChange(updatedImages)
  }

  const getCardBgClass = () => {
    return mode === "dark" || color === "black" 
      ? "border-gray-600 bg-gray-800/30" 
      : "border-gray-300 bg-gray-50/30"
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium theme-text theme-transition">
          <Image className="inline w-4 h-4 mr-2" />
          {bucketName === 'blog-images' ? 'Blog Images' : 'Project Images'}
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addImage}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Image
        </Button>
      </div>
      
      <div className="space-y-4 max-h-60 overflow-y-auto">
        {images.map((image, index) => (
          <div key={image.id} className={`p-4 border rounded-lg ${getCardBgClass()}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium theme-text">Image {image.id}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeImage(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-medium theme-text mb-1">Image URL *</label>
                <Input
                  value={image.url}
                  onChange={(e) => updateImage(index, 'url', e.target.value)}
                  placeholder={placeholder || getBucketUrl() + "your-image-name.jpg"}
                  className="theme-text bg-transparent text-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium theme-text mb-1">Alt Text *</label>
                  <Input
                    value={image.alt}
                    onChange={(e) => updateImage(index, 'alt', e.target.value)}
                    placeholder="Describe the image"
                    className="theme-text bg-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium theme-text mb-1">Caption</label>
                  <Input
                    value={image.caption || ""}
                    onChange={(e) => updateImage(index, 'caption', e.target.value)}
                    placeholder="Optional caption"
                    className="theme-text bg-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {images.length === 0 && (
          <div className={`p-6 border-2 border-dashed rounded-lg text-center ${
            mode === "dark" || color === "black" ? "border-gray-600" : "border-gray-300"
          }`}>
            <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm theme-text opacity-70">
              No images added yet. Click "Add Image" to start.
            </p>
            <p className="text-xs theme-text opacity-50 mt-1">
              Upload images to Supabase Storage first, then paste the URLs here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}