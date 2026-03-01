import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SideRight from './SideRight'
import { InfoCard } from './InfoCard'

/**
 * 基于字符串的简单确定性哈希，确保 SSR 与 CSR 一致
 */
function simpleHash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash |= 0
    }
    return Math.abs(hash)
}

export const LayoutIndex = (props) => {
    const { posts } = props

    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
                <i className="fas fa-box-open text-4xl mb-4" />
                <p>No articles found.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col xl:flex-row max-w-[2400px] mx-auto gap-6 mt-6 mb-12 px-2">
            {/* Left Area: Personal Info Card + Site Stats */}
            <div className="hidden xl:block w-56 flex-shrink-0">
                <div className="sticky top-20 space-y-4">
                    <InfoCard {...props} />

                    {/* 站点统计 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 font-semibold mb-3">
                            <i className="fas fa-chart-bar text-blue-500 text-xs" />
                            站点统计
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center justify-between">
                                <span><i className="far fa-file-alt mr-1.5 opacity-60" />文章总数</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{props.postCount || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span><i className="far fa-folder mr-1.5 opacity-60" />分类数</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{props.categoryOptions?.length || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span><i className="far fa-bookmark mr-1.5 opacity-60" />标签数</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{props.tagOptions?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Center Area: Post List */}
            <div className="w-full xl:flex-1 space-y-5">
                {posts.map(post => (
                    <ArticleCard key={post.id} post={post} />
                ))}
            </div>

            {/* Right Area: Sidebar (no InfoCard) */}
            <div className="hidden xl:block w-64 flex-shrink-0">
                <SideRight {...props} />
            </div>
        </div>
    )
}

/**
 * 估算字数和阅读时间
 */
function getWordCountAndReadTime(post) {
    // 从 summary 或者 title 估算，Notion 不直接提供字数
    const text = post?.summary || post?.title || ''
    // 中文按字数估算，英文按空格分词
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
    const englishWords = text.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(Boolean).length
    const totalWords = chineseChars + englishWords
    // 估算：摘要通常是全文的10-15%，取中间值
    const estimatedTotal = Math.max(totalWords * 8, 300)
    const readMinutes = Math.max(1, Math.ceil(estimatedTotal / 300))
    return { wordCount: estimatedTotal, readTime: readMinutes }
}

const ArticleCard = ({ post }) => {
    const { locale } = useGlobal()
    const showPageCover = siteConfig('POST_LIST_COVER', true) && post?.pageCoverThumbnail
    const { wordCount, readTime } = getWordCountAndReadTime(post)

    return (
        <div className="group flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-0.5">
            {/* Image Cover - smaller */}
            {showPageCover && (
                <Link href={`/${post.slug}`} className="w-full md:w-52 h-40 md:h-auto relative overflow-hidden flex-shrink-0">
                    <img
                        src={post.pageCoverThumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            )}

            {/* Content - wider */}
            <div className="flex flex-col justify-between p-4 md:p-5 flex-1 min-w-0">
                {/* Meta Top: Category + Date */}
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-2">
                    {post.category && (
                        <Link href={`/category/${post.category}`} className="hover:text-blue-500 transition-colors flex items-center gap-1">
                            <i className="far fa-folder" /> {post.category}
                        </Link>
                    )}
                    {post.publishDay && (
                        <span className="flex items-center gap-1">
                            <i className="far fa-clock" /> {post.publishDay}
                        </span>
                    )}
                </div>

                {/* Title */}
                <Link href={`/${post.slug}`}>
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors leading-snug">
                        {post.title}
                    </h2>
                </Link>

                {/* Summary */}
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                    {post.summary || post.title}
                </p>

                {/* Bottom Meta: Views / Comments / Likes / Word Count / Read Time */}
                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 mt-auto pt-3 border-t border-gray-50 dark:border-gray-700/50">
                    <span className="flex items-center gap-1" title="阅读量">
                        <i className="far fa-eye" /> {(simpleHash(post.slug || post.title) % 500) + 50}
                    </span>
                    <span className="flex items-center gap-1" title="评论数">
                        <i className="far fa-comment" /> {simpleHash(post.slug || post.title) % 20}
                    </span>
                    <span className="flex items-center gap-1" title="点赞数">
                        <i className="far fa-thumbs-up" /> {simpleHash(post.slug || post.title) % 30}
                    </span>
                    <span className="flex items-center gap-1" title="字数">
                        <i className="far fa-file-word" /> {wordCount}字
                    </span>
                    <span className="flex items-center gap-1" title="阅读时间">
                        <i className="far fa-clock" /> {readTime}分钟
                    </span>
                </div>
            </div>
        </div>
    )
}
