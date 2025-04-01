# Vanilla Infinite Marquee

[![npm](https://img.shields.io/npm/v/react-fast-marquee.svg)](https://www.npmjs.com/package/vanilla-infinite-marquee)
[![npm downloads](https://img.shields.io/npm/dt/react-fast-marquee.svg)](https://www.npmjs.com/package/vanilla-infinite-marquee)
[![npm license](https://img.shields.io/npm/l/react-fast-marquee.svg)](https://www.npmjs.com/package/vanilla-infinite-marquee)

## Installation

`CDN` Usage
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanilla-infinite-marquee@1.0.13/infinite-marquee.min.css">
<script src="https://cdn.jsdelivr.net/npm/vanilla-infinite-marquee@1.0.13/infinite-marquee.bundle.js"></script>
```

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
| Option                   | Type             | Default                                  | Description                                                                                         |
|:-------------------------|:-----------------|:-----------------------------------------|:----------------------------------------------------------------------------------------------------|
| `element`                | `string`, `Node` | `null`                                   | Selector                                                                                            |
| `direction`              | `string`         | `"left"`                                 | Direction of Marquee animation, `"left"`, `"right"`, `"top"`, `"bottom"`                            |
| `spaceBetween`           | `string`         | `"0px"`                                  | Gaps to be used **ONLY** for `"left"` or `"right"` direction                                        |
| `gap`                    | `object`         | `{vertical: "5px", "horizontal: "0px" }` | Gaps to be used **ONLY** for `"top"` or `"bottom"` direction                                        |
| `speed`                  | `number`         | `10000`                                  | Speed of animation in `ms`                                                                          |
| `smoothEdges`            | `boolean`        | `false`                                  | Whether to smooth covered edges or not                                                              |
| `fullContainer`          | `boolean`        | `true`                                   | Fill the full width of container(**DESKTOP**), **ONLY** for `"left"` or `"right"` direction         |
| `fullContainerWidth`     | `number`         | `100`                                    | Full width container size with **number** value that later converts into percentage                 |
| `pauseOnHover`           | `boolean`        | `false`                                  | Pause animation on hover                                                                            |
| `destroyOnDesktop`       | `boolean`        | `false`                                  | Destroy with Reverting Marquee structure and animation on `"Desktop"`                               |
| `destroyOnMobile`        | `boolean`        | `false`                                  | Destroy with Reverting Marquee structure and animation on `"Mobile"`                                |
| `debugging`              | `boolean`        | `false`                                  | Debug in console each event of Marquee lifecycle                                                    |
| `elementClass`           | `string`         | `marquee-container`                      | Class of Container that will be used to destroy Marquee                                             |
| `duplicateCount`         | `number`         | `1`                                      | Count of Marquee Container to be duplicated for showing an effect of continuous flow                |
| `duplicateInnerElements` | `boolean`        | `true`                                   | Duplicating the ***Marquee Items*** inside the container, change to `false` if they're overlapping. |
| `breakpointSize`         | `number`         | `991.8`                                  | `"max-width"` breakpoint for responsive devices, accepted **ONLY** single breakpoint                |
| `mobileSettings`         | `object`         | `{}`                                     | Responsive options (works only for `spaceBetween`, `gap`, `speed` and `direction` properties)       |
| `on`                     | `object`         | `{}`                                     | Object to contain callback functions below                                                          |
| `beforeInit`             | `function`       | `null`                                   | A callback function that invokes before marquee initialization                                      |
| `afterInit`              | `function`       | `null`                                   | A callback function that invokes after marquee initialization                                       |
| `pauseAnimation`         | `function`       | `null`                                   | A callback function that invokes on Pause                                                           |
| `resumeAnimation`        | `function`       | `null`                                   | A callback function that invokes on Resume                                                          |