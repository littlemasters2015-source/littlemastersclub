<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { srcFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import { stegaClean } from '@sanity/client/stega';
	import Img from '@zerodevx/svelte-img';
	import ArrowLeftIcon from '~icons/ph/arrow-left-bold';
	import portableComponents from '$lib/utils/portableComponents';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: tile } = $q);
</script>

<div class="page">
	<a class="back" href={`/programs/${data.params.programSlug}`}>
		<ArrowLeftIcon style="font-size: 1.125rem;" /> Back to Program
	</a>
	<h1>{tile.title}</h1>
	{#if tile.image}
		<Img src={srcFor(tile.image)} alt="Image for {stegaClean(tile.title)}" />
	{/if}
	{#if tile.body}
		<div class="content">
			<PortableText components={portableComponents} value={tile.body} />
		</div>
	{/if}
	{#if tile.pages?.length}
		<div class="pages">
			{#each tile.pages as page}
				<a
					class="page-card"
					href={`/programs/${data.params.programSlug}/${tile.slug.current}/${page.slug.current}`}
				>
					{#if page.image}
						<Img src={srcFor(page.image, 'sm')} alt="Image for {stegaClean(page.title)}" />
					{/if}
					<div class="page-card-info">
						<h2>{page.title}</h2>
						{#if page.description}<p>{page.description}</p>{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.page :global(img) {
		max-height: 30rem;
		margin-bottom: 1rem;
	}
	h1 {
		margin-top: 1rem;
	}
	.pages {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: 1.25rem;
		margin-top: 2rem;
	}
	.page-card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		overflow: hidden;
		@include border;
		@include elevate;
		:global(picture),
		:global(img) {
			width: 100%;
			aspect-ratio: 16 / 9;
		}
	}
	.page-card-info {
		padding: 1rem 1.25rem 1.25rem;
		h2 {
			margin: 0;
			font-size: 1.25rem;
		}
		p {
			margin: 0.5rem 0 0;
		}
	}
</style>
