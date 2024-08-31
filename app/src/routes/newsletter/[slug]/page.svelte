<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';
	import Image from '$lib/components/Image.svelte';
	import type { PageData } from './$types';
	import ArrowLeftIcon from '~icons/ph/arrow-left-bold';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: newsletter } = $q);
</script>

<div class="page">
	<a class="back" href="/newsletter">
		<ArrowLeftIcon style="font-size: 1.2rem;" /> Back to Newsletter
	</a>
	<h1>{newsletter.title}</h1>
	{#if newsletter.image}
		<Img src={srcFor(newsletter.image)} alt="Image for {newsletter.title}" />
	{/if}
	{#if newsletter.body}
		<div class="content">
			<PortableText
				components={{
					types: {
						image: Image
					}
				}}
				value={newsletter.body}
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
