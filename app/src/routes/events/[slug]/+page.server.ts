import { eventQuery as query, type Event } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };
	const initial = await loadQuery<Event>(query, params);

	if (!initial.data) {
		error(404, {
			message: 'Event not found'
		});
	}

	return {
		query,
		params,
		options: { initial }
	};
};
