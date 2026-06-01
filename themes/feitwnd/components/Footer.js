import { siteConfig } from '@/lib/config'

export const Footer = (props) => {
    const d = new Date()
    const currentYear = d.getFullYear()
    const since = siteConfig('SINCE')

    const copyrightDate = parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

    return (
        <footer className="w-full mt-12 py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-2">
                <p>
                    &copy; {copyrightDate} {siteConfig('AUTHOR')} | Powered by NotionNext
                </p>
                {siteConfig('BEI_AN') && (
                    <p>
                        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:underline">
                            {siteConfig('BEI_AN')}
                        </a>
                    </p>
                )}
            </div>
        </footer>
    )
}
