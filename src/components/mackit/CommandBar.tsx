'use client';

import CommandRow from './CommandRow';
import s from './mackit.module.css';

interface CommandBarProps {
    selectedCount: number;
    commands: string[];
    copied: boolean;
    onCopy: () => void;
    onReset: () => void;
}

const CommandBar = ({ selectedCount, commands, copied, onCopy, onReset }: CommandBarProps) => {
    const visible = selectedCount > 0;
    const label = `${selectedCount} app${selectedCount !== 1 ? 's' : ''} selected`;

    return (
        <div className={`${s.bot} ${visible ? s.botOn : ''}`} aria-live='polite'>
            <div className={s.botTop}>
                <span className={s.botCount}>
                    <strong className={s.botCountNum}>{selectedCount}</strong>{' '}
                    {label.slice(String(selectedCount).length)}
                </span>
                <div className={s.botBtns}>
                    <button className={s.btnReset} onClick={onReset}>
                        reset
                    </button>
                    <button
                        className={`${s.btnCopy} ${copied ? s.btnCopyOk : ''}`}
                        onClick={onCopy}
                    >
                        {copied ? '✓ copied!' : 'copy command'}
                    </button>
                </div>
            </div>

            <div className={s.cmdLines}>
                {commands.map((line, i) => (
                    <CommandRow key={i} line={line} />
                ))}
            </div>
        </div>
    );
};

export default CommandBar;
