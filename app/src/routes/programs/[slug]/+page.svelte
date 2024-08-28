<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import { stegaClean } from '@sanity/client/stega';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: program } = $q);
</script>

<div class="page">
	<h1>{program.title}</h1>
	{#if program.image}
		<img src={urlFor(program.image).url()} alt="Image for {stegaClean(program.title)}" />
	{/if}
	<p class="date">
		{formatDate(program._createdAt)}
	</p>
	{#if program.body}
		<div class="content">
			<PortableText components={{}} value={program.body} />
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
