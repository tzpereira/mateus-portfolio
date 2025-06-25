export interface StackProps {
    locale: string;
}

export type StackItem = {
    title: string;
    description: string;
    icon: string;
};

export type StackGroup = {
    title: string;
    children: StackItem[];
};

export type StackData = Record<string, StackGroup>;