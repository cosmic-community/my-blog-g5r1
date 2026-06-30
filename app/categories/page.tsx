import Link from 'next/link'
import { getAllCategories, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export const metadata = {
  title: 'Categories — My Blog',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-ink">Categories</h1>
        <p className="mt-3 text-ink/60">Browse posts by topic.</p>
      </header>

      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/20 bg-white/50 p-12 text-center">
          <p className="text-ink/50">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group rounded-xl border border-ink/10 bg-white p-7 transition-shadow hover:shadow-lg"
            >
              <h2 className="font-serif text-2xl font-bold text-ink transition-colors group-hover:text-accent">
                {getMetafieldValue(category.metadata?.name) || category.title}
              </h2>
              {getMetafieldValue(category.metadata?.description) && (
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {getMetafieldValue(category.metadata?.description)}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}