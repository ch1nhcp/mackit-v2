import { ImageResponse } from 'next/og';

export const alt = 'mackit — homebrew installer for mac';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

const CMD_PATH =
    'M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z';

const OpengraphImage = () => {
    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                background: '#0D1117',
                display: 'flex',
                padding: 56,
                fontFamily: MONO,
                color: '#E6EDF3'
            }}>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid #21262D',
                    borderRadius: 12,
                    padding: 48,
                    background: '#0D1117'
                }}>
                {/* top: status eyebrow */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        color: '#8B949E',
                        fontSize: 22,
                        letterSpacing: 0.4
                    }}>
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            background: '#3FB950',
                            boxShadow: '0 0 0 4px rgba(63, 185, 80, 0.18)'
                        }}
                    />
                    // homebrew installer · v.alpha
                </div>

                {/* center: wordmark + tagline */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            fontSize: 156,
                            fontWeight: 700,
                            letterSpacing: -3,
                            lineHeight: 1
                        }}>
                        <svg
                            width={140}
                            height={140}
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='#3FB950'
                            strokeWidth={2.25}
                            strokeLinecap='round'
                            strokeLinejoin='round'>
                            <path d={CMD_PATH} />
                        </svg>
                        <span style={{ color: '#E6EDF3' }}>mackit</span>
                    </div>
                    <div
                        style={{
                            marginTop: 28,
                            fontSize: 30,
                            color: '#8B949E',
                            lineHeight: 1.4
                        }}>
                        // select apps → copy brew command → paste in terminal → done.
                    </div>
                </div>

                {/* bottom: command line + meta */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 22,
                        color: '#8B949E'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#3FB950' }}>$</span>
                        <span style={{ color: '#E6EDF3' }}>brew install --cask</span>
                        <span>firefox arc raycast …</span>
                    </div>
                    <div>// open source · fast · honest</div>
                </div>
            </div>
        </div>,
        { ...size }
    );
};

export default OpengraphImage;
