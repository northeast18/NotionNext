import Link from 'next/link'
import SideRight from './SideRight'

export const LayoutCategoryIndex = (props) => {
    const { categoryOptions } = props

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-8 mt-8 mb-12">
            <div className="w-full lg:w-3/4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <i className="fas fa-folder mr-3 opacity-50" />
                        分类
                    </h1>

                    <div className="flex flex-wrap gap-4">
                        {categoryOptions?.map(category => (
                            <Link
                                key={category.name}
                                href={`/category/${category.name}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors border border-gray-100 dark:border-gray-600 group"
                            >
                                <i className="fas fa-folder text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{category.name}</span>
                                <span className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full ml-1">
                                    {category.count}
                                </span>
                            </Link>
                        ))}
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

export const LayoutTagIndex = (props) => {
    const { tagOptions } = props

    return (
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-8 mt-8 mb-12">
            <div className="w-full lg:w-3/4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <i className="fas fa-tags mr-3 opacity-50" />
                        标签
                    </h1>

                    <div className="flex flex-wrap gap-3">
                        {tagOptions?.map(tag => (
                            <Link
                                key={tag.name}
                                href={`/tag/${tag.name}`}
                                className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all transform hover:-translate-y-0.5 group"
                            >
                                <span className="text-sm font-medium pr-1.5 border-r border-blue-200 dark:border-blue-800 group-hover:border-blue-400 transition-colors">
                                    {tag.name}
                                </span>
                                <span className="text-xs pl-1.5 opacity-80">
                                    {tag.count}
                                </span>
                            </Link>
                        ))}
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
