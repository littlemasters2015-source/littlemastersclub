import { programsQuery as query, type Program } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

import { programsCategoryQuery } from '$lib/sanity/queries';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const initial = await loadQuery<Program[]>(query);

	return {
		query,
		options: { initial }
	};
};
