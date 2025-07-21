<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { stegaClean } from '@sanity/client/stega';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: programs } = $q);

	let title: string = 'Programs';

	$: if ($page.url.searchParams.get('status') === 'previous') {
		title = 'Previous Programs';
	} else if ($page.url.searchParams.get('category')) {
		const category = $page.url.searchParams.get('category') || '';
		const capitalized = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
		title = `${capitalized} Programs`;
	} else {
		title = 'Programs';
	}

	$: filteredPrograms = programs.filter((program) => {
		if ($page.url.searchParams.get('status') === 'previous') {
			return program.status === 'previous';
		}
		if (program.status === 'previous') {
			return false;
		}
		if ($page.url.searchParams.get('category')) {
			return program.category?._ref === data.categoryRef;
		}
		return true;
	});
</script>

<div class="page">
	<h1>{title}</h1>
	<div class="programs-container">
		{#each filteredPrograms as program}
			<a class="program" href={`/programs/${program.slug.current}`}>
				{#if program.image}
					<Img src={srcFor(program.image, 'sm')} alt="Image for {stegaClean(program.title)}" />
				{/if}
				<div class="info">
					<h2>{program.title}</h2>
					<p>{program.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		width: 100%;
		max-width: unset;
	}
	.programs-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
		gap: 1.25rem;
	}

	.program {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		align-items: stretch;
		padding: none;
		overflow: hidden;
		@include border;

		:global(picture) {
			width: calc(100% + 4px);
			aspect-ratio: 16/9;
			height: auto;
			position: relative;
			top: -2px;
			left: -2px;
		}

		:global(img) {
			aspect-ratio: 16 / 9;
		}

		@include elevate;
	}

	.info {
		padding: 1rem 1.25rem 1.5rem 1.25rem;

		h2 {
			margin: 0;
			font-size: 1.5rem;
			@include line-clamp(1);
		}
		p {
			margin: 0.75rem 0 0 0;
		}
	}

	@media (max-width: 500px) {
		.programs-container {
			grid-template-columns: 1fr;
		}
		.info {
			h3 {
				font-size: 1.25rem;
			}
		}
	}
</style>
