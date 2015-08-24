(function () {
	"use strict";

	var MixIn123 = {
		one: function () {
			this.output += "1";
		},
		two: function () {
			this.output += "2";
		},
		three: function () {
			this.output += "3";
		}
	};

	var MixIn456 = {
		four: function () {
			this.output += "4";
		},
		five: function () {
			this.output += "5";
		},
		six: function () {
			this.output += "6";
		}
	};

	window.Tests.MixTests = {
		mixSingle: function () {
			var TargetObj = function () {
				this.output = "";
			};

			Utils.mix(TargetObj.prototype, MixIn123);

			var obj = new TargetObj();
			obj.one();
			obj.two();
			obj.three();

			Assert.isEqual("123", obj.output);
		},

		mixMultiple: function () {
			var TargetObj = function () {
				this.output = "";
			};

			Utils.mix(TargetObj.prototype, MixIn123, MixIn456);

			var obj = new TargetObj();
			obj.one();
			obj.two();
			obj.three();
			obj.four();
			obj.five();
			obj.six();

			Assert.isEqual("123456", obj.output);
		},

		combine_single: function () {
			var obj = Utils.combine(MixIn123);
			obj.output = "";

			obj.one();
			obj.two();
			obj.three();

			Assert.isEqual("123", obj.output);
		},

		combine_multiple: function () {
			var obj = Utils.combine(MixIn123, MixIn456);
			obj.output = "";

			obj.one();
			obj.two();
			obj.three();
			obj.four();
			obj.five();
			obj.six();

			Assert.isEqual("123456", obj.output);
		},
	};
})();