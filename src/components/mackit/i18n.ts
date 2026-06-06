export type LangCode = 'en' | 'vi' | 'zh' | 'ja' | 'ko' | 'es';

export interface Translations {
    tagline: string;
    searchPlaceholder: string;
    noBrewLabel: string;
    dismiss: string;
    presetsLabel: string;
    presets: Record<string, string>;
    cats: Record<string, string>;
    selectAll: string;
    deselectAll: string;
    selectedCount: (n: number) => string;
    reset: string;
    share: string;
    shareOk: string;
    copyCmd: string;
    copyOk: string;
    kbdHint: string;
    noResults: (q: string) => string;
}

export interface LangOption {
    code: LangCode;
    native: string;
}

export const LANG_OPTIONS: LangOption[] = [
    { code: 'en', native: 'English'     },
    { code: 'vi', native: 'Tiếng Việt'  },
    { code: 'zh', native: '中文'         },
    { code: 'ja', native: '日本語'       },
    { code: 'ko', native: '한국어'       },
    { code: 'es', native: 'Español'     },
];

export const DEFAULT_LANG: LangCode = 'en';

export const TRANSLATIONS: Record<LangCode, Translations> = {
    en: {
        tagline: '// select apps → copy brew command → paste in terminal → done.',
        searchPlaceholder: 'search apps... ( / )',
        noBrewLabel: '// no homebrew?',
        dismiss: 'dismiss ×',
        presetsLabel: '// quick presets:',
        presets: { 'new-mac': 'new mac setup', dev: 'dev setup', frontend: 'frontend dev', designer: 'designer' },
        cats: { all: 'all apps', browsers: 'browsers', dev: 'development', terminals: 'terminals & shell', productivity: 'productivity', communication: 'communication', media: 'media', design: 'design', utilities: 'utilities' },
        selectAll: 'select all',
        deselectAll: 'deselect all',
        selectedCount: (n) => `${n} app${n !== 1 ? 's' : ''} selected`,
        reset: 'reset',
        share: 'share',
        shareOk: '✓ link copied!',
        copyCmd: 'copy command',
        copyOk: '✓ copied!',
        kbdHint: 'press / to search',
        noResults: (q) => `no results for "${q}"`,
    },
    vi: {
        tagline: '// chọn ứng dụng → sao chép lệnh brew → dán vào terminal → xong.',
        searchPlaceholder: 'tìm ứng dụng... ( / )',
        noBrewLabel: '// chưa có homebrew?',
        dismiss: 'đóng ×',
        presetsLabel: '// cấu hình nhanh:',
        presets: { 'new-mac': 'mac mới', dev: 'lập trình', frontend: 'frontend', designer: 'thiết kế' },
        cats: { all: 'tất cả', browsers: 'trình duyệt', dev: 'lập trình', terminals: 'terminal & shell', productivity: 'năng suất', communication: 'liên lạc', media: 'phương tiện', design: 'thiết kế', utilities: 'tiện ích' },
        selectAll: 'chọn tất cả',
        deselectAll: 'bỏ chọn tất cả',
        selectedCount: (n) => `đã chọn ${n} ứng dụng`,
        reset: 'đặt lại',
        share: 'chia sẻ',
        shareOk: '✓ đã sao chép liên kết!',
        copyCmd: 'sao chép lệnh',
        copyOk: '✓ đã sao chép!',
        kbdHint: 'nhấn / để tìm kiếm',
        noResults: (q) => `không tìm thấy "${q}"`,
    },
    zh: {
        tagline: '// 选择应用 → 复制 brew 命令 → 粘贴到终端 → 完成。',
        searchPlaceholder: '搜索应用... ( / )',
        noBrewLabel: '// 没有 Homebrew？',
        dismiss: '关闭 ×',
        presetsLabel: '// 快速预设：',
        presets: { 'new-mac': '新 Mac 配置', dev: '开发环境', frontend: '前端开发', designer: '设计师' },
        cats: { all: '全部', browsers: '浏览器', dev: '开发工具', terminals: '终端', productivity: '效率', communication: '通讯', media: '媒体', design: '设计', utilities: '工具' },
        selectAll: '全选',
        deselectAll: '取消全选',
        selectedCount: (n) => `已选 ${n} 个应用`,
        reset: '重置',
        share: '分享',
        shareOk: '✓ 链接已复制！',
        copyCmd: '复制命令',
        copyOk: '✓ 已复制！',
        kbdHint: '按 / 搜索',
        noResults: (q) => `未找到 "${q}"`,
    },
    ja: {
        tagline: '// アプリを選択 → brew コマンドをコピー → ターミナルに貼り付け → 完了。',
        searchPlaceholder: 'アプリを検索... ( / )',
        noBrewLabel: '// Homebrew がない？',
        dismiss: '閉じる ×',
        presetsLabel: '// クイックプリセット：',
        presets: { 'new-mac': '新しい Mac', dev: '開発環境', frontend: 'フロントエンド', designer: 'デザイナー' },
        cats: { all: 'すべて', browsers: 'ブラウザ', dev: '開発', terminals: 'ターミナル', productivity: '生産性', communication: '通信', media: 'メディア', design: 'デザイン', utilities: 'ツール' },
        selectAll: 'すべて選択',
        deselectAll: '選択解除',
        selectedCount: (n) => `${n} 個選択中`,
        reset: 'リセット',
        share: '共有',
        shareOk: '✓ リンクをコピー！',
        copyCmd: 'コマンドをコピー',
        copyOk: '✓ コピー済み！',
        kbdHint: '/ キーで検索',
        noResults: (q) => `"${q}" が見つかりません`,
    },
    ko: {
        tagline: '// 앱 선택 → brew 명령어 복사 → 터미널에 붙여넣기 → 완료.',
        searchPlaceholder: '앱 검색... ( / )',
        noBrewLabel: '// Homebrew가 없나요?',
        dismiss: '닫기 ×',
        presetsLabel: '// 빠른 프리셋:',
        presets: { 'new-mac': '새 Mac', dev: '개발 환경', frontend: '프론트엔드', designer: '디자이너' },
        cats: { all: '전체', browsers: '브라우저', dev: '개발', terminals: '터미널', productivity: '생산성', communication: '통신', media: '미디어', design: '디자인', utilities: '유틸리티' },
        selectAll: '모두 선택',
        deselectAll: '선택 해제',
        selectedCount: (n) => `${n}개 선택됨`,
        reset: '초기화',
        share: '공유',
        shareOk: '✓ 링크 복사됨!',
        copyCmd: '명령어 복사',
        copyOk: '✓ 복사됨!',
        kbdHint: '/ 키로 검색',
        noResults: (q) => `"${q}" 검색 결과 없음`,
    },
    es: {
        tagline: '// elige apps → copia el comando brew → pégalo en la terminal → listo.',
        searchPlaceholder: 'buscar apps... ( / )',
        noBrewLabel: '// ¿sin homebrew?',
        dismiss: 'cerrar ×',
        presetsLabel: '// presets rápidos:',
        presets: { 'new-mac': 'mac nuevo', dev: 'entorno dev', frontend: 'frontend', designer: 'diseñador' },
        cats: { all: 'todas las apps', browsers: 'navegadores', dev: 'desarrollo', terminals: 'terminal & shell', productivity: 'productividad', communication: 'comunicación', media: 'multimedia', design: 'diseño', utilities: 'utilidades' },
        selectAll: 'seleccionar todo',
        deselectAll: 'deseleccionar todo',
        selectedCount: (n) => `${n} app${n !== 1 ? 's' : ''} seleccionada${n !== 1 ? 's' : ''}`,
        reset: 'reiniciar',
        share: 'compartir',
        shareOk: '✓ ¡enlace copiado!',
        copyCmd: 'copiar comando',
        copyOk: '✓ ¡copiado!',
        kbdHint: 'presiona / para buscar',
        noResults: (q) => `sin resultados para "${q}"`,
    },
};
