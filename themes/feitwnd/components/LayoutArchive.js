import Link from 'next/link'
import SideRight from './SideRight'

export const LayoutArchive = (props) => {
    const { archivePosts } = props

    if (!archivePosts || Object.keys(archivePosts).length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-gray-500">No Archives Found</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-8 mt-8 mb-12">
            <div className="w-full lg:w-3/4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <i className="fas fa-archive mr-3 opacity-50" />
                        归档
                    </h1>

                    <div className="space-y-12">
                        {Object.keys(archivePosts).map((month) => {
                            const posts = archivePosts[month]
                            return (
                                <div key={month} className="relative">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 pl-6 relative">
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-50 dark:ring-blue-900/30"></span>
                                        {month}
                                    </h2>
                                    <div className="space-y-4 pl-7 border-l-2 border-gray-100 dark:border-gray-700 ml-1">
                                        {posts.map(post => (
                                            <Link
                                                href={`/${post.slug}`}
                                                key={post.id}
                                                className="group block p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-mono text-gray-400 dark:text-gray-500 w-12">
                                                        {post.publishDay.slice(5, 10)}
                                                    </span>
                                                    <h3 className="text-lg text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors">
                                                        {post.title}
                                                    </h3>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* Right Area: Sidebar */}
            <div className="w-full lg:hidden xl:block xl:w-1/4">
                <SideRight {...props} />
            </div>
        </div>
    )
}
