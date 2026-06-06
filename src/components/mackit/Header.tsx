import { forwardRef } from 'react';

import type { LangCode, LangOption, Translations } from './i18n';
import s from './mackit.module.css';

interface HeaderProps {
    t: Translations;
    lang: LangCode;
    langOptions: LangOption[];
    query: string;
    onLangChange: (lang: LangCode) => void;
    onQueryChange: (q: string) => void;
}

const Header = forwardRef<HTMLInputElement, HeaderProps>(
    ({ t, lang, langOptions, query, onLangChange, onQueryChange }, ref) => {
        return (
            <header className={s.hdr}>
                <div>
                    <div className={s.logo}>
                        <span className={s.logoDollar} style={{ fontSize: '1.8rem' }}>⌘</span>&nbsp;mackit
                    </div>
                    <div className={s.tagline}>{t.tagline}</div>
                </div>

                <div className={s.hdrRight}>
                    <select
                        className={s.langSel}
                        value={lang}
                        onChange={(e) => onLangChange(e.target.value as LangCode)}
                        aria-label='Language'
                    >
                        {langOptions.map((l) => (
                            <option key={l.code} value={l.code}>{l.native}</option>
                        ))}
                    </select>

                    <div className={s.searchWrap}>
                        <span className={s.searchSlash} aria-hidden='true'>/</span>
                        <input
                            ref={ref}
                            className={s.searchInp}
                            type='search'
                            placeholder={t.searchPlaceholder}
                            value={query}
                            onChange={(e) => onQueryChange(e.target.value)}
                            aria-label='Search apps'
                        />
                    </div>
                </div>
            </header>
        );
    },
);

Header.displayName = 'Header';

export default Header;
