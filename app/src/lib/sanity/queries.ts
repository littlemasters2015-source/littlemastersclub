import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

// export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

// export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

// export interface Post {
// 	_type: 'post';
// 	_createdAt: string;
// 	title?: string;
// 	slug: Slug;
// 	excerpt?: string;
// 	mainImage?: ImageAsset;
// 	body: PortableTextBlock[];
// }

export const eventQuery = groq`*[_type == "event" && slug.current == $slug][0]`;

export const eventsQuery = groq`*[_type == "event" && defined(slug.current) && visible == true] | order(startTime asc)`;

export interface Detail {
	_type: 'detail';
	title: string;
	value: string;
}

export interface Event {
	_type: 'event';
	_createdAt: string;
	visible: boolean;
	title?: string;
	slug: Slug;
	description?: string;
	startTime?: string;
	endTime?: string;
	details: Detail[];
	image?: ImageAsset;
	body: PortableTextBlock[];
}

export const newsletterQuery = groq`*[_type == "newsletter" && slug.current == $slug][0]`;

export const newslettersQuery = groq`*[_type == "newsletter" && defined(slug.current)] | order(date desc)`;

export interface Newsletter {
	_type: 'newsletter';
	_createdAt: string;
	title?: string;
	slug: Slug;
	description?: string;
	date?: string;
	image?: ImageAsset;
	body: PortableTextBlock[];
}

export const programQuery = groq`*[_type == "program" && slug.current == $slug][0] {
	...,
	"tiles": *[_type == "programTile" && references(^._id)] | order(order asc),
	"teamMembers": *[_type == "teamMember" && references(^._id)] | order(order asc)
}`;

export const teamMemberQuery = groq`*[_type == "teamMember" && slug.current == $memberSlug && references(*[_type == "program" && slug.current == $programSlug]._id)][0]`;

export const programTileQuery = groq`*[_type == "programTile" && slug.current == $tileSlug && references(*[_type == "program" && slug.current == $programSlug]._id)][0] {
	...,
	"pages": *[_type == "programTilePage" && references(^._id)] | order(order asc)
}`;

export const programTilePageQuery = groq`*[_type == "programTilePage" && slug.current == $pageSlug && references(*[_type == "programTile" && slug.current == $tileSlug && references(*[_type == "program" && slug.current == $programSlug]._id)]._id)][0]`;

export const programsQuery = groq`*[_type == "program" && defined(slug.current)] | order(order asc)`;

export const programsCategoryQuery = groq`*[_type == "program" && defined(slug.current) && references(*[ name == $category]._id)] | order(order asc)`;

export const programsOldQuery = groq`*[_type == "program" && defined(slug.current) && status == "previous"] | order(order asc)`;

export interface Program {
	_type: 'program';
	_createdAt: string;
	status: 'previous' | 'current';
	order?: number;
	title?: string;
	slug: Slug;
	description?: string;
	category?: { _ref: string };
	image?: ImageAsset;
	body: PortableTextBlock[];
	tiles?: ProgramTile[];
	teamMembers?: TeamMember[];
}

export interface TeamMember {
	_type: 'teamMember';
	_createdAt: string;
	program: { _ref: string };
	order?: number;
	name: string;
	slug: Slug;
	image?: ImageAsset;
	body?: PortableTextBlock[];
}

export interface ProgramTile {
	_type: 'programTile';
	_createdAt: string;
	program: { _ref: string };
	order?: number;
	title: string;
	slug: Slug;
	description?: string;
	image?: ImageAsset;
	body: PortableTextBlock[];
	pages?: ProgramTilePage[];
}

export interface ProgramTilePage {
	_type: 'programTilePage';
	_createdAt: string;
	parentTile: { _ref: string };
	order?: number;
	title: string;
	slug: Slug;
	description?: string;
	image?: ImageAsset;
	body: PortableTextBlock[];
	videos?: { _type: 'youtube'; url: string }[];
}

export const categoriesQuery = groq`*[_type == "category" && defined(name)] | order(order asc)`;

export interface Category {
	_id: string | undefined;
	_type: 'category';
	name: string;
	order: number;
}

export const boardMembersQuery = groq`*[_type == "boardMember"] | order(order asc)`;

export interface BoardMember {
	_type: 'boardMember';
	name: string;
	order: number;
	image?: ImageAsset;
	body: PortableTextBlock[];
}

export const homePageQuery = groq`*[_type == "homePage"][0]`;

export interface HomePage {
	_type: 'homePage';
	carousel: { carouselImage: ImageAsset }[];
	hero?: string;
	description: PortableTextBlock[];
	video?: string;
	supportImage: ImageAsset;
	supportText: PortableTextBlock[];
	eventsImage: ImageAsset;
}

export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]`;

export interface Page {
	_type: 'page';
	title?: string;
	description?: string;
	slug: Slug;
	body: PortableTextBlock[];
}
