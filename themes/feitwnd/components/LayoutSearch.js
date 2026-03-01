import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { LayoutIndex } from './LayoutIndex'

export const LayoutSearch = (props) => {
    const { keyword } = props
    const { locale } = useGlobal()
    const router = useRouter()

    return (
        <div className="max-w-7xl mx-auto space-y-8 mt-8 mb-12">
            {/* Search Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    <i className="fas fa-search mr-3 opacity-50" />
                    {keyword ? `Search: ${keyword}` : locale.NAV.SEARCH}
                </h1>
                <div className="max-w-xl mx-auto relative">
                    <input
                        type="text"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 px-4 pr-10 shadow-sm"
                        placeholder="Search articles..."
                        defaultValue={keyword || ''}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                router.push(`/search/${e.target.value}`)
                            }
                        }}
                    />
                </div>
            </div>

            {/* Render Articles Using LayoutIndex */}
            <LayoutIndex {...props} />
        </div>
    )
}
