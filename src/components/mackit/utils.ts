import type { App } from './types';

export function generateCmd(selected: Set<string>, apps: App[]): string[] {
    const picked = apps.filter((a) => selected.has(a.id));
    if (!picked.length) return [];

    const formulas = picked.filter((a) => a.type === 'formula').map((a) => a.brew);
    const casks = picked.filter((a) => a.type === 'cask').map((a) => a.brew);

    const lines: string[] = [];
    if (formulas.length) lines.push(`brew install ${formulas.join(' ')}`);
    if (casks.length) lines.push(`brew install --cask ${casks.join(' ')}`);

    return lines;
}
