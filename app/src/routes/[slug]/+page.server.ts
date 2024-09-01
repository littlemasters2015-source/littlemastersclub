import { pageQuery as query, type Page } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { stegaClean } from '@sanity/client/stega';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { loadQuery } = locals;
	const { slug } = params;

	const initial = await loadQuery<Page>(
		query,
		{ slug },
		{
			useCdn: false
		}
	);

	if (!initial.data) {
		error(404, {
			message: 'Page not found'
		});
	}

	return {
		query,
		params: { slug },
		options: { initial },
		meta: {
			title: stegaClean(initial.data.title),
			description: stegaClean(initial.data.description)
		}
	};
};
