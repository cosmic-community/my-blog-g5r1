interface TagListProps {
  tags: string[]
  className?: string
}

export default function TagList({ tags, className }: TagListProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-dark"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}