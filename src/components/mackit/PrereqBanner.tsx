import type { Translations } from './i18n';
import s from './mackit.module.css';

const HOMEBREW_INSTALL_CMD =
    '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';

interface PrereqBannerProps {
    t: Translations;
    onDismiss: () => void;
}

const PrereqBanner = ({ t, onDismiss }: PrereqBannerProps) => {
    return (
        <div className={s.prereq} role='banner'>
            <span className={s.prereqLbl}>{t.noBrewLabel}</span>
            <span className={s.prereqCmd}>{HOMEBREW_INSTALL_CMD}</span>
            <button className={s.prereqX} onClick={onDismiss} aria-label='Dismiss banner'>
                {t.dismiss}
            </button>
        </div>
    );
};

export default PrereqBanner;
