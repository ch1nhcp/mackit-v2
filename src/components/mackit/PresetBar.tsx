import type { Preset } from './types';
import s from './mackit.module.css';

interface PresetBarProps {
    presets: Preset[];
    activePresetId: string | undefined;
    onApply: (preset: Preset) => void;
}

const PresetBar = ({ presets, activePresetId, onApply }: PresetBarProps) => {
    return (
        <div className={s.presets}>
            <span className={s.presetsLbl}>// quick presets:</span>
            {presets.map((preset) => (
                <button
                    key={preset.id}
                    className={`${s.presetBtn} ${activePresetId === preset.id ? s.presetBtnActive : ''}`}
                    onClick={() => onApply(preset)}
                >
                    {preset.label}
                </button>
            ))}
        </div>
    );
};

export default PresetBar;
