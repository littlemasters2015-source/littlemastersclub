import { eventsQuery, type Event, homePageQuery, type HomePage } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const homepage = await loadQuery<HomePage>(homePageQuery);
	const events = await loadQuery<Event[]>(eventsQuery);

	return {
		homepage: {
			query: homePageQuery,
			options: { initial: homepage }
		},
		events: {
			query: eventsQuery,
			options: { initial: events }
		},
		meta: {
			title: 'Little Masters Club',
			description:
				'Little Masters Club is a nonprofit organization that seeks to provide an encouraging environment for kids to be learners, mentors, team players, and leaders.'
		}
	};
};
