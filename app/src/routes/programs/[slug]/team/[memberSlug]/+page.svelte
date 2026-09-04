<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { srcFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import { stegaClean } from '@sanity/client/stega';
	import Img from '@zerodevx/svelte-img';
	import ArrowLeftIcon from '~icons/ph/arrow-left-bold';
	import portableComponents from '$lib/utils/portableComponents';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: member } = $q);
</script>

<div class="page">
	<a class="back" href={`/programs/${data.params.programSlug}`}>
		<ArrowLeftIcon style="font-size: 1.125rem;" /> Back to Program
	</a>
	<h1>{member.name}</h1>
	{#if member.image}
		<Img src={srcFor(member.image)} alt={stegaClean(member.name)} />
	{/if}
	{#if member.body}
		<div class="content">
			<PortableText components={portableComponents} value={member.body} />
		</div>
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
</style>