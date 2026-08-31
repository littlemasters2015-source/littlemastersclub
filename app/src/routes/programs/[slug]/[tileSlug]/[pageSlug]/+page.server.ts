import { programTilePageQuery as query, type ProgramTilePage } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { stegaClean } from '@sanity/client/stega';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug: programSlug, tileSlug, pageSlug } = event.params;

	const initial = await loadQuery<ProgramTilePage>(
		query,
		{ programSlug, tileSlug, pageSlug },
		{
			useCdn: false
		}
	);

	if (!initial.data) {
		error(404, { message: 'Program tile page not found' });
	}

	return {
		query,
		params: { programSlug, tileSlug, pageSlug },
		options: { initial },
		meta: {
			title: stegaClean(initial.data.title),
			description: stegaClean(initial.data.description)
		}
	};
};
