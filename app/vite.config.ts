import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte'
		}),
		imagetools({
			profiles: {
				logo: new URLSearchParams('w=224&format=avif;webp'),
				sm: new URLSearchParams('w=320;640;1280&format=avif;webp'),
				md: new URLSearchParams('w=640;1280;1920&format=avif;webp'),
				lg: new URLSearchParams('w=640;1280;1920;2560&format=avif;webp')
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables" as *;'
			}
		}
	}
});
