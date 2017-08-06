module.exports = function hmr(options) {
  if (!options) options = {};

  function updateGlobalState(name, data) {
    window[name] = Object.assign({}, window[name], data);
  }

  var storageName = "state";
  if (options.name !== undefined) {
    storageName = options.name;
  }

  return function(app) {
    return {
      events: {
        load: function(state, actions) {
          updateGlobalState(storageName, state);
        },
        update: function(state, actions, data) {
          updateGlobalState(storageName, data);
        }
      }
    };
  };
};
