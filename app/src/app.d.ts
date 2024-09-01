import type { LoaderLocals } from '@sanity/svelte-loader';
import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals extends LoaderLocals {
			revalidate: boolean;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
