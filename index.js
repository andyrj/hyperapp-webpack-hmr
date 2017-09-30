module.exports = function hmr(options) {
  if (!options) options = {};

  function updateGlobalState(name, data) {
    window[name] = Object.assign({}, window[name], data);
  }

  var storageName = "state";
  if (options.name !== undefined) {
    storageName = options.name;
  }

  return function(props) {
    return {
      hooks: [
        function(state, actions) {
          updateGlobalState(storageName, state);
          return function() {
            return function(nextState) {
              updateGlobalState(storageName, data);
            }
          }
        }
      ]
    };
  };
};
