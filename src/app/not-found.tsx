import type { Metadata } from 'next';

import NotFoundPage from '@/components/not-found/NotFoundPage';

export const metadata: Metadata = {
    title: 'mackit — 404 not found',
    description: 'that path doesn’t exist on mackit.'
};

const NotFound = () => {
    return <NotFoundPage />;
};

export default NotFound;
