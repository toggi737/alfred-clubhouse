const alfy = require("alfy");
const dateFns = require("date-fns");
const lodash = require("lodash");

(async () => {
	const owner = await alfy.fetch(
		`https://api.clubhouse.io/api/v3/member?token=${process.env.API_TOKEN}`,
		{
			maxAge: 60 * 60 * 24 * 1000
		}
	);
	const stories = await alfy.fetch(
		`https://api.clubhouse.io/api/v3/stories/search?token=${process.env.API_TOKEN}`,
		{
			maxAge: 30 * 1000,
			method: "POST",
			body: {
				archived: false,
				owner_id: owner.id,
			}
		}
	);

	const matchedStories = alfy.inputMatches(stories, "name");
	const orderedStories = lodash.orderBy(
		matchedStories,
		["updated_at"],
		["desc"]
	);

	alfy.output(
		orderedStories.map(story => ({
			title: story.name,
			subtitle:
				"Updated " +
				dateFns.formatDistance(new Date(story.updated_at), new Date(), {
					addSuffix: true
				}),
			arg: story.app_url
		}))
	);
})();
