// fetch(
// 	"https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/arrivals?station=Ut",
// 	{
// 		method: "GET",
// 		// Request headers
// 		headers: {
// 			"Cache-Control": "no-cache",
// 			"Ocp-Apim-Subscription-Key": "3311bdfc1f4a464fbb0e4cfbcf22ce35",
// 		},
// 	}
// )
// 	.then((response) => {
// 		console.log(response.status);
// 		// console.log(response.text());
// 		test = response;
// 	})
// 	.catch((err) => console.error(err));

async function getData() {
	try {
		const response = await fetch(
			"https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/arrivals?station=Ut",
			{
				method: "GET",
				// Request headers
				headers: {
					"Cache-Control": "no-cache",
					"Ocp-Apim-Subscription-Key": api_key,
				},
			}
		);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const stream = response.body.pipeThrough(new TextDecoderStream());
		for await (const value of stream) {
			console.log(value);
		}
	} catch (error) {
		console.error(error.message);
	}
}

getData();
