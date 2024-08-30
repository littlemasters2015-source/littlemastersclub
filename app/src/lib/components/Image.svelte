<script>
	import { srcFor } from '$lib/sanity/image';
	import Img from '@zerodevx/svelte-img';

	export let portableText;
</script>

<Img src={srcFor(portableText.value)} alt="" />
