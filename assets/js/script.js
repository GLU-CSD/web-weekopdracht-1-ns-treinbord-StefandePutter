window.addEventListener("load", function () {
	var minutenEl = document.getElementById("minuten");

	for (var i = 0; i < 60; i++) {
		var minuutEl = document.createElement("div");
		minuutEl.classList.add("minuut");
		minuutEl.style.transform =
			"rotate(" + Math.round((i / 60) * 360) + "deg) translateX(80px)";
		minutenEl.appendChild(minuutEl);
	}

	setInterval(render, 1000);
	setTimeout(function () {
		document.body.classList.add("loaded");
	}, 1);

	render();
});

function render() {
	var now = new Date();

	var sec = now.getSeconds();
	var min = now.getMinutes();
	var uur = now.getHours();

	//now = new Date(2018, 1, 20, 12, 0, 0)
	document.getElementById("wijzer-sec").style.transform =
		"rotate(" + (uur * 360 + min * 360 + ((sec / 60) * 360 + 180)) + "deg)";
	document.getElementById("wijzer-min").style.transform =
		"rotate(" + (uur * 360 + ((min / 60) * 360 + 180)) + "deg)";
	document.getElementById("wijzer-uur").style.transform =
		"rotate(" +
		((min / 60) * (360 / 12) + ((uur % 12) / 12) * 360 + 180) +
		"deg)";
}
