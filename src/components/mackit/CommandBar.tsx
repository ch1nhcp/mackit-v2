'use client';

import CommandRow from './CommandRow';
import type { Translations } from './i18n';
import s from './mackit.module.css';
import type { App } from './types';

interface CommandBarProps {
    t: Translations;
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
    t,
    selectedApps,
    commands,
    copied,
    shared,
    onCopy,
    onShare,
    onReset,
    onRemoveApp
}: CommandBarProps) => {
    const count = selectedApps.length;
    const visible = count > 0;

    return (
        <div className={`${s.bot} ${visible ? s.botOn : ''}`} aria-live='polite'>
            <div className={s.botTop}>
                <span className={s.botCount}>{t.selectedCount(count)}</span>
                <div className={s.botBtns}>
                    <button className={s.btnGhost} onClick={onReset}>
                        {t.reset}
                    </button>
                    <button className={`${s.btnGhost} ${shared ? s.btnGhostOk : ''}`} onClick={onShare}>
                        {shared ? t.shareOk : t.share}
                    </button>
                    <button className={`${s.btnCopy} ${copied ? s.btnCopyOk : ''}`} onClick={onCopy}>
                        {copied ? t.copyOk : t.copyCmd}
                    </button>
                </div>
            </div>

            <div className={s.chipsRow}>
                {selectedApps.map((app) => (
                    <span key={app.id} className={s.chip} onClick={() => onRemoveApp(app.id)} title='click to remove'>
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
