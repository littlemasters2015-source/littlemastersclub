<script>
	import DateTimeRange from '$lib/components/DateTimeRange.svelte';
	import { urlFor } from '$lib/sanity/image';
	import { stegaClean } from '@sanity/client/stega';

	export let event;

	console.log(typeof event.startTime);
</script>

<a href={`/events/${event.slug.current}`}>
	{#if event.image}
		<img src={urlFor(event.image).url()} alt="Image for {stegaClean(event.title)}" />
	{/if}
	<div class="info">
		<h3>{event.title}</h3>
		{#if event.startTime && event.endTime}
			<div class="time">
				<DateTimeRange start={event.startTime} end={event.endTime} />
			</div>
		{/if}
		<p class="description">{event.description}</p>
	</div>
</a>

<style lang="scss">
	a {
		display: flex;
		text-decoration: none;
		position: relative;
		height: 11rem;
		background-color: var(--bg-2);
		overflow: hidden;
		@include border;
		@include elevate;
	}

	img {
		position: relative;
		top: -2px;
		left: -2px;
		height: 11rem;
		width: 11rem;
		@include border;
	}

	.info {
		padding: 1.25rem;
	}

	.time {
		font-size: 1.125rem;
		margin: 0.75rem 0;
	}

	h3 {
		margin: 0;
		font-size: 1.5rem;
		@include line-clamp(1);
	}

	p {
		margin: 0.75rem 0 0 0;
	}
	.description {
		@include line-clamp(2);
	}
</style>
