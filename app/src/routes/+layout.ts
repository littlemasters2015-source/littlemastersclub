import { setPreviewing } from '@sanity/visual-editing/svelte';
import type { LayoutLoad } from './$types';
import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const load: LayoutLoad = ({ data }) => {
	// The `event.data.preview` value received here is exposed by the
	// corresponding `+layout.server.ts` file.
	const { preview } = data;
	// `@sanity/visual-editing/svelte` exports two helpers for setting and getting
	// preview state on the client: `setPreviewing` and `isPreviewing`.
	setPreviewing(preview);

	if (browser) {
		posthog.init('phc_casjJqwZZBcMdLSlSPxXi6M6MBCqIr9C5zGib0n2i8Y', {
			api_host: 'https://littlemastersclub.vercel.app/ingest',
			ui_host: 'https://us.posthog.com'
		});
	}

	return {
		...data
	};
};
