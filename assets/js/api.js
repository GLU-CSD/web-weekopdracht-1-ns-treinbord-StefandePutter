fetch(
	"https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?station=Ut",
	{
		method: "GET",
		// Request headers
		headers: {
			"Cache-Control": "no-cache",
			"Ocp-Apim-Subscription-Key": API_KEY,
		},
	}
)
	.then((response) => {
		if (!response.ok) {
			throw new Error(
				"Network response was not ok. status: " + response.status
			);
		}
		return response.json();
	})
	.then((data) => {
		data.payload.departures.every((element) => {
			if (
				element.direction == "Zwolle" &&
				element.trainCategory == "SPR"
			) {
				makeBoard(element);
				return false;
			} else {
				return true;
			}
		});
	})
	.catch((err) => console.error(err));

function makeBoard(data) {
	destination = data.direction;
	track = data.actualTrack;
	trainType = data.trainCategory;
	viaStations = data.routeStations.map((name) => name.mediumName);
	message = data.messages.map((x) => x.message)[0];

	plannedTime = new Date(data.plannedDateTime);
	plannedTime = new Date(plannedTime);

	actualTime = new Date(data.actualDateTime) - new Date(data.plannedDateTime);
	actualTime = new Date(actualTime);

	plannedHour = plannedTime.getHours();
	plannedMin = plannedTime.getMinutes();

	differenceMin = actualTime.getMinutes();

	// track
	document.getElementById("track").innerHTML = track;

	// time
	document.getElementById("num").innerHTML = plannedHour + ":" + plannedMin;
	if (differenceMin > 0) {
		document.getElementById("extraTime").innerHTML =
			"+" + parseInt(differenceMin);
	}

	// train type
	document.getElementById("train-type").innerHTML =
		trainType == "SPR" ? "Sprinter" : "Intercity";

	// destination
	document.getElementById("destination").innerHTML = destination;

	// via stations
	let via = document.getElementById("via");
	via.innerHTML =
		viaStations.slice(0, -1).join(", ") + ", en " + viaStations.slice(-1);

	// message
	document.getElementById("message").innerHTML = "<p>" + message + "</p>";

	// next
	let nextTime =
		plannedMin == 21 ? plannedHour + ":51" : plannedHour + 1 + ":21";
	document.getElementById("next").innerHTML =
		"Hierna/next: " + nextTime + " SPR Zwolle";
}
