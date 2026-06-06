import type { App, Category } from './types';

export const CATEGORIES: Category[] = [
    { id: 'all', label: 'all apps' },
    { id: 'browsers', label: 'browsers' },
    { id: 'dev', label: 'development' },
    { id: 'terminals', label: 'terminals & shell' },
    { id: 'productivity', label: 'productivity' },
    { id: 'communication', label: 'communication' },
    { id: 'media', label: 'media' },
    { id: 'design', label: 'design' },
    { id: 'utilities', label: 'utilities' },
];

export const APPS: App[] = [
    // Browsers
    { id: 'firefox', name: 'Firefox', cat: 'browsers', type: 'cask', brew: 'firefox', desc: 'Open-source browser by Mozilla' },
    { id: 'chrome', name: 'Chrome', cat: 'browsers', type: 'cask', brew: 'google-chrome', desc: "Google's fast web browser" },
    { id: 'brave', name: 'Brave', cat: 'browsers', type: 'cask', brew: 'brave-browser', desc: 'Privacy-first with built-in ad blocker' },
    { id: 'arc', name: 'Arc', cat: 'browsers', type: 'cask', brew: 'arc', desc: 'Reinvented browser from The Browser Company' },
    { id: 'vivaldi', name: 'Vivaldi', cat: 'browsers', type: 'cask', brew: 'vivaldi', desc: 'Highly customizable for power users' },
    { id: 'tor', name: 'Tor Browser', cat: 'browsers', type: 'cask', brew: 'tor-browser', desc: 'Anonymous browsing via the Tor network' },

    // Development — editors
    { id: 'vscode', name: 'VS Code', cat: 'dev', type: 'cask', brew: 'visual-studio-code', desc: "Microsoft's popular code editor" },
    { id: 'cursor', name: 'Cursor', cat: 'dev', type: 'cask', brew: 'cursor', desc: 'AI-first code editor, fork of VS Code' },
    { id: 'zed', name: 'Zed', cat: 'dev', type: 'cask', brew: 'zed', desc: 'High-performance multiplayer editor in Rust' },
    { id: 'sublime', name: 'Sublime Text', cat: 'dev', type: 'cask', brew: 'sublime-text', desc: 'Fast, elegant text editor' },
    { id: 'jetbrains', name: 'JetBrains Toolbox', cat: 'dev', type: 'cask', brew: 'jetbrains-toolbox', desc: 'Manage IntelliJ, PyCharm, Rider and more' },

    // Development — runtimes & CLI
    { id: 'git', name: 'Git', cat: 'dev', type: 'formula', brew: 'git', desc: 'Distributed version control system' },
    { id: 'node', name: 'Node.js', cat: 'dev', type: 'formula', brew: 'node', desc: 'JavaScript runtime (current LTS)' },
    { id: 'python', name: 'Python 3', cat: 'dev', type: 'formula', brew: 'python', desc: 'The Python programming language' },
    { id: 'go', name: 'Go', cat: 'dev', type: 'formula', brew: 'go', desc: "Google's compiled, statically-typed language" },
    { id: 'rust', name: 'Rust', cat: 'dev', type: 'formula', brew: 'rust', desc: 'Systems language focused on safety & speed' },
    { id: 'gh', name: 'GitHub CLI', cat: 'dev', type: 'formula', brew: 'gh', desc: 'Manage PRs, issues, and repos from terminal' },
    { id: 'yarn', name: 'Yarn', cat: 'dev', type: 'formula', brew: 'yarn', desc: 'Fast, reliable JS package manager' },
    { id: 'pnpm', name: 'pnpm', cat: 'dev', type: 'formula', brew: 'pnpm', desc: 'Disk-efficient alternative to npm' },
    { id: 'pyenv', name: 'pyenv', cat: 'dev', type: 'formula', brew: 'pyenv', desc: 'Simple Python version management' },

    // Development — apps
    { id: 'docker', name: 'Docker', cat: 'dev', type: 'cask', brew: 'docker', desc: 'Container development platform' },
    { id: 'postman', name: 'Postman', cat: 'dev', type: 'cask', brew: 'postman', desc: 'API development & testing platform' },
    { id: 'insomnia', name: 'Insomnia', cat: 'dev', type: 'cask', brew: 'insomnia', desc: 'Open-source API client and design tool' },
    { id: 'tableplus', name: 'TablePlus', cat: 'dev', type: 'cask', brew: 'tableplus', desc: 'GUI for Postgres, MySQL, SQLite, Redis' },
    { id: 'fork', name: 'Fork', cat: 'dev', type: 'cask', brew: 'fork', desc: 'Fast and friendly git client' },
    { id: 'sourcetree', name: 'Sourcetree', cat: 'dev', type: 'cask', brew: 'sourcetree', desc: 'Free Git & Mercurial GUI by Atlassian' },

    // Terminals & shell
    { id: 'iterm2', name: 'iTerm2', cat: 'terminals', type: 'cask', brew: 'iterm2', desc: 'Feature-rich terminal replacement for macOS' },
    { id: 'warp', name: 'Warp', cat: 'terminals', type: 'cask', brew: 'warp', desc: 'Rust-based terminal with AI built in' },
    { id: 'ghostty', name: 'Ghostty', cat: 'terminals', type: 'cask', brew: 'ghostty', desc: 'Fast, native terminal emulator by Mitchell Hashimoto' },
    { id: 'alacritty', name: 'Alacritty', cat: 'terminals', type: 'cask', brew: 'alacritty', desc: 'GPU-accelerated, minimal terminal emulator' },
    { id: 'kitty', name: 'Kitty', cat: 'terminals', type: 'cask', brew: 'kitty', desc: 'Terminal with tiling, ligatures, GPU rendering' },
    { id: 'tmux', name: 'tmux', cat: 'terminals', type: 'formula', brew: 'tmux', desc: 'Terminal multiplexer — split panes, sessions' },
    { id: 'neovim', name: 'Neovim', cat: 'terminals', type: 'formula', brew: 'neovim', desc: 'Extensible, hyperextensible Vim-based editor' },
    { id: 'fzf', name: 'fzf', cat: 'terminals', type: 'formula', brew: 'fzf', desc: 'General-purpose command-line fuzzy finder' },
    { id: 'ripgrep', name: 'ripgrep', cat: 'terminals', type: 'formula', brew: 'ripgrep', desc: 'Blazing-fast recursive grep (rg)' },
    { id: 'bat', name: 'bat', cat: 'terminals', type: 'formula', brew: 'bat', desc: 'cat with syntax highlighting and Git integration' },
    { id: 'eza', name: 'eza', cat: 'terminals', type: 'formula', brew: 'eza', desc: 'Modern, maintained ls replacement' },
    { id: 'fd', name: 'fd', cat: 'terminals', type: 'formula', brew: 'fd', desc: 'Simple, fast alternative to find' },
    { id: 'htop', name: 'htop', cat: 'terminals', type: 'formula', brew: 'htop', desc: 'Interactive process viewer — better than top' },
    { id: 'jq', name: 'jq', cat: 'terminals', type: 'formula', brew: 'jq', desc: 'Lightweight command-line JSON processor' },
    { id: 'zsh-as', name: 'zsh-autosuggestions', cat: 'terminals', type: 'formula', brew: 'zsh-autosuggestions', desc: 'Fish-style fast autosuggestions for zsh' },

    // Productivity
    { id: 'raycast', name: 'Raycast', cat: 'productivity', type: 'cask', brew: 'raycast', desc: 'Supercharged launcher with extensions' },
    { id: 'alfred', name: 'Alfred', cat: 'productivity', type: 'cask', brew: 'alfred', desc: 'Productivity launcher and workflow engine' },
    { id: 'notion', name: 'Notion', cat: 'productivity', type: 'cask', brew: 'notion', desc: 'All-in-one workspace for notes and docs' },
    { id: 'obsidian', name: 'Obsidian', cat: 'productivity', type: 'cask', brew: 'obsidian', desc: 'Knowledge base built on local Markdown files' },
    { id: '1pw', name: '1Password', cat: 'productivity', type: 'cask', brew: '1password', desc: 'Password manager and secure digital vault' },
    { id: 'bitwarden', name: 'Bitwarden', cat: 'productivity', type: 'cask', brew: 'bitwarden', desc: 'Open-source password manager' },
    { id: 'rectangle', name: 'Rectangle', cat: 'productivity', type: 'cask', brew: 'rectangle', desc: 'Window snapping with keyboard shortcuts' },
    { id: 'bartender', name: 'Bartender', cat: 'productivity', type: 'cask', brew: 'bartender', desc: 'Organize and control macOS menu bar icons' },
    { id: 'popclip', name: 'PopClip', cat: 'productivity', type: 'cask', brew: 'popclip', desc: 'Instant text actions when you select text' },
    { id: 'linear', name: 'Linear', cat: 'productivity', type: 'cask', brew: 'linear-linear', desc: 'Fast, opinionated project management' },

    // Communication
    { id: 'slack', name: 'Slack', cat: 'communication', type: 'cask', brew: 'slack', desc: 'Team messaging and collaboration' },
    { id: 'discord', name: 'Discord', cat: 'communication', type: 'cask', brew: 'discord', desc: 'Voice, video, and text for communities' },
    { id: 'zoom', name: 'Zoom', cat: 'communication', type: 'cask', brew: 'zoom', desc: 'Video conferencing and online meetings' },
    { id: 'telegram', name: 'Telegram', cat: 'communication', type: 'cask', brew: 'telegram', desc: 'Fast and secure cloud messaging' },
    { id: 'signal', name: 'Signal', cat: 'communication', type: 'cask', brew: 'signal', desc: 'End-to-end encrypted messaging' },
    { id: 'teams', name: 'Microsoft Teams', cat: 'communication', type: 'cask', brew: 'microsoft-teams', desc: 'Collaboration hub for Microsoft 365' },
    { id: 'whatsapp', name: 'WhatsApp', cat: 'communication', type: 'cask', brew: 'whatsapp', desc: 'Messaging from Meta' },

    // Media
    { id: 'spotify', name: 'Spotify', cat: 'media', type: 'cask', brew: 'spotify', desc: 'Music and podcast streaming' },
    { id: 'vlc', name: 'VLC', cat: 'media', type: 'cask', brew: 'vlc', desc: 'Free, open-source media player' },
    { id: 'iina', name: 'IINA', cat: 'media', type: 'cask', brew: 'iina', desc: 'Modern, macOS-native media player' },
    { id: 'obs', name: 'OBS Studio', cat: 'media', type: 'cask', brew: 'obs', desc: 'Free streaming and screen recording' },
    { id: 'handbrake', name: 'HandBrake', cat: 'media', type: 'cask', brew: 'handbrake', desc: 'Open-source video transcoder' },

    // Design
    { id: 'figma', name: 'Figma', cat: 'design', type: 'cask', brew: 'figma', desc: 'Collaborative UI design and prototyping' },
    { id: 'sketch', name: 'Sketch', cat: 'design', type: 'cask', brew: 'sketch', desc: 'Vector design platform for macOS' },
    { id: 'affinity-d', name: 'Affinity Designer', cat: 'design', type: 'cask', brew: 'affinity-designer', desc: 'Professional vector and raster design' },
    { id: 'imageoptim', name: 'ImageOptim', cat: 'design', type: 'cask', brew: 'imageoptim', desc: 'Losslessly compress images, strip metadata' },

    // Utilities
    { id: 'unarchiver', name: 'The Unarchiver', cat: 'utilities', type: 'cask', brew: 'the-unarchiver', desc: 'Extract ZIP, RAR, 7z, and dozens more' },
    { id: 'appcleaner', name: 'AppCleaner', cat: 'utilities', type: 'cask', brew: 'appcleaner', desc: 'Thoroughly uninstall apps and leftovers' },
    { id: 'stats', name: 'Stats', cat: 'utilities', type: 'cask', brew: 'stats', desc: 'Free system monitor in the menu bar' },
    { id: 'istat', name: 'iStat Menus', cat: 'utilities', type: 'cask', brew: 'istat-menus', desc: 'Advanced system monitoring in menu bar' },
    { id: 'keka', name: 'Keka', cat: 'utilities', type: 'cask', brew: 'keka', desc: 'The macOS file archiver and extractor' },
    { id: 'transmission', name: 'Transmission', cat: 'utilities', type: 'cask', brew: 'transmission', desc: 'Fast and lightweight BitTorrent client' },
    { id: 'balena', name: 'Balena Etcher', cat: 'utilities', type: 'cask', brew: 'balenaetcher', desc: 'Flash OS images to SD cards and USB drives' },
    { id: 'mas', name: 'mas', cat: 'utilities', type: 'formula', brew: 'mas', desc: 'Install Mac App Store apps from the terminal' },
];
