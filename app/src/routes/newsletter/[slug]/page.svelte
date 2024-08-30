<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';
	import Image from '$lib/components/Image.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: newsletter } = $q);
</script>

<div class="page">
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
	img {
		width: 100%;
		max-height: 30rem;
		object-fit: cover;
		margin: 0 0 1rem 0;
		@include border;
	}
</style>
