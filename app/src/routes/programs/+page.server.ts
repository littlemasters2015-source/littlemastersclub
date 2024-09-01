import { programsQuery as query, type Program } from '$lib/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { stegaClean } from '@sanity/client/stega';

export const load: PageServerLoad = async ({ locals, parent, url }) => {
	const { categories } = await parent();
	const searchQuery = url.searchParams.get('category');
	let categoryRef: string | undefined;

	if (searchQuery) {
		const category = categories.options.initial.data.find(
			(category) => stegaClean(category.name).toLowerCase() === searchQuery.toLowerCase()
		);
		if (!category) {
			throw error(404, 'Program category not found');
		}
		categoryRef = category?._id;
	}

	const { loadQuery } = locals;

	const initial = await loadQuery<Program[]>(query);

	return {
		categoryRef,
		query,
		options: { initial },
		meta: {
			title: 'Programs',
			description: 'Explore the diverse programs and opportunities at Little Masters Club.'
		}
	};
};
