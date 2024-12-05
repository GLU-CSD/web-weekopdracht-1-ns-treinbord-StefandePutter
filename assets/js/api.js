let test1;
let test;
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
		test1 = data;
		data.payload.departures.every((element) => {
			if (
				element.direction == "Zwolle" &&
				element.trainCategory == "SPR"
			) {
				test = element;
				makeBoard(test);
				return false;
			} else {
				return true;
			}
		});
	})
	.catch((err) => console.error(err));

function makeBoard(data) {
	track = data.actualTrack;
	trainType = data.trainCategory;
	viaStations = data.routeStations;

	time = new Date(data.actualDateTime) - new Date();
	time -= data.actualTimeZoneOffset * 60000;
	time = new Date(time);

	hour = time.getHours();
	min = time.getMinutes();

	// console.log(viaStations[0].mediumName);
}
