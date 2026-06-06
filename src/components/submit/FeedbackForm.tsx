'use client';

import { useCallback, useState } from 'react';

import type { FeedbackFormState, FeedbackType, FormErrors } from './types';
import RadioGroup from './RadioGroup';
import s from './submit.module.css';

const TYPE_OPTIONS = [
    { value: 'bug',     label: 'bug report'      },
    { value: 'feature', label: 'feature request'  },
    { value: 'general', label: 'general'           },
];

const TYPE_LABELS: Record<FeedbackType, string> = {
    bug:     'bug report',
    feature: 'feature request',
    general: 'general feedback',
};

const SUBJECT_PLACEHOLDERS: Record<FeedbackType, string> = {
    bug:     'e.g. search not working on mobile',
    feature: 'e.g. add dark/light mode toggle',
    general: 'e.g. great app, one suggestion...',
};

const MESSAGE_PLACEHOLDERS: Record<FeedbackType, string> = {
    bug:     'describe what happened, what you expected, and how to reproduce it.',
    feature: 'tell us more...',
    general: 'tell us more...',
};

const MESSAGE_MAX = 500;

const INITIAL_STATE: FeedbackFormState = {
    type: 'feature', subject: '', message: '', email: '',
};

function validate(form: FeedbackFormState): FormErrors<FeedbackFormState> {
    const errors: FormErrors<FeedbackFormState> = {};

    if (!form.subject.trim())
        errors.subject = 'subject is required.';

    if (!form.message.trim())
        errors.message = 'message is required.';
    else if (form.message.length < 20)
        errors.message = 'too short — please give us more detail (min 20 chars).';

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errors.email = 'invalid email address.';

    return errors;
}

const FeedbackForm = () => {
    const [form, setForm] = useState<FeedbackFormState>(INITIAL_STATE);
    const [errors, setErrors] = useState<FormErrors<FeedbackFormState>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const set = useCallback(<K extends keyof FeedbackFormState>(key: K, value: FeedbackFormState[K]) => {
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
                <div className={s.successTitle}>feedback received.</div>
                <div className={s.successMsg}>
                    {TYPE_LABELS[form.type]} logged.<br />
                    thanks for helping improve mackit.
                </div>
                <button className={s.successAgain} onClick={handleReset}>
                    send more feedback →
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className={s.sectionHd}>feedback type</div>

            <div className={s.field}>
                <RadioGroup
                    options={TYPE_OPTIONS}
                    value={form.type}
                    onChange={(v) => set('type', v as FeedbackType)}
                />
            </div>

            <div className={s.field}>
                <div className={s.fieldLabel}>subject</div>
                <input
                    className={`${s.inp} ${errors.subject ? s.inpError : ''}`}
                    type='text'
                    placeholder={SUBJECT_PLACEHOLDERS[form.type]}
                    value={form.subject}
                    onChange={(e) => set('subject', e.target.value)}
                />
                {errors.subject && <div className={s.fieldError}>{errors.subject}</div>}
            </div>

            <div className={s.field}>
                <div className={s.fieldLabel}>
                    <span>message</span>
                    <span className={`${s.charCount} ${form.message.length > 450 ? s.charCountNear : ''}`}>
                        {form.message.length}/{MESSAGE_MAX}
                    </span>
                </div>
                <textarea
                    className={`${s.inp} ${s.inpTextarea} ${errors.message ? s.inpError : ''}`}
                    placeholder={MESSAGE_PLACEHOLDERS[form.type]}
                    maxLength={MESSAGE_MAX}
                    rows={5}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                />
                {errors.message && <div className={s.fieldError}>{errors.message}</div>}
            </div>

            <div className={s.field}>
                <div className={s.fieldLabel}>
                    <span>your email</span>
                    <span className={s.fieldOptional}>optional — we&apos;ll reply if you&apos;d like</span>
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
                {loading ? '// sending...' : 'send feedback →'}
            </button>
        </form>
    );
};

export default FeedbackForm;
