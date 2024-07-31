/**
 * Infinite Marquee 1.0.10
 * Infinite Horizontal & Vertical Marquee animation based on CSS and controlled with JS
 *
 * Copyright 2024 Vahan Baghdasaryan
 *
 * Released under the MIT License
 *
 * Released on: August 1, 2024
 */

class InfiniteMarquee{constructor(e={}){this.element='string'==typeof e.element?[...document.querySelectorAll(e.element)]:e.element,this.direction=e.direction||'left',this.spaceBetween=e.spaceBetween||'0px',this.gap={vertical:e.gap&&e.gap.vertical||'5px',horizontal:e.gap&&e.gap.horizontal||'0px'},this.speed=e.speed||1e4,this.fullContainer=e.fullContainer||!1,this.fullContainerWidth=e.fullContainerWidth||100,this.smoothEdges=e.smoothEdges||!1,this.pauseOnHover=e.pauseOnHover||!1,this.duplicateCount=e.duplicateCount||1,this.breakpointSize=e.breakpointSize||1023,this.desktopBreakpoint=this.breakpointSize+1,this.mobileSettings=e.mobileSettings||{},this.destroyOnDesktop=e.destroyOnDesktop||!1,this.destroyOnMobile=e.destroyOnMobile||!1,this.elementClass=e.elementClass||'marquee-container',this.on={beforeInit:e.on&&e.on.beforeInit||null,afterInit:e.on&&e.on.afterInit||null,pauseAnimation:e.on&&e.on.pauseAnimation||null,resumeAnimation:e.on&&e.on.resumeAnimation||null},this.scrollType='top'===e.direction||'bottom'===e.direction?'vertical':'horizontal',this.debugging=e.debugging||!1,this.animateMotion=!0,this.isMarqueeInitialized=!1,!this.isMarqueeInitialized&&this.init(),'undefined'!=typeof window&&(this.destroyOnResponsive(),(this.destroyOnMobile||this.destroyOnDesktop)&&window.addEventListener('resize',this.destroyOnResponsive.bind(this)))}init(){if('undefined'==typeof window&&'undefined'==typeof document||!(Array.isArray(this.element)?this.element.length>0:this.element))this.debugging&&console.error('🚊 Infinite Marquee - Failed to Initialize');else{if(this.debugging&&console.log('🚊 Infinite Marquee - Initialized'),window.matchMedia('(prefers-reduced-motion: reduce)').matches&&(this.animateMotion=!1,this.debugging&&console.log('🚊 Infinite Marquee - "prefers-reduced-motion" is Reduced')),'function'==typeof this.on.beforeInit&&this.on.beforeInit(),Array.isArray(this.element)){this.isMarqueeInitialized=!0;for(const e of this.element)this.configureChildNodes(e),this.configureAnimationOptions(e);this.debugging&&console.log('🚊 Infinite Marquee - DOM Nodes Created from Array')}else this.isMarqueeInitialized=!0,this.configureChildNodes(this.element),this.configureAnimationOptions(this.element),this.debugging&&console.log('🚊 Infinite Marquee - DOM Nodes Created from Single Element');'function'==typeof this.on.afterInit&&this.on.afterInit()}}configureChildNodes(e){const t=document.createElement('div');for(t.classList.add(`${this.scrollType}-marquee-inner`);e.firstChild;)t.appendChild(e.firstChild);e.classList.add(`${this.scrollType}-marquee`),e.appendChild(t),this.duplicateOriginalNodes(t),this.duplicateContainer(e),this.debugging&&console.log('🚊 Infinite Marquee - DOM Nodes Appended Successfully')}duplicateOriginalNodes(e){const t=e.children,i=[];for(let e=0;e<t.length;e++){const s=t[e].cloneNode(!0);s.setAttribute('aria-hidden',!0),i.push(s)}for(const t of i)e.appendChild(t);this.debugging&&console.log('🚊 Infinite Marquee - DOM Nodes Duplicated Successfully')}duplicateContainer(e){const t=e.querySelector(`.${this.scrollType}-marquee-inner`),i=t.cloneNode(!0);i.setAttribute('aria-hidden',!0);const s=i.children;for(let e=0;e<s.length;e++)s[e].removeAttribute('aria-hidden');const n='vertical'===this.scrollType?this.duplicateCount+1:this.duplicateCount,o=Array.from({length:n},(()=>i.cloneNode(!0)));if(e.append(...o),'vertical'===this.scrollType){const i=e.clientHeight-t.clientHeight;e.style.setProperty('--_containerSize',`${i}px`)}}configureAnimationOptions(e){const t=window.matchMedia(`(max-width: ${this.breakpointSize}px)`);e.setAttribute('data-animate',this.animateMotion);const i=e=>{e.addEventListener('mouseenter',(()=>this.pause(e))),e.addEventListener('mouseleave',(()=>this.resume(e)))},s=()=>{if(this.isMarqueeInitialized){const s=this.mobileSettings.direction||this.direction,n='right'===s||'bottom'===s,o='right'===this.direction||'bottom'===this.direction,r=t.matches?n?'reverse':'forwards':o?'reverse':'forwards',l=t.matches&&this.mobileSettings.speed||this.speed;if(e.style.setProperty('--_speed',`${l}ms`),e.style.setProperty('--_direction',r),this.smoothEdges&&e.classList.add('smooth'),'vertical'===this.scrollType){const i=t.matches&&this.mobileSettings&&this.mobileSettings.gap&&this.mobileSettings.gap.horizontal||this.gap.horizontal,s=t.matches&&this.mobileSettings&&this.mobileSettings.gap&&this.mobileSettings.gap.vertical||this.gap.vertical;this.gap.horizontal&&e.style.setProperty('--_hGap',i),this.gap.vertical&&e.style.setProperty('--_vGap',s)}else{const i=t.matches&&this.mobileSettings.spaceBetween||this.spaceBetween,s=!t.matches&&this.fullContainer;e.style.setProperty('--_gap',i),e.classList.toggle('full',s),e.style.setProperty('--_containerWidth',s?`${this.fullContainerWidth}%`:''),console.log(s)}window.innerWidth>=this.desktopBreakpoint&&this.pauseOnHover&&this.animateMotion&&i(e),this.debugging&&console.log(`🚊 Infinite Marquee - ${this.scrollType} type`),this.debugging&&console.log('🚊 Infinite Marquee - Animation Configs Ready')}};s(),window.addEventListener('resize',this.debounce(s))}destroyOnResponsive(){const e=`${this.scrollType}-marquee-inner`,t=this.element;'undefined'!=typeof window&&(window.innerWidth<=this.breakpointSize&&this.destroyOnMobile||window.innerWidth>=this.desktopBreakpoint&&this.destroyOnDesktop?this.manageMarquee(t,e):this.isMarqueeInitialized||(this.init(),this.isMarqueeInitialized=!0))}manageMarquee(e,t){this.isMarqueeInitialized&&(this.destroy(e,t),this.isMarqueeInitialized=!1,this.debugging&&console.log('🚊 Infinite Marquee - Destroyed Successfully'))}removeClassesAfter(e,t){if(t&&t.classList){let i=!1;for(let s=0;s<t.classList.length;s++){const n=t.classList[s];i&&(t.classList.remove(n),s--),n===e&&(i=!0)}}}destroy(e,t){if(e){e.removeAttribute('style');const i=e.querySelectorAll(`.${t}`);for(let t=1;t<i.length;t++)e.removeChild(i[t]);const s=e.firstElementChild;if(s){if(s.querySelectorAll('[aria-hidden="true"]').forEach((e=>{s.removeChild(e)})),s.classList.contains(t)){for(;s.firstChild;)e.appendChild(s.firstChild);e.removeChild(s),this.removeClassesAfter(this.elementClass,e)}}}}pause(e){(e||this.element).classList.add('paused'),this.debugging&&console.log('🚊 Infinite Marquee - Animation Paused'),'function'==typeof this.on.pauseAnimation&&this.on.pauseAnimation()}resume(e){(e||this.element).classList.remove('paused'),this.debugging&&console.log('🚊 Infinite Marquee - Animation Resumed'),'function'==typeof this.on.resumeAnimation&&this.on.resumeAnimation()}debounce(e,t=300){let i;return(...s)=>{i&&clearTimeout(i),i=setTimeout((()=>{e(...s)}),t)}}}export{InfiniteMarquee as default};
