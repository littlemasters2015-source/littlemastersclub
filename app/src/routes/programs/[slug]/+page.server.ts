import { programQuery as query, type Program } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { stegaClean } from '@sanity/client/stega';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };
	const initial = await loadQuery<Program>(query, params, {
		useCdn: false
	});

	if (!initial.data) {
		error(404, {
			message: 'Program not found'
		});
	}

	return {
		query,
		params,
		options: { initial },
		meta: {
			title: stegaClean(initial.data.title),
			description: stegaClean(initial.data.description)
		}
	};
};
