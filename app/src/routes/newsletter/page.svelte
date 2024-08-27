<script lang="ts">
	import { formatDateTimeRange } from '$lib/utils';
	import { useQuery } from '@sanity/svelte-loader';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: newsletters } = $q);
</script>

<div class="page">
	<h1>Newsletter</h1>
	<div class="newsletters-container">
		{#each newsletters as newsletter}
			<a class="newsletter" href={`/newsletter/${newsletter.slug.current}`}>
				{#if newsletter.image}
					<img src={urlFor(newsletter.image).url()} alt={newsletter.title} />
				{/if}
				<div class="info">
					<h2>{newsletter.title}</h2>
					<p>{newsletter.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		max-width: 60rem;
		width: 100%;
	}
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
		@include border;
	}
	.newsletters-container {
		gap: 1.25rem;
		@include flex(column);
	}
	.newsletter {
		display: block;
		text-decoration: none;
		padding: 0;
		position: relative;
		height: 11rem;
		background-color: var(--bg-2);
		overflow: hidden;

		img {
			position: absolute;
			top: -2px;
			left: -2px;
			height: 11rem;
			width: 11rem;
		}

		.info {
			padding: 1.25rem 1.5rem;
			margin-left: 11rem;

			h2 {
				margin: 0;
				font-size: 1.5rem;
			}
			p {
				margin: 0.75rem 0;
			}
			.description {
				@include line-clamp(2);
			}
		}

		@include elevate;
		@include border;
	}
</style>
