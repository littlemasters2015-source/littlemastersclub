<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import NewsletterPreview from '$lib/components/NewsletterPreview.svelte';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: newsletters } = $q);
</script>

<div class="page">
	<h1>Newsletter</h1>
	<div class="events-container">
		{#each newsletters as newsletter}
			<NewsletterPreview {newsletter} />
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		width: 100%;
		max-width: 60rem;
	}
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
		@include border;
	}
	.events-container {
		gap: 1.25rem;
		display: flex;
		flex-direction: column;
	}
</style>
