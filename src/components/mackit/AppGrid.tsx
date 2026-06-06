import type { Translations } from './i18n';
import type { CategoryGroup } from './types';
import AppCard from './AppCard';
import s from './mackit.module.css';

interface AppGridProps {
    t: Translations;
    groups: CategoryGroup[];
    selected: Set<string>;
    showHeaders: boolean;
    query: string;
    allInCatSelected?: boolean;
    onToggle: (id: string) => void;
    onToggleCatAll?: () => void;
}

const AppGrid = ({
    t,
    groups,
    selected,
    showHeaders,
    query,
    allInCatSelected,
    onToggle,
    onToggleCatAll,
}: AppGridProps) => {
    const hasResults = groups.some((g) => g.apps.length > 0);

    if (!hasResults) {
        return (
            <div className={s.empty}>
                <div className={s.emptyCaret}>{'>'}</div>
                {t.noResults(query)}
            </div>
        );
    }

    return (
        <>
            {groups.map((group) => (
                <div key={group.id}>
                    <div className={s.secHdrRow}>
                        <span className={s.secHd}>
                            {group.label} ({group.apps.length})
                        </span>
                        {!showHeaders && onToggleCatAll && (
                            <button className={s.selAllBtn} onClick={onToggleCatAll}>
                                {allInCatSelected ? t.deselectAll : t.selectAll}
                            </button>
                        )}
                    </div>
                    <div className={s.appGrid}>
                        {group.apps.map((app) => (
                            <AppCard
                                key={app.id}
                                app={app}
                                selected={selected.has(app.id)}
                                onToggle={onToggle}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default AppGrid;
