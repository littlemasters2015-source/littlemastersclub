<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { srcFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import { stegaClean } from '@sanity/client/stega';
	import Img from '@zerodevx/svelte-img';
	import ArrowLeftIcon from '~icons/ph/arrow-left-bold';
	import portableComponents from '$lib/utils/portableComponents';
	import YoutubeEmbed from '$lib/components/YoutubeEmbed.svelte';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: page } = $q);
</script>

<div class="page">
	<a class="back" href={`/programs/${data.params.programSlug}/${data.params.tileSlug}`}>
		<ArrowLeftIcon style="font-size: 1.125rem;" /> Back to Interview
	</a>
	<h1>{page.title}</h1>
	{#if page.image}
		<Img src={srcFor(page.image)} alt="Image for {stegaClean(page.title)}" />
	{/if}
	{#if page.body}
		<div class="content">
			<PortableText components={portableComponents} value={page.body} />
		</div>
	{/if}
	{#if page.videos?.length}
		<section class="videos" aria-labelledby="videos-title">
			<h2 id="videos-title">Videos</h2>
			{#each page.videos as video}
				<YoutubeEmbed portableText={{ value: video }} />
			{/each}
		</section>
	{/if}
</div>

<style lang="scss">
	.page :global(img) {
		max-height: 30rem;
		margin-bottom: 1rem;
	}
	h1 {
		margin-top: 1rem;
	}
	.videos {
		margin-top: 2rem;
	}
	.videos h2 {
		margin-bottom: 1rem;
	}
</style>
