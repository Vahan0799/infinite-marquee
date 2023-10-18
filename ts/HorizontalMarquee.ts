export default class HorizontalMarquee {
    element: HTMLElement[] | HTMLElement;
    speed: number;
    gap: string;
    horizontalDirection: string;
    duplicateCount: number;
    breakpointSize: number;
    smoothEdges: boolean;
    mobileSettings: { horizontalDirection?: string; speed?: number; gap?: string };
    on: {
        beforeInit?: () => void;
        afterInit?: () => void;
    };

    constructor(options: {
        element?: string | HTMLElement | (string | HTMLElement)[];
        speed?: number;
        gap?: string;
        horizontalDirection?: string;
        duplicateCount?: number;
        breakpointSize?: number;
        smoothEdges?: boolean;
        mobileSettings?: {
            horizontalDirection?: string;
            speed?: number;
            gap?: string;
        };
        on?: {
            beforeInit?: () => void;
            afterInit?: () => void;
        };
    } = {}) {
        this.element = typeof options.element === 'string'
            ? Array.from(document.querySelectorAll(options.element)) as HTMLElement[]
            : options.element as HTMLElement | HTMLElement[];
        this.speed = options.speed || 10000;
        this.gap = options.gap || '0px';
        this.horizontalDirection = options.horizontalDirection || 'left';
        this.duplicateCount = options.duplicateCount || 1;
        this.breakpointSize = options.breakpointSize || 991.8;
        this.smoothEdges = options.smoothEdges || false;
        this.mobileSettings = options.mobileSettings || {};
        this.on = {
            beforeInit: options.on && options.on.beforeInit || null,
            afterInit: options.on && options.on.afterInit || null
        };
        this.init();
    }

    init(): void {
        if (typeof this.on.beforeInit === 'function') {
            this.on.beforeInit();
        }

        if (
            (typeof window !== 'undefined' || typeof document !== 'undefined') &&
            (Array.isArray(this.element) ? this.element.length > 0 : this.element)
        ) {
            if (Array.isArray(this.element)) {
                // If the element selector could be an array of DOM
                for (const element of this.element) {
                    this.configureChildNodes(element);
                    this.configureAnimationOptions(element);
                }
            } else {
                // If it's a single element
                this.configureChildNodes(this.element as HTMLElement);
                this.configureAnimationOptions(this.element as HTMLElement);
            }
        }

        if (typeof this.on.afterInit === 'function') {
            this.on.afterInit();
        }
    }

    configureChildNodes(element: HTMLElement): void {
        const duplicatedContainer = document.createElement('div');
        duplicatedContainer.classList.add('horizontal-marquee-inner');

        // Move all the children of the element to the duplicated container
        while (element.firstChild) {
            duplicatedContainer.appendChild(element.firstChild);
        }

        element.classList.add('horizontal-marquee');
        element.appendChild(duplicatedContainer);

        this.duplicateOriginalNodes(duplicatedContainer);
        this.duplicateContainer(element);
    }

    duplicateOriginalNodes(container: HTMLElement): void {
        const children = container.children;
        const cloneChildren: HTMLElement[] = [];

        // Clone each child element
        for (let i = 0; i < children.length; i++) {
            const originalChild = children[i];
            const cloneChild = originalChild.cloneNode(true) as HTMLElement;
            cloneChild.setAttribute('aria-hidden', 'true');
            cloneChildren.push(cloneChild);
        }

        // Append the cloned elements to the end of the container
        for (const cloneChild of cloneChildren) {
            container.appendChild(cloneChild);
        }
    }

    duplicateContainer(element: HTMLElement): void {
        const container = element.querySelector('.horizontal-marquee-inner') as HTMLElement;
        const cloneContainer = container.cloneNode(true) as HTMLElement;

        // Remove aria-hidden attribute for child elements in the cloned container
        const children = cloneContainer.children;
        for (let i = 0; i < children.length; i++) {
            children[i].removeAttribute('aria-hidden');
        }

        if (this.duplicateCount >= 1) {
            cloneContainer.setAttribute('aria-hidden', 'true');
        }

        // Create an array of duplicate containers
        const duplicateContainers = Array.from({ length: this.duplicateCount }, () =>
            cloneContainer.cloneNode(true) as HTMLElement
        );

        // Append all duplicate containers to the original element
        element.append(...duplicateContainers);
    }

    configureAnimationOptions(element: HTMLElement): void {
        const media = window.matchMedia(`(max-width: ${this.breakpointSize}px)`);

        const updateAnimationOptions = (): void => {
            const mobileDirection = this.mobileSettings.horizontalDirection || this.horizontalDirection;

            const direction = media.matches
                ? mobileDirection === 'right' ? 'reverse' : 'forwards'
                : this.horizontalDirection === 'right' ? 'reverse' : 'forwards';

            const speed = media.matches ? this.mobileSettings.speed || this.speed : this.speed;
            const gap = media.matches ? this.mobileSettings.gap || this.gap : this.gap;

            element.style.setProperty('--_speed', `${speed}ms`);
            element.style.setProperty('--_gap', gap);
            element.style.setProperty('--_direction', direction);
            this.smoothEdges && element.classList.add('smooth');
        };

        updateAnimationOptions();

        window.addEventListener('resize', updateAnimationOptions);
    }
}
