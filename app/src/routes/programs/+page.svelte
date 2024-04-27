<script lang="ts">
	import { formatDateTimeRange } from '$lib/utils';
	import { useQuery } from '@sanity/svelte-loader';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: programs } = $q);
</script>


<h1>Programs</h1>
<div class="page">
	<div class="programs-container">
		{#each programs as program}
			<a class="program" href={`/programs/${program.slug.current}`}>
				{#if program.image}
					<img src={urlFor(program.image).url()} alt={program.title} />
				{/if}
				<div class="info">
					<h2>{program.title}</h2>
					<p>{program.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	h1{
		margin-left:80px;
	}
	.page {
		padding: 0 2rem;
		float: center;
		width: 33.33333%;
	}

	.programs-container {
		box-sizing: border-box;
		display: grid;


		gap: 2rem;
		

	}

	.program {
		margin-left: 50px;
		@include border;
		@include elevate;
		text-decoration: none;
		img {
			border: 2px solid;
			aspect-ratio: 16/9;
			object-fit: cover;
			width: calc(100% + 4px);
			border-radius: 30px 30px 0px 0px;
			position: relative;
			top: -2px;
			left: -2px;
		}
	}
	.info {
		padding: 0.75rem 1.5rem 1rem 1.5rem;
		h2 {
			margin: 0;
		}
		p {
			margin: 0.75rem 0;
		}

		@media only screen and (max-width: 900px){
			.programs-container{
				width: 50%;
			}
		}
		@media only screen and (max-width: 500px){
			.programs-container{
				width: 100%;
			}
		}
	}
</style>
