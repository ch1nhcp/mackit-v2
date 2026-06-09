import Link from 'next/link';

import { APPS, CATEGORIES, PRESETS } from '@/components/mackit/data';
import { LANG_OPTIONS } from '@/components/mackit/i18n';

import s from './landing.module.css';

const SAMPLE_BREW_CASKS = ['firefox', 'arc', 'raycast', 'rectangle', 'iterm2'];
const SAMPLE_BREW_FORMULAE = ['git', 'node', 'fzf', 'ripgrep'];

const STEPS = [
    {
        num: '01',
        title: 'pick apps',
        body: 'tap through a curated grid of mac apps. presets cover new mac, dev, frontend, designer.'
    },
    {
        num: '02',
        title: 'copy command',
        body: 'mackit assembles one brew command — casks and formulae merged, deduped, ready.'
    },
    {
        num: '03',
        title: 'paste in terminal',
        body: 'open terminal, paste, hit return. brew handles the rest. no installer, no GUI.'
    }
];

const WHY = [
    { title: 'no signup, no tracking', body: 'static page. selections live in your browser. share via url hash.' },
    { title: 'one command, every app', body: 'casks + formulae rolled into a single brew install line.' },
    { title: 'open source, contribute back', body: 'missing an app? submit it. PRs welcome.' },
    { title: 'six languages out of the box', body: 'english, tiếng việt, 中文, 日本語, 한국어, español.' }
];

const LandingPage = () => {
    const appsRounded = Math.floor(APPS.length / 10) * 10;
    const categoriesCount = CATEGORIES.filter((c) => c.id !== 'all').length;

    return (
        <div className={s.root}>
            <nav className={s.nav} aria-label='Primary'>
                <div className={s.logo}>
                    <span className={s.logoMark}>⌘</span>&nbsp;mackit
                </div>
                <div className={s.navRight}>
                    <Link href='/contribute' className={s.navLink}>
                        + contribute
                    </Link>
                    <Link href='/app' className={s.navLink}>
                        open app →
                    </Link>
                </div>
            </nav>

            <section className={s.hero}>
                <div className={s.eyebrow}>
                    <span className={s.eyebrowDot} aria-hidden='true' />
                    // homebrew installer · v.alpha · open source
                </div>
                <h1 className={s.display}>
                    install your mac,
                    <br />
                    in <span className={s.displayAccent}>one paste</span>.
                </h1>
                <p className={s.lead}>
                    mackit turns a click-through grid of mac apps into a single brew command. pick what you need, copy,
                    paste in terminal. no installer, no signup, no tracking.
                </p>

                <div className={s.ctaRow}>
                    <Link href='/app' className={s.cta} aria-label='Launch mackit'>
                        $ launch mackit →
                    </Link>
                    <a href='#how' className={s.ctaGhost}>
                        see how it works
                    </a>
                </div>

                <div className={s.term} role='img' aria-label='sample brew command'>
                    <div className={s.termBar}>
                        <span className={s.termDot} aria-hidden='true' />
                        <span className={s.termDot} aria-hidden='true' />
                        <span className={s.termDot} aria-hidden='true' />
                        <span className={s.termTitle}>~/mackit — zsh</span>
                    </div>
                    <div className={s.termBody}>
                        <span className={s.termComment}>{`# pick → copy → paste`}</span>
                        {'\n'}
                        <span className={s.termPrompt}>$ </span>
                        <span className={s.termCmd}>brew install --cask</span>{' '}
                        <span className={s.termArg}>{SAMPLE_BREW_CASKS.join(' ')}</span>
                        {'\n'}
                        <span className={s.termPrompt}>$ </span>
                        <span className={s.termCmd}>brew install</span>{' '}
                        <span className={s.termArg}>{SAMPLE_BREW_FORMULAE.join(' ')}</span>
                        {'\n'}
                        <span className={s.termOk}>✓ done.</span>
                        <span className={s.caret} aria-hidden='true' />
                    </div>
                </div>
            </section>

            <section id='how' className={s.section} aria-labelledby='how-title'>
                <div className={s.sectionLabel}>// how it works</div>
                <h2 id='how-title' className={s.h1}>
                    three steps. zero ceremony.
                </h2>
                <div className={s.steps}>
                    {STEPS.map((st) => (
                        <article key={st.num} className={s.step}>
                            <div className={s.stepNum}>// step {st.num}</div>
                            <h3 className={s.stepTitle}>{st.title}</h3>
                            <p className={s.stepBody}>{st.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={s.section} aria-labelledby='stats-title'>
                <div className={s.sectionLabel}>// by the numbers</div>
                <h2 id='stats-title' className={s.h1}>
                    a small tool, a wide net.
                </h2>
                <div className={s.stats}>
                    <div className={s.statCell}>
                        <div className={`${s.statNum} ${s.statNumAccent}`}>{appsRounded}+</div>
                        <div className={s.statLabel}>apps</div>
                    </div>
                    <div className={s.statCell}>
                        <div className={s.statNum}>{categoriesCount}</div>
                        <div className={s.statLabel}>categories</div>
                    </div>
                    <div className={s.statCell}>
                        <div className={s.statNum}>{PRESETS.length}</div>
                        <div className={s.statLabel}>presets</div>
                    </div>
                    <div className={s.statCell}>
                        <div className={s.statNum}>{LANG_OPTIONS.length}</div>
                        <div className={s.statLabel}>languages</div>
                    </div>
                </div>
            </section>

            <section className={s.section} aria-labelledby='why-title'>
                <div className={s.sectionLabel}>// why mackit</div>
                <h2 id='why-title' className={s.h1}>
                    fast, loud, honest.
                </h2>
                <ul className={s.whyList}>
                    {WHY.map((w) => (
                        <li key={w.title} className={s.whyItem}>
                            <span className={s.whyMark} aria-hidden='true'>
                                ›
                            </span>
                            <div>
                                <h3 className={s.whyTitle}>{w.title}</h3>
                                <p className={s.whyBody}>{w.body}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={s.finalCta} aria-labelledby='final-title'>
                <div className={s.finalLabel}>// ready?</div>
                <h2 id='final-title' className={s.finalTitle}>
                    your mac, in one paste.
                </h2>
                <Link href='/app' className={s.cta} aria-label='Launch mackit'>
                    $ launch mackit →
                </Link>
            </section>

            <footer className={s.footer}>
                <div>// mackit · homebrew installer for mac</div>
                <div className={s.footerLinks}>
                    <Link href='/app' className={s.footerLink}>
                        app
                    </Link>
                    <Link href='/contribute' className={s.footerLink}>
                        contribute
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
