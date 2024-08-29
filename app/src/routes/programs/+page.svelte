<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { stegaClean } from '@sanity/client/stega';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: programs } = $q);

	let title: string = 'Programs';

	$: if ($page.url.searchParams.get('status') === 'old') {
		title = 'Old Programs';
	} else if ($page.url.searchParams.get('category')) {
		const category = $page.url.searchParams.get('category') || '';
		const capitalized = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
		title = `${capitalized} Programs`;
	} else {
		title = 'Programs';
	}

	$: filteredPrograms = programs.filter((program) => {
		if ($page.url.searchParams.get('status') === 'old') {
			return program.status === 'old';
		}
		if ($page.url.searchParams.get('category')) {
			return program.categories?.some(
				(category) => category._ref === $page.url.searchParams.get('category')
			);
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
					<img src={urlFor(program.image).url()} alt="Image for {stegaClean(program.title)}" />
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

		img {
			object-fit: cover;
			width: calc(100% + 4px);
			aspect-ratio: 16/9;
			position: relative;
			top: -2px;
			left: -2px;
			@include border;
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
</style>
