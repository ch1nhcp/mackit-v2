import type { Metadata } from 'next';

import SubmitPage from '@/components/submit/SubmitPage';

export const metadata: Metadata = {
    title: 'mackit — contribute',
    description: 'Submit an app or send feedback to mackit.',
};

const Page = () => <SubmitPage />;

export default Page;
