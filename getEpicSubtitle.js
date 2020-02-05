const dateFns = require("date-fns");

module.exports = function getEpicSubtitle(epicWorkflowStates, epic) {
	let storiesCompleted = epic.stats.num_stories_done;
	let totalStories =
		(epic.stats.num_stories_unstarted || 0) +
		(epic.stats.num_stories_started || 0) +
		(storiesCompleted || 0);

	return `${
		epicWorkflowStates[epic.epic_state_id].name
	} (Active ${dateFns.formatDistance(
		dateFns.max(
			[
				epic.updated_at ? new Date(epic.updated_at) : undefined,
				epic.stats.last_story_update
					? new Date(epic.stats.last_story_update)
					: undefined
			].filter(Boolean)
		),
		new Date(),
		{
			addSuffix: true
		}
	)}) - ${storiesCompleted}/${totalStories} stories completed`;
};
