export default function graphql(query) {
	fetch("http://152.228.217.28:5000/api/graphql/v1", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ query }),
	})
		.then(r => r.json())
		.then(data => console.log("data returned:", data))
}

