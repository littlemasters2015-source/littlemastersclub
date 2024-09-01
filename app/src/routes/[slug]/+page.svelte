<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import portableComponents from '$lib/utils/portableComponents';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: page } = $q);
</script>

<div class="page">
	<h1>{page.title}</h1>
	{#if page.body}
		<div class="content">
			<PortableText components={portableComponents} value={page.body} />
		</div>
	{/if}
</div>

<style lang="scss">
</style>
