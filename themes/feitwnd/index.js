import CONFIG from './config'
import { Style } from './style'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

/**
 * FeiTwnd 主题基础布局
 * @param {*} props
 * @returns 
 */
const LayoutBase = props => {
  const { children, slotTop } = props

  return (
    <div id='theme-feitwnd' className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
      <Style />

      {/* 顶部导航 */}
      <Header {...props} />

      <main className='w-full max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]'>
        {slotTop}
        {children}
      </main>

      {/* 页脚 */}
      <Footer {...props} />
    </div>
  )
}

import { LayoutIndex } from './components/LayoutIndex'
import { LayoutSlug } from './components/LayoutSlug'
import { LayoutSearch } from './components/LayoutSearch'
import { LayoutArchive } from './components/LayoutArchive'
import { LayoutCategoryIndex, LayoutTagIndex } from './components/LayoutTaxonomy'

/**
 * 文章列表页 (归档/分类/标签的列表通常复用这个或单独设计)
 */
const LayoutPostList = props => {
  return <LayoutIndex {...props} />
}

/**
 * 404
 */
const Layout404 = props => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-8xl font-bold text-gray-200 dark:text-gray-700 mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">糟糕！页面迷路了</p>
      <a href="/" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">
        返回首页
      </a>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
