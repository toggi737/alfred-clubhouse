const alfy = require("alfy");
const getEpics = require("./getEpics");
const getSubtitle = require("./getEpicSubtitle");

(async () => {
	let { epics, epicWorkflowStates } = await getEpics();

	const items = alfy.inputMatches(epics, "name").map(epic => ({
		title: epic.name,
		subtitle: getSubtitle(epicWorkflowStates, epic),
		arg: `https://app.clubhouse.io/bokunteam/stories/epic/${epic.id}`
	}));

	alfy.output(items);
})();
