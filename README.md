# Vanilla Infinite Marquee

[![npm](https://img.shields.io/npm/v/react-fast-marquee.svg)](https://www.npmjs.com/package/vanilla-infinite-marquee)
[![npm downloads](https://img.shields.io/npm/dt/react-fast-marquee.svg)](https://www.npmjs.com/package/vanilla-infinite-marquee)
[![npm license](https://img.shields.io/npm/l/react-fast-marquee.svg)](https://www.npmjs.com/package/vanilla-infinite-marquee)

## Installation

If you're using `npm`, in the command prompt run:

```sh
npm install vanilla-infinite-marquee
```

If you're using `yarn`, run:

```sh
yarn add vanilla-infinite-marquee
```

## **[Demo](https://master--infinite-marquee-demo.netlify.app/)**

## Usage
To use the component, first import `CSS styles` into your `CSS/SCSS` file:
```scss
@import 'node_modules/vanilla-infinite-marquee/infinite-marquee.css'; //OR
@import 'node_modules/vanilla-infinite-marquee/infinite-marquee.scss';
```
### _Basic HTML Input_
```html
<div class="marquee-container">
    <p>Horizontal Marquee Item 1</p>
    <p>Horizontal Marquee Item 2</p>
</div>
```
import `InfiniteMarquee` into your `JS` file:
```jsx
import InfiniteMarquee from 'vanilla-infinite-marquee';

new InfiniteMarquee({
	element: '.marquee-container',
	speed: 25000,
	smoothEdges: true,
	direction: 'right',
	gap: '15px',
	duplicateCount: 2,
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
```

## Options
| Option             | Type             | Default                                  | Description                                                                                   |
|:-------------------|:-----------------|:-----------------------------------------|:----------------------------------------------------------------------------------------------|
| `element`          | `string`, `Node` | `null`                                   | Selector                                                                                      |
| `direction`        | `string`         | `"left"`                                 | Direction of Marquee animation, `"left"`, `"right"`, `"top"`, `"bottom"`                      |
| `spaceBetween`     | `string`         | `"0px"`                                  | Gaps to be used for `"left"` or `"right"` direction **ONLY**                                  |
| `gap`              | `object`         | `{vertical: "5px", "horizontal: "0px" }` | Gaps to be used for `"top"` or `"bottom"` direction **ONLY**                                  |
| `speed`            | `number`         | `10000`                                  | Speed of animation in `ms`                                                                    |
| `smoothEdges`      | `boolean`        | `false`                                  | Whether to smooth covered edges or not                                                        |
| `fullContainer`    | `boolean`        | `true`                                   | Fill the full width of container, for `"left"` or `"right"` direction **ONLY**                |
| `pauseOnHover`     | `boolean`        | `false`                                  | Pause animation on hover                                                                      |
| `destroyOnDesktop` | `boolean`        | `false`                                  | Destroy Marquee structure and animation on `"Desktop"`                                        |
| `destroyOnMobile`  | `boolean`        | `false`                                  | Destroy Marquee structure and animation on `"Mobile"`                                         |
| `debugging`        | `boolean`        | `false`                                  | Debug in console each event of Marquee lifecycle                                              |
| `elementClass`     | `string`         | `marquee-container`                      | Class of Container that will be used to destroy Marquee                                       |
| `duplicateCount`   | `number`         | `1`                                      | Count of marquee be duplicated to show an effect of continuous flow                           |
| `breakpointSize`   | `number`         | `991.8`                                  | `"max-width"` breakpoint for responsive devices, accepted only single breakpoint              |
| `mobileSettings`   | `object`         | `{}`                                     | Responsive options (works only for `spaceBetween`, `gap`, `speed` and `direction` properties) |
| `on`               | `object`         | `{}`                                     | Object to contain callback functions below                                                    |
| `beforeInit`       | `function`       | `null`                                   | A callback function that invokes before marquee initialization                                |
| `afterInit`        | `function`       | `null`                                   | A callback function that invokes after marquee initialization                                 |
| `pauseAnimation`   | `function`       | `null`                                   | A callback function that invokes on Pause                                                     |
| `resumeAnimation`  | `function`       | `null`                                   | A callback function that invokes on Resume                                                    |
