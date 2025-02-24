import { newsletterQuery as query, type Newsletter } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { stegaClean } from '@sanity/client/stega';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };
	const initial = await loadQuery<Newsletter>(query, params, {
		useCdn: false
	});

	if (!initial.data) {
		error(404, {
			message: 'Newsletter not found'
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
