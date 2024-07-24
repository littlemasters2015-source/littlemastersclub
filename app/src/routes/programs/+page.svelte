<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: programs } = $q);

	let title: string = 'Programs';

	$: {
		if ($page.url.searchParams.get('status') === 'old') {
			title = 'Old Programs';
		}
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
					<img src={urlFor(program.image).url()} alt={program.title} />
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
		gap: 2rem;
	}

	.program {
		@include border;
		@include elevate;
		display: flex;
		flex-direction: column;
		text-decoration: none;
		img {
			@include border;
			aspect-ratio: 16/9;
			object-fit: cover;
			width: calc(100% + 4px);
			position: relative;
			top: -2px;
			left: -2px;
		}
	}
	.info {
		padding: 1rem 1.5rem;
		h2 {
			margin: 0;
		}
		p {
			margin: 0.75rem 0;
		}
	}
</style>
