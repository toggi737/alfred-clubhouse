const alfy = require("alfy");

(async () => {
	const response = await alfy.fetch(
		`https://api.clubhouse.io/api/v3/search/stories?token=${process.env.API_TOKEN}`,
		{
			maxAge: 60 * 1000,
			method: "GET",
			body: {
				page_size: 25,
				query: alfy.input
			}
		}
	);

	alfy.output(
		response.data.map(story => ({
			title: story.name,
			arg: story.app_url
		}))
	);
})();
