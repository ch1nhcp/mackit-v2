import type { Metadata } from 'next';

import LandingPage from '@/components/landing/LandingPage';

export const metadata: Metadata = {
    title: 'mackit — homebrew installer for mac',
    description:
        'mackit turns a click-through grid of mac apps into a single brew command. pick what you need, copy, paste in terminal.'
};

const Page = () => {
    return <LandingPage />;
};

export default Page;
