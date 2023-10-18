import './style.css';
import './horizontal-marquee.css';
import HorizontalMarquee from './HorizontalMarquee.js';

document.addEventListener('DOMContentLoaded', function () {
	const wrapper = document.querySelectorAll('.marque-examp')

	wrapper.forEach(el => {
		new HorizontalMarquee({
			element: el,
			speed: 50000,
			horizontalDirection: el.getAttribute('data-direction'),
			mobileSettings: {
				horizontalDirection: 'left',
				speed: 20000
			}
		});
	});
})
