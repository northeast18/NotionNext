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
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-semibold mb-1">
                        <i className="fas fa-bullhorn text-blue-500 text-xs" />
                        {locale.COMMON.ANNOUNCEMENT}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 leading-none [&_p]:my-0 [&_p]:leading-tight [&_div]:leading-tight">
                        <NotionPage post={notice} className="text-center" />
                    </div>
                </div>
            )}

            {/* 最新发布 - compact */}
            {latestPosts && latestPosts.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 font-semibold">
                            <i className="fas fa-history text-blue-500 text-xs" />
                            {locale.COMMON.LATEST_POSTS}
                        </div>
                        <Link href="/archive" className="text-xs text-gray-400 hover:text-blue-500 transition-colors">
                            更多 »
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {latestPosts.slice(0, 5).map(p => (
                            <Link
                                key={p.id || p.short_id}
                                href={`/${p.slug}`}
                                className="group block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors truncate"
                            >
                                <i className="far fa-file-alt mr-1.5 opacity-50 group-hover:opacity-100" />
                                {p.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* 分类 - compact */}
            {categoryOptions && categoryOptions.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 font-semibold">
                            <i className="fas fa-th text-blue-500 text-xs" />
                            分类
                        </div>
                        <Link href="/category" className="text-xs text-gray-400 hover:text-blue-500 transition-colors">
                            更多 »
                        </Link>
                    </div>
                    <div className="space-y-1">
                        {categoryOptions.map(cat => {
                            const selected = currentCategory === cat.name
                            return (
                                <Link
                                    key={cat.name}
                                    href={`/category/${cat.name}`}
                                    className={`flex items-center justify-between text-sm py-1 px-2 rounded-md transition-colors ${selected
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-blue-500'
                                        }`}
                                >
                                    <span>
                                        <i className={`mr-1.5 fas ${selected ? 'fa-folder-open' : 'fa-folder'} opacity-50`} />
                                        {cat.name}
                                    </span>
                                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">{cat.count}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
