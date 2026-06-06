export type AppCategory =
    | 'browsers'
    | 'dev'
    | 'terminals'
    | 'productivity'
    | 'communication'
    | 'media'
    | 'design'
    | 'utilities';

export type AppType = 'formula' | 'cask';

export interface App {
    id: string;
    name: string;
    cat: AppCategory;
    type: AppType;
    brew: string;
    desc: string;
}

export interface Category {
    id: 'all' | AppCategory;
    label: string;
}

export interface CategoryGroup {
    id: string;
    label: string;
    apps: App[];
}
