
module.exports = function hmr(options) {
  if (!options) options = {}

  return function (app) {
    return {
      events: {
				render: function (data) {
					var storageName = 'state';
					if (options.name !== undefined) {
						storageName = options.name;
					}
					window[storageName] = Object.assign({}, window[storageName], data);
				}
      }
    }
  }
}
