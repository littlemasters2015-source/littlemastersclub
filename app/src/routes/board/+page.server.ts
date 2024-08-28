import { boardMembersQuery as query, type BoardMember } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const initial = await loadQuery<BoardMember[]>(query);

	return {
		query,
		options: { initial }
	};
};
