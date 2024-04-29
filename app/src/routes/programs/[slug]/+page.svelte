<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: event } = $q);
</script>

<div class="page">
	<h1>{event.title}</h1>
	{#if event.image}
		<img src={urlFor(event.image).url()} alt="Image for {event.title}" />
	{/if}
	<p class="date">
		{formatDate(event._createdAt)}
	</p>
	{#if event.body}
		<div class="content">
			<PortableText components={{}} value={event.body} />
		</div>
	{/if}
</div>

<style lang="scss">
	

	img{
		max-width: 800px;
		display:block;
		margin-left: auto;
		margin-right: auto;
		margin-top: 30px;
		margin-bottom: 40px;
	}
	div{
		margin-left: 7%;
		margin-right: 7%;
	}
</style>
