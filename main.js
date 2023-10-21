import './style.css';
import './infinite-marquee.css';
import InfiniteMarquee from './infinite-marquee.mjs';

document.addEventListener('DOMContentLoaded', function () {
	const wrapper = document.querySelectorAll('.marque-examp');

	wrapper.forEach(el => {
		 new InfiniteMarquee({
			element: el,
			speed: el.getAttribute('data-speed'),
			smoothEdges: el.getAttribute('data-smooth'),
			direction: el.getAttribute('data-direction'),
			gap: '15px',
			duplicateCount: 3,
			mobileSettings: {
				direction: 'top',
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
