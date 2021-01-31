export interface Word {
    second: number;
    text: string;
}

export interface TotalReport {
    score: number;
    averageSecond: number;
}

export interface EventBinding {
    element: HTMLElement
    type: string;
    handler: (event: Event) => unknown
}