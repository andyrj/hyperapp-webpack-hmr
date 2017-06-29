
# hyperapp-webpack-hmr

> Maintain hyperapp state during Webpack Hot Module Reloads

A [hyperapp](https://github.com/hyperapp/hyperapp) [plugin](https://github.com/hyperapp/hyperapp/blob/master/docs/core.md#plugins) that stores the app's state in a global variable so that you can maintain your state during Webpack's Hot Module Reloading.

## Install

```sh
npm i hyperapp-webpack-hmr
```

## Usage

Start by loading persist in `plugins`

```jsx
/* myApp.jsx */
var { h, app } = require('hyperapp')
var hmr = require('hyperapp-webpack-hmr')

module.exports = function myApp(initState) {
  app({
    state: initState,
    view: (state) => <div>{count}</div>,
    plugins: [hmr({ name: 'state' })] // will store state in window.state by default via hmr()
  })
}
```

Then in your module.hot.accept, you will need to add something along these lines
```js
/* index.js */
var myApp = require('./myApp')

myApp({ count:0 })

if (module.hot) {
  module.hot.accept('./myApp', function(){
    document.body.innerHTML = ''
    myApp(window.state)
  })
}

``` 

A full webpack HMR example using this mixin's can be found in the following repo [andyrj/hyperapp-starter](https://github.com/andyrj/hyperapp-starter) 
