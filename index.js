function updateGlobalState(name, data) {
  window[name] = Object.assign({}, window[name], data);
}

module.exports = function hmr(app) {
  return function (state, actions, view, container) {
    const newActions = {};
    var storageName = "hmrState";
    updateGlobalState(storageName, state);
    Object.keys(actions).forEach(function(key) {
      var action = actions[key];
      newActions[key] = function() {
        var result = typeof action === "function" ? action.apply(this, arguments) : action;
        updateGlobalState(storageName, actions.getState());
        return result;
      }
    });
    newActions.getState = function() { 
      return function(state) {
        return state;
      };
    }
    return app(state, newActions, view, container);
  }
};
