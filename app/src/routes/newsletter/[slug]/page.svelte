<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';
	import type { PageData } from './$types';
	import ArrowLeftIcon from '~icons/ph/arrow-left-bold';
	import portableComponents from '$lib/utils/portableComponents';
	import { stegaClean } from '@sanity/client/stega';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: newsletter } = $q);
</script>

<div class="page">
	<a class="back" href="/newsletter">
		<ArrowLeftIcon style="font-size: 1.125rem;" /> Back to Newsletter
	</a>
	<h1>{newsletter.title}</h1>
	{#if newsletter.image}
		<Img src={srcFor(newsletter.image)} alt="Image for {stegaClean(newsletter.title)}" />
	{/if}
	{#if newsletter.body}
		<div class="content">
			<PortableText components={portableComponents} value={newsletter.body} />
		</div>
	{/if}
</div>

<style lang="scss">
	.page :global(img) {
		max-height: 30rem;
	}
	h1 {
		margin-top: 1rem;
	}
</style>
