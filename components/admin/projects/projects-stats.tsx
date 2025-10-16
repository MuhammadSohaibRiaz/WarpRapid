"use client"

type Props = {
  total: number
  published: number
  drafts: number
  filtered: number
}

export function ProjectsStats({ total, published, drafts, filtered }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">{total}</div>
        <div className="text-sm theme-text opacity-70 theme-transition">Total Projects</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-500">{published}</div>
        <div className="text-sm theme-text opacity-70 theme-transition">Published</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-500">{drafts}</div>
        <div className="text-sm theme-text opacity-70 theme-transition">Drafts</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-500">{filtered}</div>
        <div className="text-sm theme-text opacity-70 theme-transition">Filtered</div>
      </div>
    </div>
  )
}
