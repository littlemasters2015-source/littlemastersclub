<script lang="ts">
	import { formatTimeRange } from '$lib/utils';
	import { useQuery } from '@sanity/svelte-loader';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: events } = $q);

	$: console.log(events);
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
