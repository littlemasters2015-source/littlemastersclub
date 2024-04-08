<script lang="ts">
	import { formatTimeRange } from '$lib/utils';
	import { useQuery } from '@sanity/svelte-loader';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: events } = $q);
</script>

<div class="page">
	<h1>Upcoming Events</h1>
	<div class="events-container">
		{#each events as event}
			<a class="box event" href={`/events/${event.slug.current}`}>
				{#if event.image}
					<img src={urlFor(event.image).url()} alt={event.title} />
				{/if}
				<div class="info">
					<h2>{event.title}</h2>
					{#if event.startTime && event.endTime}
						<p>{formatTimeRange(event.startTime, event.endTime)}</p>
					{/if}
					<p>{event.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		padding: 0rem 2rem;
		max-width: 70rem;
		margin: auto;
	}
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
		@include border;
	}
	.events-container {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.event {
		display: block;
		text-decoration: none;
		padding: 0;
		position: relative;
		height: 11rem;
		background-color: var(--bg-2);

		img {
			position: absolute;
			top: -2px;
			left: -2px;
			height: 11rem;
			width: 11rem;
		}

		.info {
			padding: 1.5rem;
			margin-left: 11rem;

			h3 {
				margin: 0;
				font-size: 1.5rem;
			}
			p {
				margin: 1rem 0;
			}
		}
	}
</style>
