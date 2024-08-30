<script>
	import { srcFor } from '$lib/sanity/image';
	import { stegaClean } from '@sanity/client/stega';
	import Img from '@zerodevx/svelte-img';

	export let newsletter;

	console.log(typeof newsletter.startTime);
</script>

<a href={`/newsletter/${newsletter.slug.current}`} class="event">
	{#if newsletter.image}
		<Img src={srcFor(newsletter.image, 'xs')} alt="Image for {stegaClean(newsletter.title)}" />
	{/if}
	<div class="info">
		<h3>{newsletter.title}</h3>
		<p class="description">{newsletter.description}</p>
	</div>
</a>

<style lang="scss">
	a {
		display: flex;
		text-decoration: none;
		position: relative;
		height: 11rem;
		background-color: var(--bg-2);
		overflow: hidden;
		@include border;
		@include elevate;
	}

	.event :global(picture) {
		position: relative;
		top: -2px;
		left: -2px;
		height: 11rem;
		width: 11rem;
		flex-shrink: 0;
	}

	.info {
		padding: 1.25rem;
	}

	h3 {
		margin: 0;
		font-size: 1.5rem;
		@include line-clamp(1);
	}

	p {
		margin: 0.75rem 0 0 0;
	}
	.description {
		@include line-clamp(2);
	}
</style>
