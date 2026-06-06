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

export const metadata: Metadata = {
    title: 'mackit — homebrew installer for mac',
    description: 'Select apps → copy brew command → paste in terminal → done.'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang='en'>
            <body className={`${ibmPlexMono.variable} overscroll-none`}>{children}</body>
        </html>
    );
};

export default Layout;
