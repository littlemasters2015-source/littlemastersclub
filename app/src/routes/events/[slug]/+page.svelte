<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDateRange, formatTimeRange, isValidUrl } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: event } = $q);
</script>

<div class="page">
	<h1>{event.title}</h1>
	{#if event.image}
		<img src={urlFor(event.image).url()} alt="Image for {event.title}" />
	{/if}
	<h2>Details</h2>
	{#if event.startTime && event.endTime}
		<p>
			<b>Date:</b>&nbsp; {formatDateRange(event.startTime, event.endTime)}
		</p>
		<p>
			<b>Time:</b>&nbsp; {formatTimeRange(event.startTime, event.endTime)}
		</p>
	{/if}
	{#if event.details}
		{#each event.details as detail}
			<p>
				<b>{detail.title}:</b>
				{#if isValidUrl(detail.value)}
					&nbsp;<a href={detail.value}>{detail.value}</a>
				{:else}
					&nbsp;{detail.value}
				{/if}
			</p>
		{/each}
	{/if}
	<br />
	{#if event.body}
		<h2>Description</h2>
		<div class="content">
			<PortableText components={{}} value={event.body} />
		</div>
	{/if}
</div>

<style lang="scss">
	img {
		@include border;
		width: 100%;
		max-height: 30rem;
		object-fit: cover;
		margin: 0 0 1rem 0;
	}
</style>
