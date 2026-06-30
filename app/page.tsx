import { getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import Hero from '@/components/Hero'
import PostGrid from '@/components/PostGrid'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getAllPosts()

  const featured: Post | undefined = posts[0]
  const rest = posts.slice(1)

  return (
    <div>
      {featured ? (
        <Hero post={featured} />
      ) : (
        <section className="container-wide py-20 text-center">
          <h1 className="font-serif text-4xl font-bold text-ink">Welcome to My Blog</h1>
          <p className="mt-4 text-ink/60">No posts yet — check back soon.</p>
        </section>
      )}

      <section className="container-wide pb-8">
        <div className="mb-8 flex items-end justify-between border-b border-ink/10 pb-4">
          <h2 className="font-serif text-3xl font-bold text-ink">Latest Articles</h2>
        </div>
        <PostGrid posts={rest.length > 0 ? rest : posts} />
      </section>
    </div>
  )
}