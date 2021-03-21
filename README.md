# Drop Sharp

A simple VDOM library.

## Installation

```
$ npm install dropsharp --save
```

### Configuring JSX pragma

By default, [Babel] transforms your JSX code into a call to `React.createElement`. You can customize this behaviour by adding a **jsx pragma** at the top of your files, with the following syntax:

```js
/** @jsx drop */
```

Wher `drop` here is drop's replacement for `React.createElement`. You can read more about this behaviour in [@developit](https://github.com/developit)'s blog post: [WTF Is JSX](https://jasonformat.com/wtf-is-jsx/).

### Configuring Babel

You will need to install Babel's [transform react jsx plugin](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) in order to support JSX syntax only, instead of the full preset you normally would use for React.

Here's a sample of the bare minimum `.babelrc` config you will need:

```json
{
  "presets": ["env"],
  "plugins": ["transform-react-jsx"]
}
```

It is very convenient to replace your pragma everywhere by defoult, to avoid adding it as a comment at the top of your files. In order to do so, add the following config to the plugin:

```
{
    ...
    "plugins": [
        ["@babel/plugin-transform-react-jsx", {
            "pragma": "drop"
        }]
    ]
}
```

### Creating your first component

The syntax is similar to a usual React component, with the only difference of importing `drop` from droplang.

```jsx
// HelloWorld.js
import { drop } from "dropsharp";
import "./styles.css";

export const HelloWorld = ({ text }) => <h1 className="title">{text}</h1>;
```

To render an element, you would do:

```jsx
// index.js
import { drop, createElement } from "dropsharp";
import { HelloWolrd } from "./HelloWorld";

document
  .getElementById("app")
  .appendChild(createElement(<Hello text="Hello, drop!" />));
```

## Demo

You can see a working demo in the [examples folder](https://github.com/droplang/sharp/tree/master/examples).


## References

- [How to write your own Virtual DOM](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)
- [WTF is JSX](https://jasonformat.com/wtf-is-jsx/)
- [Joltik](https://github.com/delacruz-dev/joltik)


[![NPM](https://nodei.co/npm/dropsharp.png)](https://nodei.co/npm/dropsharp/)
