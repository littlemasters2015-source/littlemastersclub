<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { isValidUrl } from '$lib/utils';
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';
	import type { PageData } from './$types';
	import DateTimeRange from '$lib/components/DateTimeRange.svelte';
	import { stegaClean } from '@sanity/client/stega';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: event } = $q);
</script>

<div class="page">
	<h1>{event.title}</h1>
	{#if event.image}
		<Img src={srcFor(event.image)} alt="Image for {stegaClean(event.title)}" />
	{/if}
	<h2>Details</h2>
	{#if event.startTime && event.endTime}
		<p>
			<b>Date & Time:</b>&nbsp; <DateTimeRange start={event.startTime} end={event.endTime} />
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
