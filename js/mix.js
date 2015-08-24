(function () {
    "use strict";

    var mixIntoObj = function mixIntoObj(dst, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                dst[key] = src[key];
            }
        }
    };

    Utils.namespace("Utils", {
        // Mix all subsequent objects into the object specified in the first argument
        mix: function mix() {
            var target = arguments[0];

            for (var  i = 1; i < arguments.length; i++) {
                var component = arguments[i];
                mixIntoObj(target, component);
            }
        },

        // Construct a new object which is a combination of all the specified object
        combine: function combine() {
            var obj = {};

            for (var i = 0; i < arguments.length; i++) {
                mixIntoObj(obj, arguments[i]);
            }

            return obj;
        }
    });
})();