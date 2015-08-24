(function () {
    "use strict";

    var namespace = function namespace(path, content, parent) {
        var names = path.split(".");
        parent =  parent || window;

        if (typeof content === "object") {
            // Mix into the parent
            while (names.length) {
                var name = names.shift();

                parent[name] = parent[name] || {};
                parent = parent[name];
            }

            for (var key in content) {
                if (content.hasOwnProperty(key)) {
                    parent[key] = content[key];
                }
            }
        }
        else {
            // Set the parent directly
            while (names.length > 1) {
                var name = names.shift();

                parent[name] = parent[name] || {};
                parent = parent[name];
            }

            parent[names[0]] = content;
        }
    };

    // Export the the name space function in a safe way
    window.Utils = window.Utils || {};
    window.Utils.namespace = namespace;
})();