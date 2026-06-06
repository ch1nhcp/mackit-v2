'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { APPS, CATEGORIES, PRESETS } from './data';
import {
    DEFAULT_LANG,
    LANG_OPTIONS,
    TRANSLATIONS,
} from './i18n';
import type { LangCode } from './i18n';
import type { CategoryGroup, Preset } from './types';
import { generateCmd } from './utils';

import AppGrid from './AppGrid';
import CategoryNav from './CategoryNav';
import CommandBar from './CommandBar';
import Header from './Header';
import PrereqBanner from './PrereqBanner';
import PresetBar from './PresetBar';
import s from './mackit.module.css';

const COPY_FEEDBACK_MS = 2200;
const LS_SEL_KEY = 'mackit-sel';
const LS_LANG_KEY = 'mackit-lang';

function loadInitialSelection(): Set<string> {
    try {
        if (typeof window === 'undefined') return new Set();
        const hash = window.location.hash.slice(1);
        if (hash) {
            const ids = hash.split(',').filter((id) => APPS.some((a) => a.id === id));
            if (ids.length) return new Set(ids);
        }
        const saved = localStorage.getItem(LS_SEL_KEY);
        if (saved) return new Set(JSON.parse(saved) as string[]);
    } catch { /* ignore */ }
    return new Set();
}

function loadInitialLang(): LangCode {
    try {
        if (typeof window === 'undefined') return DEFAULT_LANG;
        const saved = localStorage.getItem(LS_LANG_KEY) as LangCode | null;
        if (saved && saved in TRANSLATIONS) return saved;
    } catch { /* ignore */ }
    return DEFAULT_LANG;
}

const MacKitPage = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [query, setQuery] = useState('');
    const [copied, setCopied] = useState(false);
    const [shared, setShared] = useState(false);
    const [showPrereq, setShowPrereq] = useState(true);
    const [lang, setLang] = useState<LangCode>(DEFAULT_LANG);
    const searchRef = useRef<HTMLInputElement>(null);

    const t = TRANSLATIONS[lang];

    // Hydrate from localStorage after mount
    useEffect(() => {
        setSelected(loadInitialSelection());
        setLang(loadInitialLang());
    }, []);

    // Persist selections
    useEffect(() => {
        try { localStorage.setItem(LS_SEL_KEY, JSON.stringify([...selected])); } catch { /* ignore */ }
    }, [selected]);

    // Persist language + sync <html lang>
    useEffect(() => {
        try { localStorage.setItem(LS_LANG_KEY, lang); } catch { /* ignore */ }
        document.documentElement.lang = lang;
    }, [lang]);

    // Keyboard shortcuts: `/` to focus search, `Esc` to blur+clear
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === '/' && document.activeElement !== searchRef.current) {
                e.preventDefault();
                searchRef.current?.focus();
            }
            if (e.key === 'Escape' && document.activeElement === searchRef.current) {
                searchRef.current?.blur();
                setQuery('');
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    const toggle = useCallback((id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const applyPreset = useCallback((preset: Preset) => {
        const ids = preset.ids.filter((id) => APPS.some((a) => a.id === id));
        setSelected(new Set(ids));
    }, []);

    const activePreset = useMemo(
        () => PRESETS.find((p) => p.ids.length === selected.size && p.ids.every((id) => selected.has(id))),
        [selected],
    );

    const filtered = useMemo(() => {
        const lq = query.toLowerCase();
        return APPS.filter(
            (a) =>
                (activeCategory === 'all' || a.cat === activeCategory) &&
                (!lq ||
                    a.name.toLowerCase().includes(lq) ||
                    a.brew.toLowerCase().includes(lq) ||
                    a.desc.toLowerCase().includes(lq)),
        );
    }, [activeCategory, query]);

    // Build groups with translated category labels
    const groups = useMemo<CategoryGroup[]>(() => {
        if (activeCategory !== 'all') {
            const label = t.cats[activeCategory] ?? CATEGORIES.find((c) => c.id === activeCategory)?.label ?? activeCategory;
            return [{ id: activeCategory, label, apps: filtered }];
        }
        const byCategory = filtered.reduce<Record<string, CategoryGroup>>((acc, app) => {
            if (!acc[app.cat]) {
                const label = t.cats[app.cat] ?? CATEGORIES.find((c) => c.id === app.cat)?.label ?? app.cat;
                acc[app.cat] = { id: app.cat, label, apps: [] };
            }
            acc[app.cat].apps.push(app);
            return acc;
        }, {});
        return Object.values(byCategory);
    }, [filtered, activeCategory, t]);

    const commands = useMemo(() => generateCmd(selected, APPS), [selected]);
    const selectedApps = useMemo(() => APPS.filter((a) => selected.has(a.id)), [selected]);

    const catCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        APPS.forEach((a) => {
            if (selected.has(a.id)) counts[a.cat] = (counts[a.cat] ?? 0) + 1;
        });
        return counts;
    }, [selected]);

    const catApps = activeCategory !== 'all' ? APPS.filter((a) => a.cat === activeCategory) : [];
    const allInCatSelected = catApps.length > 0 && catApps.every((a) => selected.has(a.id));

    const toggleCatAll = useCallback(() => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (allInCatSelected) {
                catApps.forEach((a) => next.delete(a.id));
            } else {
                catApps.forEach((a) => next.add(a.id));
            }
            return next;
        });
    }, [allInCatSelected, catApps]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(commands.join('\n')).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
        });
    }, [commands]);

    const handleShare = useCallback(() => {
        const url = window.location.origin + window.location.pathname + '#' + [...selected].join(',');
        navigator.clipboard.writeText(url).then(() => {
            setShared(true);
            setTimeout(() => setShared(false), COPY_FEEDBACK_MS);
        });
    }, [selected]);

    const handleReset = useCallback(() => setSelected(new Set()), []);

    return (
        <div className={s.root}>
            <Header
                ref={searchRef}
                t={t}
                lang={lang}
                langOptions={LANG_OPTIONS}
                query={query}
                onLangChange={setLang}
                onQueryChange={setQuery}
            />

            {showPrereq && (
                <PrereqBanner t={t} onDismiss={() => setShowPrereq(false)} />
            )}

            <PresetBar
                t={t}
                presets={PRESETS}
                activePresetId={activePreset?.id}
                onApply={applyPreset}
            />

            <CategoryNav
                t={t}
                categories={CATEGORIES}
                activeId={activeCategory}
                catCounts={catCounts}
                totalSelected={selected.size}
                onSelect={setActiveCategory}
            />

            <main className={s.gridWrap}>
                <AppGrid
                    t={t}
                    groups={groups}
                    selected={selected}
                    showHeaders={activeCategory === 'all'}
                    query={query}
                    allInCatSelected={allInCatSelected}
                    onToggle={toggle}
                    onToggleCatAll={activeCategory !== 'all' ? toggleCatAll : undefined}
                />
            </main>

            <CommandBar
                t={t}
                selectedApps={selectedApps}
                commands={commands}
                copied={copied}
                shared={shared}
                onCopy={handleCopy}
                onShare={handleShare}
                onReset={handleReset}
                onRemoveApp={toggle}
            />

            {selected.size === 0 && (
                <div className={s.kbdHint}>{t.kbdHint}</div>
            )}
        </div>
    );
};

export default MacKitPage;
