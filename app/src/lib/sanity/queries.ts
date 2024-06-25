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

export interface Detail {
	_type: 'detail';
	title: string;
	value: string;
}

export interface Event {
	_type: 'event';
	_createdAt: string;
	published: boolean;
	title?: string;
	slug: Slug;
	description?: string;
	startTime?: string;
	endTime?: string;
	details: Detail[];
	image?: ImageAsset;
	body: PortableTextBlock[];
}

export const newsletterQuery = groq`*[_type == "newsletter" && slug.current == $slug && published == true][0]`;

export const newslettersQuery = groq`*[_type == "newsletter" && defined(slug.current) && published == true] | order(date desc)`;

export interface Newsletter {
	_type: 'newsletter';
	_createdAt: string;
	published: boolean;
	title?: string;
	slug: Slug;
	description?: string;
	date?: string;
	image?: ImageAsset;
	body: PortableTextBlock[];
}

export const programQuery = groq`*[_type == "program" && slug.current == $slug && published == true][0]`;

export const programsQuery = groq`*[_type == "program" && defined(slug.current) && published == true]`;

export const programsCategoryQuery = groq`*[_type == "program" && defined(slug.current) && published == true && references(*[ name == $category]._id)]`;

export interface Program {
	_type: 'program';
	_createdAt: string;
	published: boolean;
	title?: string;
	slug: Slug;
	description?: string;
	categories?: { _ref: string }[];
	image?: ImageAsset;
	body: PortableTextBlock[];
}

export const categoriesQuery = groq`*[_type == "category" && defined(name)]`;

export interface Category {
	_type: 'category';
	name: string;
}
