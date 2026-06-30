// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'

export const revalidate = 60

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Category</p>
        <h1 className="font-serif text-4xl font-bold text-ink">{name}</h1>
        {description && <p className="mt-3 max-w-2xl text-ink/60">{description}</p>}
      </header>
      <PostGrid posts={posts} />
    </div>
  )
}