import type { Metadata } from 'next';

import MacKitPage from '@/components/mackit/MacKitPage';

export const metadata: Metadata = {
    title: 'mackit — pick apps, copy brew, done.',
    description: 'Select apps → copy brew command → paste in terminal → done.'
};

const Page = () => {
    return <MacKitPage />;
};

export default Page;
