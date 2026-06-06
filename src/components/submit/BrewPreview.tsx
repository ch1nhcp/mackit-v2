import type { AppType } from './types';
import s from './submit.module.css';

interface BrewPreviewProps {
    name: string;
    type: AppType;
}

const BrewPreview = ({ name, type }: BrewPreviewProps) => {
    if (!name.trim()) return null;

    return (
        <div className={s.brewPreview} aria-label='Brew command preview'>
            <span className={s.brewKw}>brew</span>{' install '}
            {type === 'cask' && (
                <><span className={s.brewFlag}>--cask</span>{' '}</>
            )}
            <span className={s.brewName}>{name.trim()}</span>
        </div>
    );
};

export default BrewPreview;
