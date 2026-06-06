'use client';

import { useState } from 'react';

import Link from 'next/link';

import AppForm from './AppForm';
import FeedbackForm from './FeedbackForm';
import s from './submit.module.css';

type Tab = 'app' | 'feedback';

const SubmitPage = () => {
    const [tab, setTab] = useState<Tab>('app');

    return (
        <div className={s.root}>
            <header className={s.hdr}>
                <div className={s.hdrLeft}>
                    <Link href='/' className={s.backLink}>← mackit</Link>
                    <div>
                        <div className={s.logo}>
                            <span className={s.logoAccent}>⌘</span>&nbsp;contribute
                        </div>
                        <div className={s.pageTitle}>// add apps · send feedback</div>
                    </div>
                </div>
            </header>

            <nav className={s.tabNav} aria-label='Form tabs'>
                <button
                    className={`${s.tabBtn} ${tab === 'app' ? s.tabBtnActive : ''}`}
                    onClick={() => setTab('app')}
                >
                    submit app
                </button>
                <button
                    className={`${s.tabBtn} ${tab === 'feedback' ? s.tabBtnActive : ''}`}
                    onClick={() => setTab('feedback')}
                >
                    feedback
                </button>
            </nav>

            <div className={s.formPage}>
                {tab === 'app' ? <AppForm /> : <FeedbackForm />}
            </div>
        </div>
    );
};

export default SubmitPage;
