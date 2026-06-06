import type { CategoryGroup } from './types';
import AppCard from './AppCard';
import s from './mackit.module.css';

interface AppGridProps {
    groups: CategoryGroup[];
    selected: Set<string>;
    showHeaders: boolean;
    query: string;
    onToggle: (id: string) => void;
}

const AppGrid = ({ groups, selected, showHeaders, query, onToggle }: AppGridProps) => {
    if (groups.every((g) => g.apps.length === 0)) {
        return (
            <div className={s.empty}>
                <div className={s.emptyCaret}>{'>'}</div>
                no results for &quot;{query}&quot;
            </div>
        );
    }

    return (
        <>
            {groups.map((group) => (
                <div key={group.id}>
                    {showHeaders && (
                        <div className={s.secHd}>
                            {group.label} ({group.apps.length})
                        </div>
                    )}
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
