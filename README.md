# vue-ej

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compile files ready for testing within the web app
```
npm run build:staging
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### Working with SVG

We use `vue-svg-loader` & `image-webpack-loader`s when working with SVG.
If you wish to inline an SVG follow these instructions.
1. Place the image in the `assets` folder.
1. Import it into the component and add the `?inline` query.
    ```javascript
    <script>
        import InlineSVG from '../assets/star-full.svg?inline';
    </script>
    ```
1. Then use like a normal component
    ```vue
    <template>
      <inline-svg />
    </template>
    ```

---
* [vue-svg-loader](https://vue-svg-loader.js.org/)
* [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)
---

#### Styling guides
TODO - Update this file so that it provides a clear overview of how the styling is structured.
Introduce conventions but leave it to the README files at each level to provide deeper explanation to contexts and uses.


Just dumping some notes I have lying around on my laptop.

Some class prefixes that may help us apply some context and
understanding to the classes we're using.
```
        o-  : Object
        c-  : Component
        u-  : Utility
        t-  : Theme
        s-  : Scope
        is- : State
        js- : JS hook
        a-  : Analytics hook
```

Some ID prefixes (to be used in the markup itself) that may
help us identify the purpose of an ID. Styling should
NEVER be bound to these IDs.

```
      skip- : Skip link hook
labelledby- : Form label/input paring
```
___

Useful ITCSS architectures I've looked at:
- https://github.com/xfiveco/generator-chisel/tree/master/generators/app/templates/styles/itcss
- https://github.com/aarongarciah/itcss-sample/tree/master/src/scss

---
