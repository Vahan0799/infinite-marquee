interface MarqueeCallbacks {
    beforeInit?: () => void;
    afterInit?: () => void;
    pauseAnimation?: () => void;
    resumeAnimation?: () => void;
}
interface GapOptions {
    vertical?: string;
    horizontal?: string;
}
interface MobileSettings {
    direction?: 'left' | 'right' | 'top' | 'bottom';
    speed?: number;
    gap?: GapOptions;
    spaceBetween?: string;
}
interface InfiniteMarqueeOptions {
    element: string | HTMLElement | HTMLElement[];
    direction?: 'left' | 'right' | 'top' | 'bottom';
    spaceBetween?: string;
    gap?: GapOptions;
    speed?: number;
    fullContainer?: boolean;
    fullContainerWidth?: number;
    smoothEdges?: boolean;
    pauseOnHover?: boolean;
    duplicateCount?: number;
    duplicateInnerElements?: boolean;
    breakpointSize?: number;
    mobileSettings?: MobileSettings;
    destroyOnDesktop?: boolean;
    destroyOnMobile?: boolean;
    elementClass?: string;
    on?: MarqueeCallbacks;
    debugging?: boolean;
}

declare function debounce<T extends (...args: any[]) => void>(fn: T, delay?: number): (...args: Parameters<T>) => void;

declare class InfiniteMarquee {
    element: HTMLElement | HTMLElement[];
    direction: string;
    spaceBetween: string;
    gap: Required<GapOptions>;
    speed: number;
    fullContainer: boolean;
    fullContainerWidth: number;
    smoothEdges: boolean;
    pauseOnHover: boolean;
    duplicateCount: number;
    duplicateInnerElements: boolean;
    breakpointSize: number;
    desktopBreakpoint: number;
    mobileSettings: MobileSettings;
    destroyOnDesktop: boolean;
    destroyOnMobile: boolean;
    elementClass: string;
    on: MarqueeCallbacks;
    scrollType: 'horizontal' | 'vertical';
    debugging: boolean;
    animateMotion: boolean;
    isMarqueeInitialized: boolean;
    constructor(options: InfiniteMarqueeOptions);
    init(): void;
    pause(el?: HTMLElement | HTMLElement[]): void;
    resume(el?: HTMLElement | HTMLElement[]): void;
    debounce: typeof debounce;
}

export { InfiniteMarquee as default };
