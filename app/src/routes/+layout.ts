import { setPreviewing } from '@sanity/visual-editing/svelte';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ data }) => {
	// The `event.data.preview` value received here is exposed by the
	// corresponding `+layout.server.ts` file.
	const { preview } = data;
	// `@sanity/visual-editing/svelte` exports two helpers for setting and getting
	// preview state on the client: `setPreviewing` and `isPreviewing`.
	setPreviewing(preview);

	return {
		...data
	};
};
