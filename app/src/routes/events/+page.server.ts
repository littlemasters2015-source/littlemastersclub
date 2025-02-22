import { eventsQuery as query, type Event } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const initial = await loadQuery<Event[]>(query);
	console.log(initial);

	return {
		query,
		options: { initial },
		meta: {
			title: 'Events',
			description: 'Explore our upcoming events and meet the Little Masters Club community.'
		}
	};
};
