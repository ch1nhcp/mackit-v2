import type { Category } from './types';
import s from './mackit.module.css';

interface CategoryNavProps {
    categories: Category[];
    activeId: string;
    onSelect: (id: string) => void;
}

const CategoryNav = ({ categories, activeId, onSelect }: CategoryNavProps) => {
    return (
        <nav className={s.catNav} aria-label='App categories'>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={`${s.catBtn} ${activeId === cat.id ? s.catBtnActive : ''}`}
                    onClick={() => onSelect(cat.id)}
                    aria-current={activeId === cat.id ? 'page' : undefined}
                >
                    {cat.label}
                </button>
            ))}
        </nav>
    );
};

export default CategoryNav;
