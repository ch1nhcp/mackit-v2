'use client';

import type { App } from './types';
import CommandRow from './CommandRow';
import s from './mackit.module.css';

interface CommandBarProps {
    selectedApps: App[];
    commands: string[];
    copied: boolean;
    shared: boolean;
    onCopy: () => void;
    onShare: () => void;
    onReset: () => void;
    onRemoveApp: (id: string) => void;
}

const CommandBar = ({
    selectedApps,
    commands,
    copied,
    shared,
    onCopy,
    onShare,
    onReset,
    onRemoveApp,
}: CommandBarProps) => {
    const visible = selectedApps.length > 0;
    const count = selectedApps.length;

    return (
        <div className={`${s.bot} ${visible ? s.botOn : ''}`} aria-live='polite'>
            <div className={s.botTop}>
                <span className={s.botCount}>
                    <strong className={s.botCountNum}>{count}</strong>{' '}
                    app{count !== 1 ? 's' : ''} selected
                </span>
                <div className={s.botBtns}>
                    <button className={s.btnGhost} onClick={onReset}>
                        reset
                    </button>
                    <button
                        className={`${s.btnGhost} ${shared ? s.btnGhostOk : ''}`}
                        onClick={onShare}
                    >
                        {shared ? '✓ link copied!' : 'share'}
                    </button>
                    <button
                        className={`${s.btnCopy} ${copied ? s.btnCopyOk : ''}`}
                        onClick={onCopy}
                    >
                        {copied ? '✓ copied!' : 'copy command'}
                    </button>
                </div>
            </div>

            <div className={s.chipsRow}>
                {selectedApps.map((app) => (
                    <span
                        key={app.id}
                        className={s.chip}
                        onClick={() => onRemoveApp(app.id)}
                        title='click to remove'
                    >
                        {app.name} <span className={s.chipX}>×</span>
                    </span>
                ))}
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
