<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { isValidUrl } from '$lib/utils';
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';
	import type { PageData } from './$types';
	import DateTimeRange from '$lib/components/DateTimeRange.svelte';
	import { stegaClean } from '@sanity/client/stega';
	import Image from '$lib/components/Image.svelte';
	import ArrowLeftIcon from '~icons/ph/arrow-left-bold';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: event } = $q);

	$: console.log(event);
</script>

<div class="page">
	<a class="back" href="/events">
		<ArrowLeftIcon style="font-size: 1.2rem;" /> Back to Events
	</a>
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
			<PortableText
				components={{
					types: {
						image: Image
					}
				}}
				value={event.body}
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.page :global(img) {
		max-height: 30rem;
		margin: 0 0 1rem 0;
	}
</style>
