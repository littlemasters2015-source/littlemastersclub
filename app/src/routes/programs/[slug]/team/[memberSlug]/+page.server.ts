import { teamMemberQuery as query, type TeamMember } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { stegaClean } from '@sanity/client/stega';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug: programSlug, memberSlug } = event.params;

	const initial = await loadQuery<TeamMember>(query, { programSlug, memberSlug }, { useCdn: false });

	if (!initial.data) {
		error(404, { message: 'Team member not found' });
	}

	return {
		query,
		params: { programSlug, memberSlug },
		options: { initial },
		meta: {
			title: stegaClean(initial.data.name)
		}
	};
};