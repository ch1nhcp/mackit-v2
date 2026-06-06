import type { Translations } from './i18n';
import type { Preset } from './types';
import s from './mackit.module.css';

interface PresetBarProps {
    t: Translations;
    presets: Preset[];
    activePresetId: string | undefined;
    onApply: (preset: Preset) => void;
}

const PresetBar = ({ t, presets, activePresetId, onApply }: PresetBarProps) => {
    return (
        <div className={s.presets}>
            <span className={s.presetsLbl}>{t.presetsLabel}</span>
            {presets.map((preset) => (
                <button
                    key={preset.id}
                    className={`${s.presetBtn} ${activePresetId === preset.id ? s.presetBtnActive : ''}`}
                    onClick={() => onApply(preset)}
                >
                    {t.presets[preset.id] ?? preset.label}
                </button>
            ))}
        </div>
    );
};

export default PresetBar;
