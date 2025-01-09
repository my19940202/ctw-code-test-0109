const baseSiteConfig = {
    name: "游戏激活码兑换系统",
    description: `CTW 游戏激活码兑换系统`,
    url: "https://baidu.com/",
    metadataBase: "/",
    keywords: [
        "online screensaver"
    ],
    authors: [
        {
            name: "xishengbo",
            url: "https://baidu.com//",
        },
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
};

export const SiteConfig = {
    ...baseSiteConfig,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: baseSiteConfig.url,
        title: baseSiteConfig.name,
        description: baseSiteConfig.description,
        siteName: baseSiteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: baseSiteConfig.name,
        description: baseSiteConfig.description,
        images: [`${baseSiteConfig.url}/preview.jpg`],
        creator: baseSiteConfig.creator,
    },
};
