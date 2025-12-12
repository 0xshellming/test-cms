import { type Locale, isValidLocale } from '@/lib/translations'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Bookmark } from 'lucide-react'
import { BottomNavigation } from '@/components/home/BottomNavigation'
import { BookSummary } from '@/payload-types'

type Props = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const topics = await payload.find({
      collection: 'topics',
      limit: 100,
    })

    const params = []
    for (const locale of ['en', 'zh']) {
      // Should fetch locales from config ideally
      for (const topic of topics.docs) {
        params.push({ locale, slug: topic.slug })
      }
    }
    return params
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

export default async function TopicPage(props: Props) {
  const { locale: localeParam, slug } = await props.params

  if (!isValidLocale(localeParam)) {
    notFound()
  }
  const locale = localeParam as Locale

  const payload = await getPayload({ config })

  // Fetch Topic
  const topicQuery = await payload.find({
    collection: 'topics',
    where: {
      slug: { equals: slug },
    },
    locale,
    limit: 1,
  })

  if (!topicQuery.docs.length) {
    notFound()
  }

  const topic = topicQuery.docs[0]

  // Fetch Books
  const booksQuery = await payload.find({
    collection: 'book-summaries',
    where: {
      topics: { equals: topic.id },
      _status: { equals: 'published' },
    },
    locale,
    sort: '-publishedDate',
    limit: 100,
  })

  const books = booksQuery.docs

  // Helper to get image URL
  const getCoverUrl = (book: BookSummary) => {
    if (book.cover && typeof book.cover === 'object' && book.cover.url) {
      return book.cover.url
    }
    return book.coverUrl || null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 px-4 py-3 flex items-center shadow-sm">
        <Link
          href={`/${locale}`}
          className="mr-4 p-1 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">{topic.name}</h1>
      </header>

      <main className="flex-1 px-4 py-6">
        {/* Banner */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="bg-black text-white p-1.5 rounded-lg shrink-0 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                EXPLORE HEADWAY FOR BUSINESS
              </div>
              <div className="text-base font-semibold text-gray-900">Empower your team</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 gap-4">
          {books.map((book) => {
            const coverUrl = getCoverUrl(book)
            return (
              <Link
                key={book.id}
                href={`/${locale}/book-summary/${book.slug}`}
                className="group block"
              >
                <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-sm mb-3 bg-gray-200">
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      <span className="text-xs">No Cover</span>
                    </div>
                  )}
                  {/* Bookmark Icon */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-gray-700 shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                    <Bookmark className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 min-h-[2.5em]">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">{book.author}</p>
              </Link>
            )
          })}
        </div>

        {books.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No books found for this topic.
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation locale={locale} />
    </div>
  )
}
