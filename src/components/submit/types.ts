export type AppType = 'cask' | 'formula';

export type AppCategory =
    | 'browsers'
    | 'dev'
    | 'terminals'
    | 'productivity'
    | 'communication'
    | 'media'
    | 'design'
    | 'utilities';

export interface AppFormState {
    name: string;
    brew: string;
    type: AppType;
    category: AppCategory;
    desc: string;
    url: string;
    email: string;
}

export type FeedbackType = 'bug' | 'feature' | 'general';

export interface FeedbackFormState {
    type: FeedbackType;
    subject: string;
    message: string;
    email: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;
