# vue-implicit-css-modules

[![npm](https://img.shields.io/npm/v/vue-implicit-css-modules.svg)](https://www.npmjs.com/package/vue-implicit-css-modules) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> Implicitly replace class names using Vue css modules

## Installation

```bash
npm install --save vue-implicit-css-modules # npm
yarn add vue-implicit-css-modules # yarn
```

## Usage

### Plugin

```js
import Vue from 'vue'
import VueImplicitCssModules from 'vue-implicit-css-modules';
import globalModule from './global.module.css';

Vue.use(VueImplicitCssModules, {
  global: globalModule, // {} by default,
  unsafe: true // false by default
})
```

### Component
With the introduction of css modules in Vue, you have to write explicit code:
```html
<template>
  <div>
    <p :class="{ [$style.red]: isRed }">
      Am I red?
    </p>
    <p :class="[$style.red, $style.bold]">
      Red and bold
    </p>
  </div>
</template>

``` 
With `vue-implicit-css-modules` you can write classes as is:
```html
<template>
  <div>
    <p :class="{ 'red': true }">
      Am I red?
    </p>
    <p class="red bold">
      Red and bold
    </p>
  </div>
</template>

<script>
  export default {
    implicitCssModule: true, 
    data(){
    return {
      isRed: true
    }
    }
  }
</script>

<style module>
  .red {
    color: red;
  }
  .bold {
    font-weight: bold;
  }
</style>

```
and get same result:
```html
<div>
  <p :class="red_1VyoJ-uZ">
    Am I red?
  </p>
  <p class="red_1VyoJ-uZ bold_2dfrX-sE">
    Red and bold
  </p>
</div>
```
```css
.red_1VyoJ-uZ {
  color: red;
}
.bold_2dfrX-sE {
  font-weight: bold;
}
```
## Component options
> #### `implicitCssModule: boolean = false`
Whether or not to replace class names implicitly.

## Plugin options
> #### `global: CSSModule = {}`

Specify the global css module.
 
By default, `vue-implicit-css-modules` is looking for class names only in the current `$style`. 

If `global` is set, `vue-implicit-css-modules` will look in `global` too.

> #### `unsafe: boolean = false`

By default, `vue-implicit-css-modules` does process only components 
with `implicitCssModule` property specified upon creation. 

If `unsafe` is set to `true`, it will try to process all components (**including third-party**).

## Summary
I know that this behavior can be confusing, but I value aesthetics more.)

Project is in an early stage of development so any suggestions, feature requests, 
bug reports or pull requests are appreciated.

## License

[MIT](http://opensource.org/licenses/MIT)
