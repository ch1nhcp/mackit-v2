'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import s from './notfound.module.css';

const sanitize = (p: string | null): string => {
    if (!p) return '/unknown';
    const trimmed = p.replace(/[\u0000-\u001F\u007F]/g, '');
    if (trimmed.length > 80) return trimmed.slice(0, 77) + '...';
    return trimmed || '/';
};

const NotFoundPage = () => {
    const pathname = sanitize(usePathname());

    return (
        <div className={s.root}>
            <nav className={s.nav} aria-label='Primary'>
                <Link href='/' className={s.logo}>
                    <span className={s.logoMark}>⌘</span>&nbsp;mackit
                </Link>
                <div className={s.navMeta}>// status 404</div>
            </nav>

            <main className={s.main}>
                <div className={s.col}>
                    <div className={s.eyebrow}>
                        <span className={s.eyebrowDot} aria-hidden='true' />
                        // route not found
                    </div>

                    <h1 className={s.code}>404</h1>
                    <p className={s.title}>that path doesn’t exist.</p>
                    <p className={s.lead}>
                        the page you requested isn’t on this server. it may have been moved, renamed, or never existed.
                        check the url or head back to mackit.
                    </p>

                    <div className={s.term} role='img' aria-label='terminal output: command not found'>
                        <div className={s.termBar}>
                            <span className={s.termDot} aria-hidden='true' />
                            <span className={s.termDot} aria-hidden='true' />
                            <span className={s.termDot} aria-hidden='true' />
                            <span className={s.termTitle}>~/mackit — zsh</span>
                        </div>
                        <div className={s.termBody}>
                            <span className={s.termPrompt}>$ </span>
                            <span className={s.termCmd}>cd</span>{' '}
                            <span className={s.termArg}>{pathname}</span>
                            {'\n'}
                            <span className={s.termErrLbl}>zsh: </span>
                            <span className={s.termErr}>no such file or directory: {pathname}</span>
                            {'\n'}
                            <span className={s.termPrompt}>$ </span>
                            <span className={s.caret} aria-hidden='true' />
                        </div>
                    </div>

                    <div className={s.ctaRow}>
                        <Link href='/' className={s.cta} aria-label='Back to mackit home'>
                            $ cd / →
                        </Link>
                        <Link href='/app' className={s.ctaGhost}>
                            or open mackit →
                        </Link>
                    </div>
                </div>
            </main>

            <footer className={s.footer}>// mackit · homebrew installer for mac</footer>
        </div>
    );
};

export default NotFoundPage;
