(function () {
	"use strict";

	window.Tests.InjectTests = {

		beforeTest: function () {
			Chicken.clear();
		},

		clear: function () {
			Chicken.register("clear", "A");
			Chicken.clear();
			Chicken.register("clear", "B");

			Assert.isSame("B", Chicken.fetch("clear"), "Wrong value returned after clearing");
		},

		register_wrongArgs: function () {
			Assert.expectedException({
				message: "Incorrect number of arguments passed to Chicken.register()"
			}, function () {
				Chicken.register();
			});
		},

		register_value_existing: function () {
			Chicken.register("value", 1);

			Assert.expectedException({
				message: "Item 'value' already registered"
			}, function () {
				Chicken.register("value", 2);
			});
			Assert.isSame(1, Chicken.fetch("value"), "Registered value was changed");
		},

		register_value_nonStringName: function () {
			Assert.expectedException({
				message: "Invalid name specified. Must be a string but was number"
			}, function () {
				Chicken.register(123, 456);
			});
		},

		register_initor_existing: function () {
			Chicken.register("value", [], function () {
				return "ok";
			});
			Assert.expectedException({
				message: "Item 'value' already registered" 
			}, function () {
				Chicken.register("value", [], function () {});
			});
		},

		register_initor_nonStringName: function () {
			Assert.expectedException({
				message: "Invalid name specified. Must be a string but was object"
			}, function () {
				Chicken.register({}, [], function () {});
			});
		},

		register_initor_nonArrayDepedencies: function () {
			Assert.expectedException({
				message: "Dependencies weren't passed as an array for 'Foo'"
			}, function () {
				Chicken.register("Foo", "bad", function () {});
			});
		},

		register_initor_nonFunctionInitor: function () {
			Assert.expectedException({
				message: "Invalid initor for 'Foo'" 
			}, function () {
				Chicken.register("Foo", [], null);
			});
		},

		register_initor_argumentMismatch: function () {
			Assert.expectedException({
				message: "Wrong number of dependencies specified for initor provided for 'Foo'"
			}, function () {
				Chicken.register("Foo", ["a", "b", "c"], function (a, b) {});
			});
		},

		fetch_noDependenciesRegistered: function () {
			Assert.expectedException({
				message: "Item 'bar' has not been registered."
			}, function () {
				Chicken.fetch("bar");
			});
		},

		fetch_mocks: function () {
			var value = Chicken.fetch("test", {
				test: "Foo"
			});

			Assert.isSame("Foo", value, "Mocked value not returned");
		},

		fetch_global: function () {
			var value = Chicken.fetch("Assert");
			Assert.isSame(Assert, value, "Global value was not returned");
		},

		fetch_global_nested: function () {
			var value = Chicken.fetch("Assert.isTrue");
			Assert.isSame(Assert.isTrue, value, "Global value was not returned");
		},

		fetch_value: function () {
			var value = "A test value";
			Chicken.register("dep", value);

			Assert.isSame(value, Chicken.fetch("dep"), "Wrong dependency value returned");
		},

		fetch_initor_noDependencies: function () {
			var count = 0;
			Chicken.register("foo", [], function () {
				count++;
				return 12345;
			});

			Assert.isSame(0, count, "Initor called before dependency fetched");
			Assert.isSame(12345, Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(1, count, "Initor called multiple times");
		},

		fetch_initor_multipleFetch: function () {
			var count = 0;
			Chicken.register("foo", [], function () {
				count++;
				return 12345;
			});

			Assert.isSame(0, count, "Initor called before dependency fetched");
			Assert.isSame(12345, Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(12345, Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(12345, Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(1, count, "Initor called multiple times");
		},

		fetch_initor_valueDependency: function () {
			var count = 0;
			Chicken.register("foo", ["bar"], function (bar) {
				count++;
				return bar;
			});

			Chicken.register("bar", "BAR");

			Assert.isSame(0, count, "Initor called before dependency fetched");
			Assert.isSame("BAR", Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(1, count, "Initor called multiple times");
		},

		fetch_initor_globalDependency: function () {
			var count = 0;
			Chicken.register("foo", ["Assert.isSame"], function (isSame) {
				count++;
				return isSame;
			});


			Assert.isSame(0, count, "Initor called before dependency fetched");
			Assert.isSame(Assert.isSame, Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(1, count, "Initor called multiple times");
		},

		fetch_initor_initorDependency: function () {
			var countFoo = 0;
			var countBar = 0;
			Chicken.register("foo", ["bar"], function (bar) {
				countFoo++;
				return bar;
			});

			Chicken.register("bar", [], function() {
				countBar++;
				return "test";
			});

			Assert.isSame(0, countFoo, "Initor foo called before dependency fetched");
			Assert.isSame(0, countBar, "Initor bar called before dependency fetched");
			Assert.isSame("test", Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(1, countFoo, "Initor foo called multiple times");
			Assert.isSame(1, countBar, "Initor bar called multiple times");
		},

		fetch_initor_multipleDependencies: function () {
			var countFoo = 0;
			var countBar = 0;
			var countBaz = 0;

			Chicken.register("foo", ["bar", "baz", "value"], function (bar, baz, value) {
				countFoo++;
				return value + baz + bar;
			});

			Chicken.register("bar", [], function () {
				countBar++;
				return "!!";
			});

			Chicken.register("baz", ["bar"], function (bar) {
				countBaz++;
				Assert.isSame("!!", bar, "Sub dependency bar not set correctly");
				return "World";
			});

			Chicken.register("value", "Hello ");

			Assert.isSame(0, countFoo, "Initor foo called before dependency fetched");
			Assert.isSame(0, countBar, "Initor bar called before dependency fetched");
			Assert.isSame(0, countBaz, "Initor baz called before dependency fetched");
			Assert.isSame("Hello World!!", Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(1, countFoo, "Initor foo called multiple times");
			Assert.isSame(1, countBar, "Initor bar called multiple times");
			Assert.isSame(1, countBaz, "Initor baz called multiple times");
		},

		fetch_initor_mockedDependencies: function () {
			var count = 0;

			Chicken.register("foo", ["bar", "baz"], function (bar, baz) {
				count++;
				return bar * baz;
			});

			var value = Chicken.fetch("foo", {
				bar: 3,
				baz: 5
			});

			Assert.isSame(15, value, "Wrong value returned for first foo");
			Assert.isSame(1, count, "Initor called wrong number of times");

			value = Chicken.fetch("foo", {
				bar: 7,
				baz: 11
			});

			Assert.isSame(77, value, "Initor wasn't re-evaluated correctly");
			Assert.isSame(2, count, "Initor wasn't called twice");
		},

		fetch_initor_missingDependency: function () {
			Chicken.register("foo", ["bar"], function (bar) {
				Assert.fail("Initor was called");
			});
			Assert.expectedException({
				message: "Item 'bar' has not been registered"
			}, function () {
				Chicken.fetch("foo");
			});
		},

		fetch_initor_circularDependencies: function () {
			Chicken.register("foo", ["bar"], function (bar) {
				Assert.fail("Initor foo was called");
			});
			Chicken.register("bar", ["baz"], function (baz) {
				Assert.fail("Initor bar was called");
			});
			Chicken.register("baz", ["bob", "foo", "dave"], function (bob, foo, dave) {
				Assert.fail("Initor baz was called");
			});

			Chicken.register("bob", 1);
			Chicken.register("dave", 2);

			Assert.expectedException({
				message: "Circular dependency detected when resolving 'foo'." 
			}, function () {
				Chicken.fetch("foo");
			});
		},

		inject: function () {
			var output;
			var count = 0;

			Chicken.register("foo", "Hello");
			Chicken.register("bar", [], function () {
				count++;
				return "World";
			});

			Chicken.inject(["foo", "bar", "Assert.isEqual"], function (foo, bar, isEqual) {
				Assert.isSame(Assert.isEqual, isEqual, "Wrong global value passed through");
				output = foo + " " + bar + "!!";
			});

			Assert.isSame(1, count, "Initor called multiple times");
			Assert.isSame("Hello World!!", output, "Output wasn't set correctly");
		},

		resolveAll: function () {
			var count = 0;
			Chicken.register("foo", [], function () {
				count++;
				return 12345;
			});

			Chicken.resolveAll();

			Assert.isSame(1, count, "Initor wasn't called before dependency fetched");
			Assert.isSame(12345, Chicken.fetch("foo"), "Wrong value setup by initor");
			Assert.isSame(1, count, "Initor called multiple times");
		},
	};

})();