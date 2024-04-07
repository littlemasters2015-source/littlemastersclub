import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
}

export const eventQuery = groq`*[_type == "event" && slug.current == $slug && published == true][0]`;

export const eventsQuery = groq`*[_type == "event" && defined(slug.current) && published == true] | order(startTime desc)`;

export interface Event {
	_type: 'event';
	_createdAt: string;
	published: boolean;
	title?: string;
	slug: Slug;
	description?: string;
	startTime?: string;
	endTime?: string;
	image?: ImageAsset;
	body: PortableTextBlock[];
}

export const programQuery = groq`*[_type == "program" && slug.current == $slug && published == true][0]`;

export const programsQuery = groq`*[_type == "program" && defined(slug.current) && published == true]`;

export interface Program {
	_type: 'program';
	_createdAt: string;
	published: boolean;
	title?: string;
	slug: Slug;
	description?: string;
	image?: ImageAsset;
	body: PortableTextBlock[];
}
