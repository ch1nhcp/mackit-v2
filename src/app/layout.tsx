import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';

import '@/app/globals.css';

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-ibm-plex-mono',
    display: 'swap'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const SITE_TITLE = 'mackit — homebrew installer for mac';
const SITE_DESCRIPTION = 'Select apps → copy brew command → paste in terminal → done.';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    applicationName: 'mackit',
    openGraph: {
        type: 'website',
        siteName: 'mackit',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: '/'
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang='en'>
            <body className={`${ibmPlexMono.variable} overscroll-none`}>{children}</body>
        </html>
    );
};

export default Layout;
