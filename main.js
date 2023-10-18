import './css/style.css';
import './css/horizontal-marquee.css';
import HorizontalMarquee from './js/HorizontalMarquee.js';

document.addEventListener('DOMContentLoaded', function () {
	const wrapper = document.querySelectorAll('.marque-examp')

	wrapper.forEach(el => {
		new HorizontalMarquee({
			element: el,
			speed: 50000,
			smoothEdges: el.getAttribute('data-smooth'),
			horizontalDirection: el.getAttribute('data-direction'),
			mobileSettings: {
				horizontalDirection: 'left',
				speed: 20000
			},
			on: {
				beforeInit: () => {
					console.log('Not Yet Initialized');
				},

				afterInit: () => {
					console.log('Initialized');
				}
			}
		});
	});
})
