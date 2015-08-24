(function () {
	"use strict";

	window.Tests.NamespaceTests = {
		namespace: function () {
			var root = {};

			Chicken.namespace("n1.n2.n3", {
				a: 1,
				b: 2,
				c: 3
			}, root);

			Assert.isEqual(1, root.n1.n2.n3.a, "Value wasn't set correctly in name space");
			Assert.isEqual(2, root.n1.n2.n3.b, "Value wasn't set correctly in name space");
			Assert.isEqual(3, root.n1.n2.n3.c, "Value wasn't set correctly in name space");

			// Add some more stuff to the leaf namespace
			Chicken.namespace("n1.n2.n3", {
				d: 4
			}, root);

			Assert.isEqual(1, root.n1.n2.n3.a, "Value wasn't set correctly in name space");
			Assert.isEqual(2, root.n1.n2.n3.b, "Value wasn't set correctly in name space");
			Assert.isEqual(3, root.n1.n2.n3.c, "Value wasn't set correctly in name space");
			Assert.isEqual(4, root.n1.n2.n3.d, "Value wasn't set correctly in name space");

			// Extend the leaf namespace
			Chicken.namespace("n1.n2.n3.n4", {
				e: 5,
				f: 6
			}, root);

			Assert.isEqual(1, root.n1.n2.n3.a, "Value wasn't set correctly in name space");
			Assert.isEqual(2, root.n1.n2.n3.b, "Value wasn't set correctly in name space");
			Assert.isEqual(3, root.n1.n2.n3.c, "Value wasn't set correctly in name space");
			Assert.isEqual(4, root.n1.n2.n3.d, "Value wasn't set correctly in name space");
			Assert.isEqual(5, root.n1.n2.n3.n4.e, "Value wasn't set correctly in name space");
			Assert.isEqual(6, root.n1.n2.n3.n4.f, "Value wasn't set correctly in name space");

			// Add some stuff to a namespace nearer the root
			Chicken.namespace("n1", {
				g: 7,
				h: 8,
				i: 9
			}, root);

			Assert.isEqual(1, root.n1.n2.n3.a, "Value wasn't set correctly in name space");
			Assert.isEqual(2, root.n1.n2.n3.b, "Value wasn't set correctly in name space");
			Assert.isEqual(3, root.n1.n2.n3.c, "Value wasn't set correctly in name space");
			Assert.isEqual(4, root.n1.n2.n3.d, "Value wasn't set correctly in name space");
			Assert.isEqual(5, root.n1.n2.n3.n4.e, "Value wasn't set correctly in name space");
			Assert.isEqual(6, root.n1.n2.n3.n4.f, "Value wasn't set correctly in name space");
			Assert.isEqual(7, root.n1.g, "Value wasn't set correctly in name space");
			Assert.isEqual(8, root.n1.h, "Value wasn't set correctly in name space");
			Assert.isEqual(9, root.n1.i, "Value wasn't set correctly in name space");

			// Set a single item
			Chicken.namespace("n1.n2.j", 10, root);

			Assert.isEqual(1, root.n1.n2.n3.a, "Value wasn't set correctly in name space");
			Assert.isEqual(2, root.n1.n2.n3.b, "Value wasn't set correctly in name space");
			Assert.isEqual(3, root.n1.n2.n3.c, "Value wasn't set correctly in name space");
			Assert.isEqual(4, root.n1.n2.n3.d, "Value wasn't set correctly in name space");
			Assert.isEqual(5, root.n1.n2.n3.n4.e, "Value wasn't set correctly in name space");
			Assert.isEqual(6, root.n1.n2.n3.n4.f, "Value wasn't set correctly in name space");
			Assert.isEqual(7, root.n1.g, "Value wasn't set correctly in name space");
			Assert.isEqual(8, root.n1.h, "Value wasn't set correctly in name space");
			Assert.isEqual(9, root.n1.i, "Value wasn't set correctly in name space");
			Assert.isEqual(10, root.n1.n2.j, "Value wasn't set correctly in name space");
		}
	};
})();