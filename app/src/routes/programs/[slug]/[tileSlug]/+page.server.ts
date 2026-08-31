import { programTileQuery as query, type ProgramTile } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { stegaClean } from '@sanity/client/stega';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug: programSlug, tileSlug } = event.params;

	const initial = await loadQuery<ProgramTile>(
		query,
		{ programSlug, tileSlug },
		{
			useCdn: false
		}
	);

	if (!initial.data) {
		error(404, { message: 'Program tile not found' });
	}

	return {
		query,
		params: { programSlug, tileSlug },
		options: { initial },
		meta: {
			title: stegaClean(initial.data.title),
			description: stegaClean(initial.data.description)
		}
	};
};
