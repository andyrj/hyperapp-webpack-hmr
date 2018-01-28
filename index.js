function updateGlobalState(name, data) {
  window[name] = Object.assign({}, window[name], data);
}

module.exports = function hmr(app) {
  return function (state, actions, view, container) {
    var storageName = "hmrState";
    const wrappedActions = {};                                                                                                                                                                                   
    const wrap = function(root, actions) {                                                                                                                                                           
      Object.keys(actions).forEach(function(key) {                                                                                                                                                          
        var action = actions[key];                                                                                                                                                                          
        if (typeof action === 'function') {                                                                                                                                                                 
          root[key] = function() {                                                                                                                                                                          
            var result = action.apply(this, arguments);                                                                                                                                                     
            updateGlobalState(storageName, wrappedActions.getState()); 
            return result;                                                                                                                                                                                  
          }                                                                                                                                                                                                 
        } else if (typeof action === 'object') {                                                                                                                                                            
          root[key] = {}; 
          wrap(root[key], action);
        }                                                                                                                                                                                                   
      });                                                                                                                                                                                                   
    }                                                                                                                                                                                                       
    wrap(wrappedActions, actions);                                                                                                                                                                        
    wrappedActions.getState = function() { 
      return function(state) {                                                                                                                                                                              
        return state;                                                                                                                                                                                       
      };                                                                                                                                                                                                    
    }                                     
    return app(state, wrappedActions, view, container);
  }
};
