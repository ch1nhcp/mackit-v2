import s from './mackit.module.css';

const HOMEBREW_INSTALL_CMD =
    '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';

interface PrereqBannerProps {
    onDismiss: () => void;
}

const PrereqBanner = ({ onDismiss }: PrereqBannerProps) => {
    return (
        <div className={s.prereq} role='banner'>
            <span className={s.prereqLbl}>// no homebrew?</span>
            <span className={s.prereqCmd}>{HOMEBREW_INSTALL_CMD}</span>
            <button className={s.prereqX} onClick={onDismiss} aria-label='Dismiss banner'>
                dismiss ×
            </button>
        </div>
    );
};

export default PrereqBanner;
