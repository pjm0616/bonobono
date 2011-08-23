
function register_funcs(interp, o) {
	for (var name in o) {
		var func = (function(func) {
			return native_func(function(interp, args) {
				return func.apply(window, args);
			});
		})(o[name]);
		interp.global_env[name] = func;
	}
}

