import { PayloadHandler } from 'payload'

export const seedTopics: PayloadHandler = async (req): Promise<Response> => {
  const { payload, user } = req

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const topics = [
    { sort: 1, backgroundColor: '#E3F2FD', slug: 'career', englishName: 'Career', name: '职业', icon: '💼', keywords: ['leadership', 'management', 'entrepreneurship', 'productivity', 'startups', 'coding', 'software', 'engineering', 'technology', 'computers', 'artificial-intelligence'] },
    { sort: 2, backgroundColor: '#E8F5E9', slug: 'economics', englishName: 'Economics', name: '经济', icon: '💵', keywords: ['economics', 'finance', 'money', 'investing', 'personal-finance', 'business', 'buisness'] },
    { sort: 3, backgroundColor: '#FFF3E0', slug: 'food', englishName: 'Food', name: '食物', icon: '🍽️', keywords: ['food', 'cooking', 'cookbooks', 'nutrition', 'diets'] },
    { sort: 4, backgroundColor: '#E0F2F1', slug: 'health', englishName: 'Health', name: '健康', icon: '🏥', keywords: ['health', 'mental-health', 'fitness', 'medicine', 'dental', 'dentistry', 'medical', 'brain', 'neuroscience'] },
    { sort: 5, backgroundColor: '#EFEBE9', slug: 'history', englishName: 'History', name: '历史', icon: '📚', keywords: ['history', 'world-history', 'ancient-history', 'american-history', 'microhistory', 'civil-war', 'world-war-ii', 'war', 'holocaust', 'russia', 'russian-literature', 'france', 'iran', 'india', 'nigeria', 'africa', 'japan'] },
    { sort: 6, backgroundColor: '#E8EAF6', slug: 'leadership-management', englishName: 'Leadership & Management', name: '领导与管理', icon: '👔', keywords: ['leadership', 'management'] },
    { sort: 7, backgroundColor: '#F3E5F5', slug: 'learning-education', englishName: 'Learning & Education', name: '学习与教育', icon: '🎓', keywords: ['education', 'learning', 'teaching', 'academic', 'research'] },
    { sort: 8, backgroundColor: '#FCE4EC', slug: 'love-relationships', englishName: 'Love & Relationships', name: '爱情与关系', icon: '💖', keywords: ['relationships', 'love', 'dating', 'marriage', 'sexuality', 'polyamory', 'family', 'parenting', 'friendship', 'romance', 'dark-romance', 'enemies-to-lovers', 'friends-to-lovers', 'romantasy'] },
    { sort: 9, backgroundColor: '#FFF8E1', slug: 'marketing-sales', englishName: 'Marketing & Sales', name: '市场营销与销售', icon: '📈', keywords: ['marketing', 'sales'] },
    { sort: 10, backgroundColor: '#E0F7FA', slug: 'mindfulness', englishName: 'Mindfulness', name: '正念', icon: '🧘‍♂️', keywords: ['mindfulness', 'meditation', 'zen', 'spirituality', 'buddhism', 'yoga'] },
    { sort: 11, backgroundColor: '#F1F8E9', slug: 'money-investments', englishName: 'Money & Investments', name: '金钱与投资', icon: '💰', keywords: ['investing', 'investment', 'money', 'wealth'] },
    { sort: 12, backgroundColor: '#F3E5F5', slug: 'music', englishName: 'Music', name: '音乐', icon: '🎶', keywords: ['music'] },
    { sort: 13, backgroundColor: '#E1F5FE', slug: 'personal-development', englishName: 'Personal Development', name: '个人发展', icon: '🌱', keywords: ['personal-development', 'self-help', 'productivity', 'inspirational', 'happiness'] },
    { sort: 14, backgroundColor: '#ECEFF1', slug: 'philosophy', englishName: 'Philosophy', name: '哲学', icon: '🧠', keywords: ['philosophy', 'metaphysics', 'stoicism', 'ethics', 'logic'] },
    { sort: 15, backgroundColor: '#FFFDE7', slug: 'productivity', englishName: 'Productivity', name: '生产力', icon: '⏱️', keywords: ['productivity', 'time-management', 'habits'] },
    { sort: 16, backgroundColor: '#F3E5F5', slug: 'psychology', englishName: 'Psychology', name: '心理学', icon: '🧠', keywords: ['psychology', 'counselling', 'mental-illness', 'autistic-spectrum-disorder', 'social-psychology', 'human-behavior'] },
    { sort: 17, backgroundColor: '#E8F5E9', slug: 'science-nature', englishName: 'Science & Nature', name: '科学与自然', icon: '🌍', keywords: ['science', 'nature', 'biology', 'physics', 'chemistry', 'astronomy', 'environment', 'evolution', 'animals', 'dogs', 'popular-science', 'geography', 'anthropology'] },
    { sort: 18, backgroundColor: '#FFEBEE', slug: 'society-arts-culture', englishName: 'Society, Arts & Culture', name: '社会、艺术与文化', icon: '🎭', keywords: ['society', 'culture', 'art', 'arts', 'theatre', 'film', 'movies', 'photography', 'design', 'architecture', 'fashion', 'journalism', 'politics', 'government', 'law', 'social-justice', 'feminism', 'race', 'sociology', 'urbanism', 'cities', 'urban-planning'] },
    { sort: 19, backgroundColor: '#FFF3E0', slug: 'sports', englishName: 'Sports', name: '体育', icon: '🏅', keywords: ['sports', 'football', 'soccer', 'basketball', 'baseball', 'martial-arts', 'running'] },
    { sort: 20, backgroundColor: '#E3F2FD', slug: 'startups', englishName: 'Startups', name: '初创公司', icon: '🚀', keywords: ['startups', 'entrepreneurship', 'business'] },
    { sort: 21, backgroundColor: '#E0F7FA', slug: 'technology-future', englishName: 'Technology & The Future', name: '技术与未来', icon: '🤖', keywords: ['technology', 'future', 'ai', 'artificial-intelligence', 'virtual-reality', 'computer-science', 'programming', 'coding', 'internet', 'social-media'] },
    { sort: 22, backgroundColor: '#FFF9C4', slug: 'travel', englishName: 'Travel', name: '旅行', icon: '✈️', keywords: ['travel', 'adventure'] },
  ]

  try {
    for (const topic of topics) {
      const existing = await payload.find({
        collection: 'topics',
        where: {
          slug: {
            equals: topic.slug,
          },
        },
      })


      if (existing.docs.length > 0) {
        const id = existing.docs[0].id
        
        // Update English Name
        await payload.update({
          collection: 'topics',
          id,
          data: { name: topic.englishName },
          locale: 'en',
        })


        // Update Chinese Name and other fields
        const existingKeywords = (existing.docs[0] as any).keywords?.map((k: any) => k.keyword) || []
        
        await payload.update({
          collection: 'topics',
          id,
          data: {
            name: topic.name,
            icon: topic.icon,
            backgroundColor: topic.backgroundColor,
            sort: topic.sort,
            keywords: Array.from(new Set([
                ...existingKeywords, 
                ...topic.keywords
            ])).map(k => ({ keyword: k }))
          },
          locale: 'zh',
        })
      } else {
        // Create with English Name
        const newTopic = await payload.create({
          collection: 'topics',
          data: {
            slug: topic.slug,
            name: topic.englishName,
            icon: topic.icon,
            backgroundColor: topic.backgroundColor,
            sort: topic.sort,
            keywords: topic.keywords.map((k) => ({ keyword: k })),
          },
          locale: 'en',
        })

        // Update with Chinese Name
        await payload.update({
          collection: 'topics',
          id: newTopic.id,
          data: {
            name: topic.name,
          },
          locale: 'zh',
        })
      }
    }

    return Response.json({ message: 'Topics seeded successfully' })
  } catch (error) {
    payload.logger.error(error)
    return Response.json({ error: 'Failed to seed topics' }, { status: 500 })
  }
}
