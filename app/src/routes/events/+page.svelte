<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import EventPreview from '$lib/components/EventPreview.svelte';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: events } = $q);
</script>

<div class="page">
	<h1>Upcoming Events</h1>
	<div class="events-container">
		{#each events as event}
			<EventPreview {event} />
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
