import { eventsQuery as query, type Event } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const initial = await loadQuery<Event[]>(query);

	return {
		query,
		options: { initial }
	};
};
