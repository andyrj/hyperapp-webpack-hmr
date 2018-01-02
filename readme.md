
# hyperapp-webpack-hmr

> Maintain hyperapp state during Webpack Hot Module Reloads

## Install

```sh
npm i hyperapp-webpack-hmr
```

## Usage

Start by loading hmr in mixins

```jsx
/* myApp.jsx */
var { h, app } = require('hyperapp')
var hmr = require('hyperapp-webpack-hmr')

module.exports = function myApp(initState) {
  return hmr(app)(
    initState,
    {
      increment: () => state => ({ count: state.count + 1 }),
      decrement: () => state => ({ count: state.count - 1})
    },
    (state) => <div>{count}</div>
  );
}
```

Then in your module.hot.accept, you will need to add something along these lines
```js
/* index.js */
var myApp = require('./myApp')

myApp({ count: 0 })

if (module.hot) {
  module.hot.accept('./myApp', function(){
    document.body.innerHTML = ''
    myApp(window.hmrState)
  })
}

``` 

A full webpack HMR example using this HOA can be found in the following repo [andyrj/hyperapp-starter](https://github.com/andyrj/hyperapp-starter) 
