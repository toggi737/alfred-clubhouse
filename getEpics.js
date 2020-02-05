const alfy = require("alfy");
const lodash = require("lodash");

module.exports = async function getEpics() {
	const [epics, epicWorkflow] = await Promise.all([
		await alfy.fetch(
			`https://api.clubhouse.io/api/v3/epics?token=${process.env.API_TOKEN}`,
			{
				maxAge: 60 * 1000
			}
		),
		await alfy.fetch(
			`https://api.clubhouse.io/api/v3/epic-workflow?token=${process.env.API_TOKEN}`,
			{
				maxAge: 60 * 1000
			}
		)
	]);
	const epicWorkflowStates = lodash.keyBy(
		epicWorkflow.epic_states,
		epic_state => epic_state.id
	);
	let sortedEpics = lodash
		.orderBy(epics, epic => epic.updated_at || "1")
		.reverse();
	return { epicWorkflowStates, epics: sortedEpics };
};
