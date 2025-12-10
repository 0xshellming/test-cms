/**
 * 电子书数据导入脚本
 *
 * 使用方法：
 * 1. 准备数据文件：
 *    - book-summaries.json: 包含所有电子书总结的数组
 *    - book-collections.json: 包含所有合集信息的数组
 *    - collection-books.json: 包含合集和书籍关联关系的数组
 *
 * 2. 运行脚本：
 *    npx tsx scripts/import-books.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

// 数据文件路径
const DATA_DIR = path.join(process.cwd(), 'data')
const BOOK_SUMMARIES_FILE = path.join(DATA_DIR, 'book-summaries.json')
const BOOK_COLLECTIONS_FILE = path.join(DATA_DIR, 'book-collections.json')
const COLLECTION_BOOKS_FILE = path.join(DATA_DIR, 'collection-books.json')

// 原始书籍数据类型
interface RawBookData {
  title: string
  author: string
  page_count?: string
  ratingValue?: string
  ratingsValue?: string
  tags?: string[]
  aboutAuthor?: string
  'chapter-summary'?: string
  faq?: string
  summary_reviews?: string
  cover?: string
}

// 书籍总结数据类型
interface BookSummaryData {
  slug: string
  lang: 'en' | 'zh'
  title: string
  desc?: string
  summary?: string
  review?: string
  rawContent: RawBookData
}

// 合集数据类型
interface CollectionData {
  slug: string
  title: string
  desc: string
  image?: string
  icon?: string
  bgColor?: string
}

// 合集书籍关联数据类型
interface CollectionBookRelation {
  book_slug: string
  collection_slug: string
}

async function main() {
  console.log('🚀 开始导入电子书数据...\n')

  // 初始化 Payload
  const payload = await getPayload({ config })
  console.log('✅ Payload CMS 初始化成功\n')

  try {
    // 1. 导入书籍总结
    await importBookSummaries(payload)

    // 2. 导入合集
    await importCollections(payload)

    // 3. 建立关联关系
    await linkCollectionsAndBooks(payload)

    console.log('\n🎉 所有数据导入完成！')
  } catch (error) {
    console.error('❌ 导入过程中发生错误:', error)
    process.exit(1)
  }
}

// 导入书籍总结
async function importBookSummaries(payload: any) {
  console.log('📚 开始导入书籍总结...')

  if (!fs.existsSync(BOOK_SUMMARIES_FILE)) {
    console.log(`⚠️  未找到文件: ${BOOK_SUMMARIES_FILE}`)
    console.log('   请创建 data/book-summaries.json 文件')
    return
  }

  const rawData = fs.readFileSync(BOOK_SUMMARIES_FILE, 'utf-8')
  const bookSummaries: BookSummaryData[] = JSON.parse(rawData)

  console.log(`   找到 ${bookSummaries.length} 本书籍\n`)

  let successCount = 0
  let errorCount = 0

  for (const book of bookSummaries) {
    try {
      // 检查是否已存在
      const existing = await payload.find({
        collection: 'book-summaries',
        where: {
          slug: { equals: book.slug },
        },
        limit: 1,
      })

      const bookData = {
        slug: book.slug,
        lang: book.lang,
        title: book.title,
        author: book.rawContent.author,
        desc: book.desc,
        metadata: {
          pageCount: book.rawContent.page_count,
          ratingValue: book.rawContent.ratingValue,
          ratingsCount: book.rawContent.ratingsValue,
          tags: book.rawContent.tags?.map((tag) => ({ tag })) || [],
        },
        coverUrl: book.rawContent.cover,
        aboutAuthor: book.rawContent.aboutAuthor,
        summary: book.summary,
        chapterSummary: book.rawContent['chapter-summary'],
        review: book.review,
        faq: book.rawContent.faq,
        summaryReviews: book.rawContent.summary_reviews,
        rawContent: book.rawContent,
        publishedDate: new Date().toISOString(),
        _status: 'published',
      }

      if (existing.docs.length > 0) {
        // 更新现有记录
        await payload.update({
          collection: 'book-summaries',
          id: existing.docs[0].id,
          data: bookData,
        })
        console.log(`   ✅ 更新: ${book.title}`)
      } else {
        // 创建新记录
        await payload.create({
          collection: 'book-summaries',
          data: bookData,
        })
        console.log(`   ✅ 创建: ${book.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`   ❌ 失败: ${book.title}`, error)
      errorCount++
    }
  }

  console.log(`\n📊 书籍导入完成: 成功 ${successCount} 本, 失败 ${errorCount} 本\n`)
}

// 导入合集
async function importCollections(payload: any) {
  console.log('📦 开始导入内容合集...')

  if (!fs.existsSync(BOOK_COLLECTIONS_FILE)) {
    console.log(`⚠️  未找到文件: ${BOOK_COLLECTIONS_FILE}`)
    console.log('   请创建 data/book-collections.json 文件')
    return
  }

  const rawData = fs.readFileSync(BOOK_COLLECTIONS_FILE, 'utf-8')
  const collections: CollectionData[] = JSON.parse(rawData)

  console.log(`   找到 ${collections.length} 个合集\n`)

  let successCount = 0
  let errorCount = 0

  for (const collection of collections) {
    try {
      // 检查是否已存在
      const existing = await payload.find({
        collection: 'collections',
        where: {
          slug: { equals: collection.slug },
        },
        limit: 1,
      })

      const collectionData = {
        slug: collection.slug,
        title: collection.title,
        desc: collection.desc,
        collectionType: 'books',
        imageUrl: collection.image,
        displaySettings: {
          icon: collection.icon,
          bgColor: collection.bgColor || 'bg-gradient-to-br from-blue-500 to-blue-600',
        },
        displayLocations: {
          showOnHomepage: true,
          showInExplore: true,
          featured: false,
        },
        publishedDate: new Date().toISOString(),
        _status: 'published',
      }

      if (existing.docs.length > 0) {
        // 更新现有记录
        await payload.update({
          collection: 'collections',
          id: existing.docs[0].id,
          data: collectionData,
        })
        console.log(`   ✅ 更新: ${collection.title}`)
      } else {
        // 创建新记录
        await payload.create({
          collection: 'collections',
          data: collectionData,
        })
        console.log(`   ✅ 创建: ${collection.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`   ❌ 失败: ${collection.title}`, error)
      errorCount++
    }
  }

  console.log(`\n📊 合集导入完成: 成功 ${successCount} 个, 失败 ${errorCount} 个\n`)
}

// 建立合集和书籍的关联关系
async function linkCollectionsAndBooks(payload: any) {
  console.log('🔗 开始建立合集与书籍的关联关系...')

  if (!fs.existsSync(COLLECTION_BOOKS_FILE)) {
    console.log(`⚠️  未找到文件: ${COLLECTION_BOOKS_FILE}`)
    console.log('   请创建 data/collection-books.json 文件')
    return
  }

  const rawData = fs.readFileSync(COLLECTION_BOOKS_FILE, 'utf-8')
  const relations: CollectionBookRelation[] = JSON.parse(rawData)

  console.log(`   找到 ${relations.length} 个关联关系\n`)

  // 按合集分组
  const collectionMap = new Map<string, string[]>()
  for (const rel of relations) {
    if (!collectionMap.has(rel.collection_slug)) {
      collectionMap.set(rel.collection_slug, [])
    }
    collectionMap.get(rel.collection_slug)!.push(rel.book_slug)
  }

  let successCount = 0
  let errorCount = 0

  for (const [collectionSlug, bookSlugs] of collectionMap) {
    try {
      // 查找合集
      const collection = await payload.find({
        collection: 'collections',
        where: {
          slug: { equals: collectionSlug },
        },
        limit: 1,
      })

      if (collection.docs.length === 0) {
        console.log(`   ⚠️  未找到合集: ${collectionSlug}`)
        errorCount++
        continue
      }

      // 查找所有书籍
      const books = await payload.find({
        collection: 'book-summaries',
        where: {
          slug: { in: bookSlugs },
        },
        limit: bookSlugs.length,
      })

      if (books.docs.length === 0) {
        console.log(`   ⚠️  未找到书籍: ${collectionSlug}`)
        errorCount++
        continue
      }

      // 构建 items 数组（多态关系格式）
      const items = books.docs.map((book: any, index: number) => ({
        item: {
          relationTo: 'book-summaries',
          value: book.id,
        },
        sortOrder: index,
        featured: false,
      }))

      // 更新合集的 items 关联
      await payload.update({
        collection: 'collections',
        id: collection.docs[0].id,
        data: {
          items: items,
        },
      })

      console.log(`   ✅ ${collection.docs[0].title}: 关联了 ${books.docs.length} 个项目`)
      successCount++
    } catch (error) {
      console.error(`   ❌ 失败: ${collectionSlug}`, error)
      errorCount++
    }
  }

  console.log(`\n📊 关联完成: 成功 ${successCount} 个, 失败 ${errorCount} 个\n`)
}

// 运行主函数
main().catch(console.error)
