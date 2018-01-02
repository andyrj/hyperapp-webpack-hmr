function updateGlobalState(name, data) {
  window[name] = Object.assign({}, window[name], data);
}

module.exports = function hmr(app) {
  return function (state, actions, view, container) {
    var storageName = "hmrState";
    updateGlobalState(storageName, state);
    Object.keys(actions).forEach(function(key) {
      var action = actions[key];
      actions[key] = function() {
        var result = action.apply(this, arguments);
        updateGlobalState(storageName, actions.getState());
        return result;
      }
    });
    actions.getState = function() { 
      return function(state) {
        return state;
      };
    }
    return app(state, actions, view, container);
  }
};
