<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { srcFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import { stegaClean } from '@sanity/client/stega';
	import Img from '@zerodevx/svelte-img';
	import ArrowLeftIcon from '~icons/ph/arrow-left-bold';
	import portableComponents from '$lib/utils/portableComponents';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: program } = $q);
</script>

<div class="page">
	<a class="back" href="/programs">
		<ArrowLeftIcon style="font-size: 1.125rem;" /> Back to Programs
	</a>
	<h1>{program.title}</h1>
	{#if program.image}
		<Img src={srcFor(program.image)} alt="Image for {stegaClean(program.title)}" />
	{/if}
	<p class="date">
		{formatDate(program._createdAt)}
	</p>
	{#if program.body}
		<div class="content">
			<PortableText components={portableComponents} value={program.body} />
		</div>
	{/if}
</div>

<style lang="scss">
	.page :global(img) {
		max-height: 30rem;
	}
</style>
