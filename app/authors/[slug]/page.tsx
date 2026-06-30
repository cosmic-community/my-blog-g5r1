// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'

export const revalidate = 60

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const photo = author.metadata?.profile_photo
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)

  return (
    <div className="container-wide py-12">
      <header className="mb-12 flex flex-col items-center text-center">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={name}
            width={160}
            height={160}
            className="h-36 w-36 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-accent/10 font-serif text-3xl text-accent">
            {name.charAt(0)}
          </div>
        )}
        <h1 className="mt-6 font-serif text-4xl font-bold text-ink">{name}</h1>
        {bio && <p className="mt-4 max-w-2xl text-ink/60">{bio}</p>}
      </header>

      <h2 className="mb-8 border-b border-ink/10 pb-4 font-serif text-2xl font-bold text-ink">
        Posts by {name}
      </h2>
      <PostGrid posts={posts} />
    </div>
  )
}