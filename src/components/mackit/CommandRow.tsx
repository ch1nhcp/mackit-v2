import s from './mackit.module.css';

interface CommandRowProps {
    line: string;
}

const CommandRow = ({ line }: CommandRowProps) => {
    const parts = line.split(' ');

    return (
        <div className={s.cmdRow}>
            <span className={s.cmdDollar}>$</span>
            <span className={s.cmdText}>
                {parts.map((part, i) => {
                    const space = i < parts.length - 1 ? ' ' : '';
                    if (part === 'brew') {
                        return <span key={i} className={s.kwBrew}>{part}{space}</span>;
                    }
                    if (part === '--cask') {
                        return <span key={i} className={s.kwFlag}>{part}{space}</span>;
                    }
                    return <span key={i}>{part}{space}</span>;
                })}
            </span>
        </div>
    );
};

export default CommandRow;
