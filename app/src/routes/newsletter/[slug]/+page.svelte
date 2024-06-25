<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDateRange, formatTimeRange } from '$lib/utils';
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
	{#if event.startTime && event.endTime}
		<div class="details">
			<h2>Details</h2>
			<p>
				<b>Date:</b>&nbsp; {formatDateRange(event.startTime, event.endTime)}
			</p>
			<p>
				<b>Time:</b>&nbsp; {formatTimeRange(event.startTime, event.endTime)}
			</p>
			{#if event.details}
				{#each event.details as detail}
					<p><b>{detail.title}:</b>&nbsp; {detail.value}</p>
				{/each}
			{/if}
		</div>
	{/if}
	<br />
	{#if event.body}
		<div class="content">
			<PortableText components={{}} value={event.body} />
		</div>
	{/if}
</div>

<style lang="scss">
	.page {
		padding: 0rem 2rem;
		max-width: 58rem;
		width: 100%;
		margin: auto;
	}
	img {
		@include border;
		width: 100%;
		max-height: 30rem;
		object-fit: cover;
		margin: 0 0 1rem 0;
	}
	.details {
		@include border;
		padding: 2rem;
		h2 {
			margin: 0;
		}
		p:last-child {
			margin-bottom: 0;
		}
	}
	.content {
		@include border;
		padding: 2rem;
	}
	:global(.content :first-child) {
		margin-top: 0;
	}
	:global(.content :last-child) {
		margin-bottom: 0;
	}
</style>
