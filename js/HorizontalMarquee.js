export default class HorizontalMarquee {
	constructor(options = {}) {
		this.element = typeof options.element == 'string' ? [...document.querySelectorAll(options.element)] : options.element;
		this.direction = options.direction || 'left';
		this.gap = options.gap || '0px';
		this.speed = options.speed || 10000;
		this.smoothEdges = options.smoothEdges || false;
		this.fullContainer = options.fullContainer || false;
		this.duplicateCount = options.duplicateCount || 1;
		this.breakpointSize = options.breakpointSize || 991.8;
		this.mobileSettings = options.mobileSettings || {};
		this.on = {
			beforeInit: options.on && options.on.beforeInit || null,
			afterInit: options.on && options.on.afterInit || null
		};
		this.scrollType = options.direction === 'top' || options.direction === 'bottom' ? 'vertical' : 'horizontal';
		this.init();
	}

	init() {
		if (
			(typeof window !== 'undefined' || typeof document !== 'undefined') &&
			(Array.isArray(this.element) ? this.element.length > 0 : this.element)
		) {

			typeof this.on.beforeInit === 'function' && this.on.beforeInit();

			if (Array.isArray(this.element)) {
				// If the element selector could be an array of DOM
				for (const element of this.element) {
					this.configureChildNodes(element);
					this.configureAnimationOptions(element);
				}

			} else {
				// If it's single element
				this.configureChildNodes(this.element);
				this.configureAnimationOptions(this.element);
			}

			typeof this.on.afterInit === 'function' && this.on.afterInit();
		}
	}

	configureChildNodes(element) {

		const duplicatedContainer = document.createElement('div');
		duplicatedContainer.classList.add(`${this.scrollType}-marquee-inner`);

		// Move all the children of the element to the duplicated container
		while (element.firstChild) {
			duplicatedContainer.appendChild(element.firstChild);
		}

		element.classList.add(`${this.scrollType}-marquee`);
		element.appendChild(duplicatedContainer);

		this.duplicateOriginalNodes(duplicatedContainer);
		this.duplicateContainer(element);
	}

	duplicateOriginalNodes(container) {
		const children = container.children;
		const cloneChildren = [];

		// Clone each child element
		for (let i = 0; i < children.length; i++) {
			const originalChild = children[i];
			const cloneChild = originalChild.cloneNode(true);
			cloneChild.setAttribute('aria-hidden', true);
			cloneChildren.push(cloneChild);
		}

		// Append the cloned elements to the end of the container
		for (const cloneChild of cloneChildren) {
			container.appendChild(cloneChild);
		}
	}

	duplicateContainer(element) {
		const container = element.querySelector(`.${this.scrollType}-marquee-inner`);
		const cloneContainer = container.cloneNode(true);

		cloneContainer.setAttribute('aria-hidden', true);

		// Remove aria-hidden attribute for child elements in the cloned container
		const children = cloneContainer.children;
		for (let i = 0; i < children.length; i++) {
			children[i].removeAttribute('aria-hidden');
		}

		const duplicateCount = this.scrollType === 'vertical' ? this.duplicateCount + 1 : this.duplicateCount;

		// Create an array of duplicate containers
		const duplicateContainers = Array.from({ length: duplicateCount }, () =>
			cloneContainer.cloneNode(true)
		);

		// Append all duplicate containers to the original element
		element.append(...duplicateContainers);

		if (this.scrollType === 'vertical') {
			const fixedHeight = element.clientHeight - container.clientHeight
			element.style.setProperty('--_containerSize', `${fixedHeight}px`)
		}
	}

	configureAnimationOptions(element) {
		const media = window.matchMedia(`(max-width: ${this.breakpointSize}px)`);

		const updateAnimationOptions = () => {
			const mobileDirection = this.mobileSettings.direction || this.direction;
			const isMobileDirectionReverse = mobileDirection === 'right' || mobileDirection === 'bottom';
			const isThisDirectionReverse = this.direction === 'right' || this.direction === 'bottom';

			const direction = media.matches ? (isMobileDirectionReverse ? 'reverse' : 'forwards')
				: (isThisDirectionReverse ? 'reverse' : 'forwards');

			const speed = media.matches ? this.mobileSettings.speed || this.speed : this.speed;
			const gap = media.matches ? this.mobileSettings.gap || this.gap : this.gap;

			element.style.setProperty('--_speed', `${speed}ms`);
			element.style.setProperty('--_gap', gap);
			element.style.setProperty('--_direction', direction);
			this.smoothEdges && element.classList.add('smooth');
			this.fullContainer && element.classList.add('full');
		};

		updateAnimationOptions();

		window.addEventListener('resize', updateAnimationOptions);
	}
}
