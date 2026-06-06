import { forwardRef } from 'react';

import s from './mackit.module.css';

interface HeaderProps {
    query: string;
    onQueryChange: (q: string) => void;
}

const Header = forwardRef<HTMLInputElement, HeaderProps>(({ query, onQueryChange }, ref) => {
    return (
        <header className={s.hdr}>
            <div>
                <div className={s.logo}>
                    <span className={s.logoDollar} style={{ fontSize: '1.8rem' }}>⌘</span>&nbsp;mackit
                </div>
                <div className={s.tagline}>
                    // select apps → copy brew command → paste in terminal → done.
                </div>
            </div>

            <div className={s.searchWrap}>
                <span className={s.searchSlash} aria-hidden='true'>/</span>
                <input
                    ref={ref}
                    className={s.searchInp}
                    type='search'
                    placeholder='search apps... ( / )'
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    aria-label='Search apps'
                />
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header;
