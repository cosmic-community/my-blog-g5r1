import { getAllPosts } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'

export const revalidate = 60

export const metadata = {
  title: 'All Posts — My Blog',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-ink">All Posts</h1>
        <p className="mt-3 text-ink/60">Explore every article in the collection.</p>
      </header>
      <PostGrid posts={posts} />
    </div>
  )
}