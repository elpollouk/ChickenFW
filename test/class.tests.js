(function () {
	"use strict";

	window.Tests.ClassTests = {
		define: function () {
			var MyClass = Utils.Class(function (init) {
				this._init = init;
			},
			{
				add: function (value) {
					this._init += value;
				},
				inc: function () {
					this.add(1);
				}
			},
			{
				init: {
					get: function () {
						return this._init;
					},
					set: function (value) {
						this._init = -value;
					}
				}
			},
			{
				MAGIC: 42
			});

			var obj1 = new MyClass(MyClass.MAGIC);
			Assert.isEqual(42, obj1.init, "Getter property did not return correct value");
			var obj2 = new MyClass(3);
			Assert.isEqual(42, obj1.init, "Getter property did not return correct value");
			Assert.isEqual(3, obj2.init, "Getter property did not return correct value");

			obj1.add(4);
			Assert.isEqual(46, obj1.init, "Getter property did not return correct value");
			Assert.isEqual(3, obj2.init, "Getter property did not return correct value");

			obj2.inc();
			Assert.isEqual(46, obj1.init, "Getter property did not return correct value");
			Assert.isEqual(4, obj2.init, "Getter property did not return correct value");

			obj1.init = 12;
			Assert.isEqual(-12, obj1.init, "Getter property did not return correct value");
			Assert.isEqual(4, obj2.init, "Getter property did not return correct value");			
		}
	};
})();