export default class HorizontalMarquee {
	constructor(options = {}) {
		this.element = typeof options.element == 'string' ? [...document.querySelectorAll(options.element)] : options.element;
		this.speed = options.speed || 10000;
		this.gap = options.gap || '0px';
		this.horizontalDirection = options.horizontalDirection || 'left';
		this.duplicateCount = options.duplicateCount || 1;
		this.breakpointSize = options.breakpointSize || 991.8;
		this.mobileSettings = options.mobileSettings || {};
		this.init();
	}

	init() {
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
				// If it's single element
				this.configureChildNodes(this.element);
				this.configureAnimationOptions(this.element);
			}
		}
	}

	configureChildNodes(element) {
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
		const container = element.querySelector('.horizontal-marquee-inner');
		const cloneContainer = container.cloneNode(true);

		// Remove aria-hidden attribute for child elements in the cloned container
		const children = cloneContainer.children;
		for (let i = 0; i < children.length; i++) {
			children[i].removeAttribute('aria-hidden');
		}

		if (this.duplicateCount >= 1) {
			cloneContainer.setAttribute('aria-hidden', true);
		}

		// Create an array of duplicate containers
		const duplicateContainers = Array.from({ length: this.duplicateCount }, () =>
			cloneContainer.cloneNode(true)
		);

		// Append all duplicate containers to the original element
		element.append(...duplicateContainers);
	}

	configureAnimationOptions(element) {
		const media = window.matchMedia(`(max-width: ${this.breakpointSize}px)`);

		const updateAnimationOptions = () => {
			const mobileDirection = this.mobileSettings.horizontalDirection || this.horizontalDirection;

			const direction = media.matches
				? mobileDirection === 'right' ? 'reverse' : 'forwards'
				: this.horizontalDirection === 'right' ? 'reverse' : 'forwards';

			const speed = media.matches ? this.mobileSettings.speed || this.speed : this.speed;
			const gap = media.matches ? this.mobileSettings.gap || this.gap : this.gap;

			element.style.setProperty('--_speed', `${speed}ms`);
			element.style.setProperty('--_gap', gap);
			element.style.setProperty('--_direction', direction);
		};

		updateAnimationOptions();

		window.addEventListener('resize', updateAnimationOptions);
	}
}

// new HorizontalMarquee({
// 	element: '.marquee-example',
// 	speed: 50000,
// 	horizontalDirection: 'right',
// 	mobileSettings: {
// 		horizontalDirection: 'left',
// 		speed: 20000
// 	}
// })
