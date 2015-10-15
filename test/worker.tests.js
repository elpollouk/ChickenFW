(function () {
	"use strict";

	window.Tests.WorkerTests = {

		construct_noHandlers: function () {

			var worker = Chicken.startWorker(function (global) {

			});

			Assert.isSame(null, worker.onmessage, "onmessage not set correctly");
			Assert.isSame(null, worker.onerror, "onerror not set correctly");

			worker.terminate();

		},

		construct_withHandlers: function () {

			var onmessage = function () {};
			var onerror = function () {};

			var worker = Chicken.startWorker(function (global) {

			}, onmessage, onerror);

			Assert.isSame(onmessage, worker.onmessage, "onmessage not set correctly");
			Assert.isSame(onerror, worker.onerror, "onerror not set correctly");

			worker.terminate();

		},



	};

})();