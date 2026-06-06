import s from './mackit.module.css';

interface HeaderProps {
    query: string;
    onQueryChange: (q: string) => void;
}

const Header = ({ query, onQueryChange }: HeaderProps) => {
    return (
        <header className={s.hdr}>
            <div>
                <div className={s.logo}>
                    <span className={s.logoDollar}>$</span>&nbsp;mackit
                    <span className={s.logoBlink} aria-hidden='true' />
                </div>
                <div className={s.tagline}>
                    // select apps → copy brew command → paste in terminal → done.
                </div>
            </div>

            <div className={s.searchWrap}>
                <span className={s.searchSlash} aria-hidden='true'>/</span>
                <input
                    className={s.searchInp}
                    type='search'
                    placeholder='search apps...'
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    aria-label='Search apps'
                />
            </div>
        </header>
    );
};

export default Header;
