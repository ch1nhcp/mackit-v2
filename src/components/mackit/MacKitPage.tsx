'use client';

import { useCallback, useMemo, useState } from 'react';

import { APPS, CATEGORIES } from './data';
import type { CategoryGroup } from './types';
import { generateCmd } from './utils';

import AppGrid from './AppGrid';
import CategoryNav from './CategoryNav';
import CommandBar from './CommandBar';
import Header from './Header';
import PrereqBanner from './PrereqBanner';
import s from './mackit.module.css';

const COPY_FEEDBACK_MS = 2200;

const MacKitPage = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [query, setQuery] = useState('');
    const [copied, setCopied] = useState(false);
    const [showPrereq, setShowPrereq] = useState(true);

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

    const toggle = useCallback((id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(commands.join('\n')).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
        });
    }, [commands]);

    const handleReset = useCallback(() => {
        setSelected(new Set());
    }, []);

    return (
        <div className={s.root}>
            <Header query={query} onQueryChange={setQuery} />

            {showPrereq && <PrereqBanner onDismiss={() => setShowPrereq(false)} />}

            <CategoryNav
                categories={CATEGORIES}
                activeId={activeCategory}
                onSelect={setActiveCategory}
            />

            <main className={s.gridWrap}>
                <AppGrid
                    groups={groups}
                    selected={selected}
                    showHeaders={activeCategory === 'all'}
                    query={query}
                    onToggle={toggle}
                />
            </main>

            <CommandBar
                selectedCount={selected.size}
                commands={commands}
                copied={copied}
                onCopy={handleCopy}
                onReset={handleReset}
            />
        </div>
    );
};

export default MacKitPage;
