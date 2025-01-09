import "./globals.css";
import { SiteConfig } from "@/lib/config/site";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export const metadata = {
    title: SiteConfig.name,
    description: SiteConfig.description,
    keywords: SiteConfig.keywords,
    authors: SiteConfig.authors,
    creator: SiteConfig.creator,
    icons: SiteConfig.icons,
    metadataBase: SiteConfig.metadataBase,
    openGraph: SiteConfig.openGraph,
    twitter: SiteConfig.twitter,
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="light">
            <head>
            </head>
            <body>
                <div className="w-full text-base-content bg-base-100">
                    <Navbar />
                    <div className="max-w-[1280px] mx-auto">
                        <div className="drawer lg:drawer-open">
                            {/* 控制抽屉的复选框，在大屏幕隐藏 --> */}
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            {/* 侧边栏内容 -->*/}
                            <div className="drawer-side bg-base-200">
                                <ul className="menu p-4 w-80 text-base">
                                    <li><a href="/coupon">立即兑换</a></li>
                                    <li><a href="/history">兑换记录</a></li>
                                </ul>
                            </div>
                            
                            {/* 主要内容区域 -->*/}
                            <div className="drawer-content">
                                <div className="p-4">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
