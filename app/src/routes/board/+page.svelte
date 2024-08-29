<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity/image';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: boardMembers } = $q);
</script>

<div class="page">
	<h1>Board Members</h1>

	<div class="board-container">
		{#each boardMembers as boardMember}
			<div class="board-member">
				<div class="info">
					<h2>{boardMember.name}</h2>
					<PortableText components={{}} value={boardMember.body} />
				</div>
				{#if boardMember.image}
					<img src={urlFor(boardMember.image).url()} alt={boardMember.name} />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		width: 100%;
		max-width: 75rem;
	}

	.board-container {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.board-member {
		display: flex;
		align-items: flex-start;
		gap: 2.5rem;

		img {
			aspect-ratio: 5 / 6;
			object-fit: cover;
			width: 40%;
			max-width: 20rem;
			height: auto;
			@include border;
		}
	}

	.info {
		flex: 1;
		h2 {
			margin: 0;
		}
	}
</style>
