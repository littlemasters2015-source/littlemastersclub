<script>
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';

	export let portableText;

	$: console.log(portableText);
</script>

<figure>
	<Img src={srcFor(portableText.value)} alt="" />

	{#if portableText.value.caption}
		<figcaption>{portableText.value.caption}</figcaption>
	{/if}
</figure>
