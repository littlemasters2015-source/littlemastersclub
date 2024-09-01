import { programsQuery as query, type Program } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;

	const initial = await loadQuery<Program[]>(query);

	return {
		query,
		options: { initial },
		meta: {
			title: 'Programs',
			description: 'Explore the diverse programs and opportunities at Little Masters Club.'
		}
	};
};
