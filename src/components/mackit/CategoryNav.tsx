import type { Category } from './types';
import s from './mackit.module.css';

interface CategoryNavProps {
    categories: Category[];
    activeId: string;
    catCounts: Record<string, number>;
    totalSelected: number;
    onSelect: (id: string) => void;
}

const CategoryNav = ({ categories, activeId, catCounts, totalSelected, onSelect }: CategoryNavProps) => {
    return (
        <nav className={s.catNav} aria-label='App categories'>
            {categories.map((cat) => {
                const count = cat.id === 'all' ? totalSelected : (catCounts[cat.id] ?? 0);
                return (
                    <button
                        key={cat.id}
                        className={`${s.catBtn} ${activeId === cat.id ? s.catBtnActive : ''}`}
                        onClick={() => onSelect(cat.id)}
                        aria-current={activeId === cat.id ? 'page' : undefined}
                    >
                        {cat.label}
                        {count > 0 && <span className={s.catBadge}>{count}</span>}
                    </button>
                );
            })}
        </nav>
    );
};

export default CategoryNav;
