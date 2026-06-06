import s from './submit.module.css';

export interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupProps {
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
}

const RadioGroup = ({ options, value, onChange }: RadioGroupProps) => {
    return (
        <div className={s.radioGroup} role='radiogroup'>
            {options.map((opt) => {
                const checked = value === opt.value;
                return (
                    <div
                        key={opt.value}
                        className={`${s.radioOpt} ${checked ? s.radioOptChecked : ''}`}
                        onClick={() => onChange(opt.value)}
                        role='radio'
                        aria-checked={checked}
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onChange(opt.value)}
                    >
                        <div className={s.radioDot}>
                            <div className={s.radioDotInner} />
                        </div>
                        <span className={s.radioLabel}>{opt.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default RadioGroup;
