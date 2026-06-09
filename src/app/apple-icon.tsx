import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const CMD_PATH =
    'M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z';

const AppleIcon = () => {
    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                background: '#0D1117',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <svg
                width={120}
                height={120}
                viewBox='0 0 24 24'
                fill='none'
                stroke='#3FB950'
                strokeWidth={2.25}
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d={CMD_PATH} />
            </svg>
        </div>,
        { ...size }
    );
};

export default AppleIcon;
