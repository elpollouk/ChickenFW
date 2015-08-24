(function () {
    "use strict";

    var Class = function Class(constructor, memberFuncs, properties, statics) {
        memberFuncs && Utils.mix(constructor.prototype, memberFuncs);
        properties  && Object.defineProperties(constructor.prototype, properties);
        statics     && Utils.mix(constructor, statics);

        return constructor;
    };

    var registerClass = function registerClass(namespacePath, constructor, memberFuncs, properties, statics) {
        var c = Utils.Class(constructor, memberFuncs, properties, statics);
        Utils.namespace(namespacePath, c);
        return c;
    };

    // Export
    window.Utils.Class = Class;
    window.Utils.registerClass = registerClass;
})();