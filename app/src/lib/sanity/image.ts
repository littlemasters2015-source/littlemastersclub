import imageUrlBuilder from '@sanity/image-url';
import type { Image } from '@sanity/types';
import { client } from './client';
import type { ImageFormat } from '@sanity/image-url/lib/types/types';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

const builder = imageUrlBuilder(client);

function getWidths(profile: string) {
	switch (profile) {
		case 'xs':
			return [160, 320];
		case 'sm':
			return [160, 320, 640];
		case 'lg':
			return [640, 1280, 1920, 2560];
		default:
			return [320, 640, 1280];
	}
}

function generateSources(image: ImageUrlBuilder, format: string, widths: number[]) {
	let sources = '';
	for (const width of widths) {
		const url = image
			.width(width)
			.format(format as ImageFormat)
			.url();
		sources += `${url} ${width}w, `;
	}
	sources = sources.slice(0, -2);
	return sources;
}

export function urlFor(source: Image) {
	return builder.image(source);
}

export function srcFor(source: Image, profile = 'md') {
	console.log(source);
	const widths = getWidths(profile);
	const image = builder.image(source);
	return {
		sources: {
			webp: generateSources(image, 'webp', widths),
			jpeg: generateSources(image, 'jpg', widths)
		},
		img: { src: image.url() }
	};
}
