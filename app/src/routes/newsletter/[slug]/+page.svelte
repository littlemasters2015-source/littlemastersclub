<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';
	import type { PageData } from './$types';
	import { stegaClean } from '@sanity/client/stega';
	import ArrowLeftIcon from '~icons/ph/arrow-left-bold';
	import portableComponents from '$lib/utils/portableComponents';
	import { formatDate } from '$lib/utils';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: newsletter } = $q);
</script>

<div class="page">
	<a class="back" href="/newsletter">
		<ArrowLeftIcon style="font-size: 1.125rem;" /> Back to All Newsletters
	</a>
	<h1>{newsletter.title}</h1>
	{#if newsletter.date}
		<p class="date">
			{formatDate(newsletter.date)}
		</p>
	{/if}
	{#if newsletter.image}
		<Img
			class="image"
			src={srcFor(newsletter.image)}
			alt="Image for {stegaClean(newsletter.title)}"
		/>
	{/if}
	{#if newsletter.body}
		<div class="content">
			<PortableText components={portableComponents} value={newsletter.body} />
		</div>
	{/if}
</div>

<style lang="scss">
	.page :global(.image) {
		max-height: 30rem;
	}
	h1 {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.date {
		font-size: 1.25rem;
		font-weight: 500;
		margin-bottom: 1.5rem;
	}
</style>
