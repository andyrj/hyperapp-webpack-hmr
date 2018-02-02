
# hyperapp-webpack-hmr

> *DEPRECATED* Readme now contains example usage of hyperapp with webpack-hmr, this package is no longer needed

## Example Usage

1. Setup webpack for hmr as specified in their documentation.

2. Basically you need to make it so your whole app will be re-instantiated on top of your currently rendered output which will use the built-in hydration.  The only requirement of your app is you provide a getState() action that returns the current state for access in our module.hot code.
```js
/* myApp.js */
var { h, app } = require('hyperapp')
module.exports = function myApp(initState) {
  return app(
    initState,
    {
      getState: () => state => state,
      increment: () => state => ({ count: state.count + 1 }),
      decrement: () => state => ({ count: state.count - 1})
    },
    (state) => h("div", {}, count)
  );
}
```
To complete the hmr setup your entry point should have something like the following.
```js
/* index.js */
var myApp = require('./myApp')

var appActions = myApp({ count: 0 })

if (module.hot) {
  module.hot.accept('./myApp', function(){
    appActions = myApp(appActions.getState())
  })
}

``` 
