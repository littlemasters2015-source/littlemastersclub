<script lang="ts">
	import { formatDateTimeRange } from '$lib/utils';
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
			<a class="event" href={`/events/${event.slug.current}`}>
				{#if event.image}
					<img src={urlFor(event.image).url()} alt={event.title} />
				{/if}
				<div class="info">
					<h2>{event.title}</h2>
					{#if event.startTime && event.endTime}
						<p>{formatDateTimeRange(event.startTime, event.endTime)}</p>
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
		max-width: 60rem;
		width: 100%;
		margin: auto;
	}
	h1{
		margin-bottom: 40px;
	}
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
		@include border;
	}
	.events-container {
		
		@include flex(column);
		gap: 1.25rem;
	}
	.event {
		@include elevate;
		@include border;
		display: block;
		text-decoration: none;
		padding: 0;
		position: relative;
		height: 11rem;
		background-color: var(--bg-2);
		overflow: hidden;

		img {
			position: absolute;
			top: -2px;
			left: -2px;
			height: 11rem;
			width: 11rem;
		}

		.info {
			padding: 1.25rem 1.5rem;
			margin-left: 11rem;

			h2 {
				margin: 0;
				font-size: 1.5rem;
			}
			p {
				margin: 0.75rem 0;
			}
			.description {
				@include line-clamp(2);
			}
		}
	}
</style>
