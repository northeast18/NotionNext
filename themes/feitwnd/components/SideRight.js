import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

export default function SideRight(props) {
    const {
        post,
        latestPosts,
        categoryOptions,
        tagOptions,
        currentCategory,
        currentTag,
        notice,
        postCount
    } = props
    const { locale } = useGlobal()

    return (
        <div className="sticky top-20 space-y-4">
            {/* 公告 */}
            {notice && notice?.blockMap && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-base text-gray-800 dark:text-gray-200 font-bold mb-5">
                        <i className="fas fa-bullhorn text-gray-500" />
                        {locale.COMMON.ANNOUNCEMENT}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed [&_p]:my-1">
                        <NotionPage post={notice} />
                    </div>
                </div>
            )}

            {/* 最新发布 - compact */}
            {latestPosts && latestPosts.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-base text-gray-800 dark:text-gray-200 font-bold">
                            <i className="fas fa-history text-gray-500" />
                            {locale.COMMON.LATEST_POSTS}
                        </div>
                        <Link href="/archive" className="text-xs text-gray-400 hover:text-blue-500 transition-colors">
                            更多 »
                        </Link>
                    </div>
                    <div className="space-y-2.5">
                        {latestPosts.slice(0, 5).map(p => (
                            <Link
                                key={p.id || p.short_id}
                                href={`/${p.slug}`}
                                className="group block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors truncate"
                            >
                                <span className="w-1.5 h-1.5 inline-block rounded-full bg-gray-300 dark:bg-gray-600 mr-2 mb-0.5 group-hover:bg-blue-400" />
                                {p.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* 分类 - compact */}
            {categoryOptions && categoryOptions.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-base text-gray-800 dark:text-gray-200 font-bold">
                            <i className="fas fa-th text-gray-500" />
                            分类
                        </div>
                        <Link href="/category" className="text-xs text-gray-400 hover:text-blue-500 transition-colors">
                            更多 »
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {categoryOptions.map(cat => {
                            const selected = currentCategory === cat.name
                            return (
                                <Link
                                    key={cat.name}
                                    href={`/category/${cat.name}`}
                                    className={`flex items-center justify-between text-sm transition-colors ${selected
                                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
                                        }`}
                                >
                                    <span className="flex items-center">
                                        <span className={`w-1.5 h-1.5 inline-block rounded-full mr-2 mb-0.5 ${selected ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                                        {cat.name}
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2 py-0.5 rounded-full">{cat.count}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
