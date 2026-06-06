import type { App } from './types';
import Tick from './Tick';
import s from './mackit.module.css';

interface AppCardProps {
    app: App;
    selected: boolean;
    onToggle: (id: string) => void;
}

const AppCard = ({ app, selected, onToggle }: AppCardProps) => {
    return (
        <div
            className={`${s.card} ${selected ? s.cardSel : ''}`}
            onClick={() => onToggle(app.id)}
            role='checkbox'
            aria-checked={selected}
            tabIndex={0}
            onKeyDown={(e) => e.key === ' ' || e.key === 'Enter' ? onToggle(app.id) : undefined}
        >
            <div className={s.cardTop}>
                <span className={`${s.cardName} ${selected ? s.cardSelName : ''}`}>
                    {app.name}
                </span>
                <div className={`${s.chk} ${selected ? s.chkSel : ''}`}>
                    <span className={`${s.chkIcon} ${selected ? s.chkIconSel : ''}`}>
                        <Tick />
                    </span>
                </div>
            </div>

            <div className={`${s.cardBrew} ${selected ? s.cardBrewSel : ''}`}>
                {app.brew}
                <span className={s.typePill}>{app.type}</span>
            </div>

            <div className={s.cardDesc}>{app.desc}</div>
        </div>
    );
};

export default AppCard;
