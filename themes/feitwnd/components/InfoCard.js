import { useRouter } from 'next/router'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'

export function InfoCard(props) {
    const { siteInfo, postCount, categoryOptions, tagOptions, latestPosts } = props
    const router = useRouter()

    const CONTACT_GITHUB = siteConfig('CONTACT_GITHUB')
    const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
    const CONTACT_TWITTER = siteConfig('CONTACT_TWITTER')
    const CONTACT_TELEGRAM = siteConfig('CONTACT_TELEGRAM')
    const CONTACT_LINKEDIN = siteConfig('CONTACT_LINKEDIN')
    const CONTACT_WEIBO = siteConfig('CONTACT_WEIBO')
    const CONTACT_BILIBILI = siteConfig('CONTACT_BILIBILI')
    const CONTACT_YOUTUBE = siteConfig('CONTACT_YOUTUBE')
    const ENABLE_RSS = siteConfig('ENABLE_RSS')

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden text-center py-8 px-5 border border-gray-100 dark:border-gray-700">
            {/* Avatar */}
            <div
                className='justify-center items-center flex pb-4 cursor-pointer group'
                onClick={() => { router.push('/') }}
            >
                <LazyImage src={siteInfo?.icon} className='rounded-full w-20 h-20 object-cover group-hover:scale-110 transition-transform duration-300' alt={siteConfig('AUTHOR')} />
            </div>

            {/* Author & Bio */}
            <div className='font-medium text-lg pb-1 text-gray-700 dark:text-white'>{siteConfig('AUTHOR')}</div>
            <div className='text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed'>{siteConfig('BIO')}</div>

            {/* Stats */}
            <div className='flex justify-center gap-5 text-sm text-gray-600 dark:text-gray-400 mb-5 pb-5 border-b border-gray-100 dark:border-gray-700'>
                <div className="flex flex-col items-center cursor-pointer hover:text-blue-500" onClick={() => router.push('/archive')}>
                    <span className="font-semibold text-base text-gray-700 dark:text-gray-300">{postCount || latestPosts?.length || 0}</span>
                    <span className="text-xs text-gray-400">文章</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer hover:text-blue-500" onClick={() => router.push('/category')}>
                    <span className="font-semibold text-base text-gray-700 dark:text-gray-300">{categoryOptions?.length || 0}</span>
                    <span className="text-xs text-gray-400">分类</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer hover:text-blue-500" onClick={() => router.push('/tag')}>
                    <span className="font-semibold text-base text-gray-700 dark:text-gray-300">{tagOptions?.length || 0}</span>
                    <span className="text-xs text-gray-400">标签</span>
                </div>
            </div>

            {/* Social Links */}
            <div className='flex justify-center flex-wrap gap-5 text-lg text-gray-500 dark:text-gray-400'>
                {CONTACT_GITHUB && (
                    <a target='_blank' rel='noreferrer' title='GitHub' href={CONTACT_GITHUB}>
                        <i className='fab fa-github hover:text-gray-900 dark:hover:text-white transition-colors duration-200' />
                    </a>
                )}
                {CONTACT_EMAIL && (
                    <a title='Email' href={`mailto:${CONTACT_EMAIL}`}>
                        <i className='fas fa-envelope hover:text-blue-500 transition-colors duration-200' />
                    </a>
                )}
                {CONTACT_TWITTER && (
                    <a target='_blank' rel='noreferrer' title='Twitter' href={CONTACT_TWITTER}>
                        <i className='fab fa-twitter hover:text-sky-500 transition-colors duration-200' />
                    </a>
                )}
                {CONTACT_TELEGRAM && (
                    <a target='_blank' rel='noreferrer' title='Telegram' href={CONTACT_TELEGRAM}>
                        <i className='fab fa-telegram hover:text-blue-400 transition-colors duration-200' />
                    </a>
                )}
                {CONTACT_LINKEDIN && (
                    <a target='_blank' rel='noreferrer' title='LinkedIn' href={CONTACT_LINKEDIN}>
                        <i className='fab fa-linkedin hover:text-blue-600 transition-colors duration-200' />
                    </a>
                )}
                {CONTACT_WEIBO && (
                    <a target='_blank' rel='noreferrer' title='Weibo' href={CONTACT_WEIBO}>
                        <i className='fab fa-weibo hover:text-red-500 transition-colors duration-200' />
                    </a>
                )}
                {CONTACT_BILIBILI && (
                    <a target='_blank' rel='noreferrer' title='Bilibili' href={CONTACT_BILIBILI}>
                        <i className='fab fa-bilibili hover:text-pink-500 transition-colors duration-200' />
                    </a>
                )}
                {CONTACT_YOUTUBE && (
                    <a target='_blank' rel='noreferrer' title='YouTube' href={CONTACT_YOUTUBE}>
                        <i className='fab fa-youtube hover:text-red-600 transition-colors duration-200' />
                    </a>
                )}
                {ENABLE_RSS && (
                    <a target='_blank' rel='noreferrer' title='RSS' href='/rss/feed.xml'>
                        <i className='fas fa-rss hover:text-orange-500 transition-colors duration-200' />
                    </a>
                )}
            </div>
        </div>
    )
}
