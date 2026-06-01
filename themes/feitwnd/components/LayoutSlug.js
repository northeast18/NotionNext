import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import Comment from '@/components/Comment'
import { useGlobal } from '@/lib/global'
import SideRight from './SideRight'
import { InfoCard } from './InfoCard'
import LazyImage from '@/components/LazyImage'

export const LayoutSlug = (props) => {
    const { post, lock, validPassword } = props
    const { locale } = useGlobal()

    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-gray-500">
                    <i className="fas fa-spinner animate-spin mr-2" />
                    Loading...
                </div>
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
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-base text-gray-800 dark:text-gray-200 font-bold mb-5">
                            <i className="fas fa-chart-bar text-gray-500" />
                            站点统计
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 dark:text-gray-400">文章总数</span>
                                <span className="text-gray-700 dark:text-gray-200">{props.postCount || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 dark:text-gray-400">分类数</span>
                                <span className="text-gray-700 dark:text-gray-200">{props.categoryOptions?.length || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 dark:text-gray-400">标签数</span>
                                <span className="text-gray-700 dark:text-gray-200">{props.tagOptions?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full xl:flex-1">
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Header / Hero */}
                    {post.pageCover && (
                        <div className="w-full h-64 md:h-96 overflow-hidden relative">
                            <LazyImage
                                src={post.pageCover}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 text-white">
                                <h1 className="text-3xl md:text-4xl font-medium mb-4">{post.title}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
                                    {post.publishDay && (
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-calendar-alt" /> {post.publishDay}
                                        </span>
                                    )}
                                    {post.category && (
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-folder" /> {post.category}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <i className="fas fa-eye" /> view
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!post.pageCover && (
                        <div className="px-8 pt-10 pb-4 border-b border-gray-100 dark:border-gray-700">
                            <h1 className="text-3xl md:text-4xl font-medium mb-4 text-gray-800 dark:text-gray-100">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                {post.publishDay && (
                                    <span className="flex items-center gap-1">
                                        <i className="fas fa-calendar-alt" /> {post.publishDay}
                                    </span>
                                )}
                                {post.category && (
                                    <span className="flex items-center gap-1">
                                        <i className="fas fa-folder" /> {post.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                        <NotionPage post={post} />
                    </div>

                    {/* Trims */}
                    <div className="px-8 pb-8">
                        <ShareBar post={post} />
                        <Comment frontMatter={post} />
                    </div>
                </article>
            </div>

            {/* Right Area: Sidebar */}
            <div className="hidden xl:block w-64 flex-shrink-0">
                <SideRight {...props} />
            </div>
        </div>
    )
}
