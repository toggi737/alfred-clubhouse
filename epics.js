const alfy = require("alfy");
const getEpics = require("./getEpics");
const getSubtitle = require("./getEpicSubtitle");

(async () => {
	let { epicWorkflowStates, epics } = await getEpics();
	const items = alfy.inputMatches(epics, "name").map(epic => ({
		title: epic.name,
		subtitle: getSubtitle(epicWorkflowStates, epic),
		arg: epic.app_url
	}));
	alfy.output(items);
})();
