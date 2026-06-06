'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { APPS, CATEGORIES, PRESETS } from './data';
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
const LS_KEY = 'mackit-sel';

function loadInitialSelection(): Set<string> {
    try {
        if (typeof window === 'undefined') return new Set();
        const hash = window.location.hash.slice(1);
        if (hash) {
            const ids = hash.split(',').filter((id) => APPS.some((a) => a.id === id));
            if (ids.length) return new Set(ids);
        }
        const saved = localStorage.getItem(LS_KEY);
        if (saved) return new Set(JSON.parse(saved) as string[]);
    } catch {
        // ignore storage errors
    }
    return new Set();
}

const MacKitPage = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [query, setQuery] = useState('');
    const [copied, setCopied] = useState(false);
    const [shared, setShared] = useState(false);
    const [showPrereq, setShowPrereq] = useState(true);
    const searchRef = useRef<HTMLInputElement>(null);

    // Hydrate from localStorage / URL hash after mount (avoids SSR mismatch)
    useEffect(() => {
        setSelected(loadInitialSelection());
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify([...selected]));
        } catch {
            // ignore storage errors
        }
    }, [selected]);

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

    const groups = useMemo<CategoryGroup[]>(() => {
        if (activeCategory !== 'all') {
            const label = CATEGORIES.find((c) => c.id === activeCategory)?.label ?? activeCategory;
            return [{ id: activeCategory, label, apps: filtered }];
        }
        const byCategory = filtered.reduce<Record<string, CategoryGroup>>((acc, app) => {
            if (!acc[app.cat]) {
                const label = CATEGORIES.find((c) => c.id === app.cat)?.label ?? app.cat;
                acc[app.cat] = { id: app.cat, label, apps: [] };
            }
            acc[app.cat].apps.push(app);
            return acc;
        }, {});
        return Object.values(byCategory);
    }, [filtered, activeCategory]);

    const commands = useMemo(() => generateCmd(selected, APPS), [selected]);

    const selectedApps = useMemo(() => APPS.filter((a) => selected.has(a.id)), [selected]);

    const catCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        APPS.forEach((a) => {
            if (selected.has(a.id)) counts[a.cat] = (counts[a.cat] ?? 0) + 1;
        });
        return counts;
    }, [selected]);

    // Select-all for single-category view
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
        const url =
            window.location.origin +
            window.location.pathname +
            '#' +
            [...selected].join(',');
        navigator.clipboard.writeText(url).then(() => {
            setShared(true);
            setTimeout(() => setShared(false), COPY_FEEDBACK_MS);
        });
    }, [selected]);

    const handleReset = useCallback(() => setSelected(new Set()), []);

    return (
        <div className={s.root}>
            <Header ref={searchRef} query={query} onQueryChange={setQuery} />

            {showPrereq && <PrereqBanner onDismiss={() => setShowPrereq(false)} />}

            <PresetBar
                presets={PRESETS}
                activePresetId={activePreset?.id}
                onApply={applyPreset}
            />

            <CategoryNav
                categories={CATEGORIES}
                activeId={activeCategory}
                catCounts={catCounts}
                totalSelected={selected.size}
                onSelect={setActiveCategory}
            />

            <main className={s.gridWrap}>
                <AppGrid
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
                <div className={s.kbdHint}>press / to search</div>
            )}
        </div>
    );
};

export default MacKitPage;
