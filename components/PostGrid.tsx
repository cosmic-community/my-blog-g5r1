import { Post } from '@/types'
import PostCard from '@/components/PostCard'

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink/20 bg-white/50 p-12 text-center">
        <p className="text-ink/50">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}