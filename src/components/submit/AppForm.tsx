'use client';

import { useCallback, useState } from 'react';

import type { AppCategory, AppFormState, AppType, FormErrors } from './types';
import BrewPreview from './BrewPreview';
import RadioGroup from './RadioGroup';
import s from './submit.module.css';

const CATEGORIES: AppCategory[] = [
    'browsers', 'dev', 'terminals', 'productivity',
    'communication', 'media', 'design', 'utilities',
];

const TYPE_OPTIONS = [
    { value: 'cask',    label: 'cask (GUI app)'   },
    { value: 'formula', label: 'formula (CLI tool)' },
];

const INITIAL_STATE: AppFormState = {
    name: '', brew: '', type: 'cask', category: 'dev', desc: '', url: '', email: '',
};

const DESC_MAX = 100;

function validate(form: AppFormState): FormErrors<AppFormState> {
    const errors: FormErrors<AppFormState> = {};

    if (!form.name.trim())
        errors.name = 'app name is required.';

    if (!form.brew.trim())
        errors.brew = 'homebrew name is required.';
    else if (/\s/.test(form.brew))
        errors.brew = 'no spaces — use hyphens (e.g. visual-studio-code).';

    if (!form.desc.trim())
        errors.desc = 'a short description is required.';
    else if (form.desc.length < 10)
        errors.desc = 'description too short (min 10 chars).';

    if (form.url && !/^https?:\/\//.test(form.url))
        errors.url = 'must start with https://';

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errors.email = 'invalid email address.';

    return errors;
}

const AppForm = () => {
    const [form, setForm] = useState<AppFormState>(INITIAL_STATE);
    const [errors, setErrors] = useState<FormErrors<AppFormState>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const set = useCallback(<K extends keyof AppFormState>(key: K, value: AppFormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
    };

    const handleReset = () => { setForm(INITIAL_STATE); setErrors({}); setSubmitted(false); };

    if (submitted) {
        return (
            <div className={s.success}>
                <div className={s.successIcon}>{'>'}_ </div>
                <div className={s.successTitle}>app submitted.</div>
                <div className={s.successMsg}>
                    <strong>{form.name}</strong> ({form.brew}) has been queued for review.<br />
                    we&apos;ll verify the brew name and add it within 24–48h.
                </div>
                <button className={s.successAgain} onClick={handleReset}>
                    submit another →
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className={s.sectionHd}>app details</div>

            <div className={s.field}>
                <div className={s.fieldLabel}>app name</div>
                <input
                    className={`${s.inp} ${errors.name ? s.inpError : ''}`}
                    type='text'
                    placeholder='e.g. Visual Studio Code'
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                />
                {errors.name && <div className={s.fieldError}>{errors.name}</div>}
            </div>

            <div className={s.field}>
                <div className={s.fieldLabel}>type</div>
                <RadioGroup
                    options={TYPE_OPTIONS}
                    value={form.type}
                    onChange={(v) => set('type', v as AppType)}
                />
            </div>

            <div className={s.field}>
                <div className={s.fieldLabel}>homebrew name</div>
                <input
                    className={`${s.inp} ${errors.brew ? s.inpError : ''}`}
                    type='text'
                    placeholder='e.g. visual-studio-code'
                    value={form.brew}
                    onChange={(e) => set('brew', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                />
                <BrewPreview name={form.brew} type={form.type} />
                {errors.brew && <div className={s.fieldError}>{errors.brew}</div>}
            </div>

            <div className={s.field}>
                <div className={s.fieldLabel}>category</div>
                <select
                    className={s.sel}
                    value={form.category}
                    onChange={(e) => set('category', e.target.value as AppCategory)}
                >
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div className={s.field}>
                <div className={s.fieldLabel}>
                    <span>description</span>
                    <span className={`${s.charCount} ${form.desc.length > 90 ? s.charCountNear : ''}`}>
                        {form.desc.length}/{DESC_MAX}
                    </span>
                </div>
                <textarea
                    className={`${s.inp} ${s.inpTextarea} ${errors.desc ? s.inpError : ''}`}
                    placeholder='one-line summary of what the app does'
                    maxLength={DESC_MAX}
                    rows={3}
                    value={form.desc}
                    onChange={(e) => set('desc', e.target.value)}
                />
                {errors.desc && <div className={s.fieldError}>{errors.desc}</div>}
            </div>

            <hr className={s.divider} />
            <div className={s.sectionHd}>optional</div>

            <div className={s.field}>
                <div className={s.fieldLabel}>
                    <span>homepage</span>
                    <span className={s.fieldOptional}>optional</span>
                </div>
                <input
                    className={`${s.inp} ${errors.url ? s.inpError : ''}`}
                    type='url'
                    placeholder='https://...'
                    value={form.url}
                    onChange={(e) => set('url', e.target.value)}
                />
                {errors.url && <div className={s.fieldError}>{errors.url}</div>}
            </div>

            <div className={s.field}>
                <div className={s.fieldLabel}>
                    <span>your email</span>
                    <span className={s.fieldOptional}>optional — for follow-up only</span>
                </div>
                <input
                    className={`${s.inp} ${errors.email ? s.inpError : ''}`}
                    type='email'
                    placeholder='you@example.com'
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                />
                {errors.email && <div className={s.fieldError}>{errors.email}</div>}
            </div>

            <button className={s.submitBtn} type='submit' disabled={loading}>
                {loading ? '// submitting...' : 'submit app →'}
            </button>
        </form>
    );
};

export default AppForm;
