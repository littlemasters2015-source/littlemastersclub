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
	{#if program.body}
		<div class="content">
			<PortableText components={portableComponents} value={program.body} />
		</div>
	{/if}
	{#if program.tiles?.length}
		<div class="tiles">
			{#each program.tiles as tile}
				<a class="tile" href={`/programs/${program.slug.current}/${tile.slug.current}`}>
					{#if tile.image}
						<Img src={srcFor(tile.image, 'sm')} alt="Image for {stegaClean(tile.title)}" />
					{/if}
					<div class="tile-info">
						<h2>{tile.title}</h2>
						{#if tile.description}<p>{tile.description}</p>{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
	{#if program.teamMembers?.length}
		<section class="team" aria-labelledby="team-title">
			<h2 id="team-title">Meet the Team</h2>
			<div class="tiles">
				{#each program.teamMembers as member}
					<a class="tile" href={`/programs/${program.slug.current}/team/${member.slug.current}`}>
						{#if member.image}
							<Img src={srcFor(member.image, 'sm')} alt={stegaClean(member.name)} />
						{/if}
						<div class="tile-info">
							<h3>{member.name}</h3>
						</div>
					</a>
				{/each}
			</div>
		</section>
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
	.tiles {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: 1.25rem;
		margin-top: 2rem;
	}
	.team {
		margin-top: 3rem;
	}
	.team h2 {
		margin-bottom: 1rem;
	}
	.tile {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		overflow: hidden;
		@include border;
		@include elevate;
		:global(picture),
		:global(img) {
			width: 100%;
			aspect-ratio: 16 / 9;
		}
	}
	.tile-info {
		padding: 1rem 1.25rem 1.25rem;
		h2 {
			margin: 0;
			font-size: 1.25rem;
		}
		h3 {
			margin: 0;
			font-size: 1.25rem;
		}
		p {
			margin: 0.5rem 0 0;
		}
	}
</style>
