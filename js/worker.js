(Chicken.inject(["Worker"], function (Worker) {

	var workerFuncs = {

		startWorker: function Chicken_startWorker(main, onmessage, onerror) {

			var workerURL = URL.createObjectURL(new Blob(["(", main.toString(), ")(this);"], { type: "application/javascript" }));

			var worker = new Worker(workerURL);
			worker.onmessage = onmessage || null;
			worker.onerror = onerror || null;

			URL.revokeObjectURL(workerURL);

			return worker;

		},

	};


	Chicken.namespace("Chicken", workerFuncs);

}));