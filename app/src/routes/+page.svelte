<script lang="ts">
	import EventPreview from '$lib/components/EventPreview.svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import ArrowLeftIcon from '~icons/ph/arrow-left';
	import ArrowRightIcon from '~icons/ph/arrow-right';
	import Img from '@zerodevx/svelte-img';
	import { srcFor } from '$lib/sanity/image';

	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import { PortableText } from '@portabletext/svelte';

	export let data: PageData;
	const homepageUse = useQuery(data.homepage);
	const eventsUse = useQuery(data.events);

	$: ({ data: events } = $eventsUse);
	$: ({ data: homepage } = $homepageUse);

	let emblaApi: EmblaCarouselType;
	let options = { loop: true };
	let plugins = [Autoplay({ delay: 4000 })];

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
	}

	// test
</script>

<div class="page">
	<section class="head">
		<div class="embla">
			<div
				class="embla__viewport"
				use:emblaCarouselSvelte={{ options, plugins }}
				on:emblaInit={onInit}
			>
				<div class="embla__container">
					{#each homepage.carousel as carouselImage}
						<div class="embla__slide">
							<Img src={srcFor(carouselImage, 'lg')} alt="carousel image" />
						</div>
					{/each}
				</div>
			</div>
			<button
				class="embla__prev"
				aria-label="Previous Image"
				on:click={() => emblaApi.scrollPrev()}
			>
				<ArrowLeftIcon style="font-size: 1.5rem;" />
			</button>
			<button class="embla__next" aria-label="Next Image" on:click={() => emblaApi.scrollNext()}>
				<ArrowRightIcon style="font-size: 1.5rem;" />
			</button>
		</div>
		<div class="box mobile-title">
			<h1>{homepage.hero}</h1>
		</div>
		<div class="container">
			<div class="box title">
				<h1>{homepage.hero}</h1>
			</div>
			<div class="box description">
				<PortableText components={{}} value={homepage.description} />
			</div>
			<a class="action" href="/join">Get Involved</a>
			<a class="action" href="/about">About Us</a>
		</div>
	</section>

	<section class="youtube">
		<iframe
			width="1056"
			height="594"
			src={homepage.video}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		/>
	</section>

	<section class="support">
		<Img src={srcFor(homepage.supportImage, 'sm')} alt="support" />
		<div class="box">
			<PortableText components={{}} value={homepage.supportText} />
			<a class="action" href="/donate">Donate</a>
		</div>
	</section>

	<section>
		<h2 class="large">Upcoming Events</h2>
		<div class="events-container">
			<div class="events-list">
				{#each events as event}
					<EventPreview {event} headingLevel={3} />
				{/each}
			</div>
			<Img src={srcFor(homepage.eventsImage)} alt="events" />
		</div>
	</section>
</div>

<style lang="scss">
	.page {
		max-width: unset;
		margin: 0;
	}
	section {
		margin: auto;
		margin-bottom: 6rem;
		max-width: 66rem;
	}
	.embla :global(picture) {
		height: 100%;
	}
	.embla :global(img) {
		border-radius: 0;
		border: none;
	}
	.head {
		display: grid;
		grid-template-rows: auto 3rem auto;
		grid-template-columns: 1fr auto 1fr;
		max-width: unset;
	}
	.embla {
		position: relative;
		grid-row: 1 / 3;
		grid-column: 1 / 4;
		min-height: 30rem;
		height: 40vh;
		overflow: hidden;
		@include border;
	}
	.embla__viewport {
		height: 100%;
	}
	.embla__container {
		display: flex;
		height: 100%;
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}
	.embla__slide :global(.banner) {
		border-radius: 0;
		border: none;
		height: 100%;
	}
	.embla__prev,
	.embla__next {
		position: absolute;
		left: 1.25rem;
		top: calc(50% - 1.75rem);
		bottom: 0;
		background-color: var(--bg);
		border-radius: 50%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		@include border;
		@include elevate;
		& {
			transition: 0.15s;
		}
	}
	.embla__next {
		left: unset;
		right: 1.25rem;
	}
	.embla:hover .embla__prev,
	.embla:hover .embla__next {
		opacity: 1;
	}
	.container {
		max-width: 66rem;
		grid-row: 2 / 4;
		grid-column: 2;
		display: grid;
		gap: 1.25rem;
		grid-template-columns: auto auto 1fr;
		grid-template-rows: 1fr auto;
		z-index: 1;
	}
	.title {
		grid-row: 1;
		grid-column: 1 / 3;
		max-width: 21rem;
		padding: 1.75rem 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		h1 {
			margin: 0;
			font-size: 3rem;
		}
	}
	.mobile-title {
		display: none;
		grid-row: 1;
		grid-column: 1;
		justify-self: left;
		align-self: flex-end;
		z-index: 1;
		margin: 1.25rem;
		border-radius: 1.5rem;
		padding: 1rem 1.25rem;
		h1 {
			margin: 0;
			font-size: 2rem;
		}
	}
	.description {
		grid-row: 1 / 3;
		grid-column: 3;
		gap: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		:global(p) {
			margin: 0;
			font-size: 1.2rem;
		}
	}
	a.action {
		display: inline-block;
		text-align: center;
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: 500;
		padding: 0.75rem 1.5rem;
		background-color: var(--primary);
		@include border;
		@include elevate;
	}
	.support {
		display: flex;
		gap: 1.25rem;
		// height: 18rem;
		> :global(picture) {
			flex: 0 0 55%;
			display: block;
			position: relative;
			overflow: hidden;
		}
		> :global(picture) > :global(img) {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.box {
			flex: 0 0 calc(45% - 1.25rem);
		}
	}
	h2.large {
		font-size: 2rem;
		margin: 1rem 0;
	}
	.events-container {
		display: flex;
		gap: 1.25rem;

		> :global(picture) {
			width: 30%;
		}
		.events-list {
			width: 70%;
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}
	}

	.youtube {
		overflow: hidden;
		aspect-ratio: 16 / 9;
		@include border;
		iframe {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	@media (max-width: 1150px) {
		.head {
			grid-template-rows: auto auto;
			grid-template-columns: auto;
			gap: 1.25rem;
		}
		.embla {
			grid-row: 1;
			grid-column: 1;
		}
		.container {
			position: relative;
			grid-row: 2;
			grid-column: 1;
			justify-self: center;
			grid-template-rows: auto;
			grid-template-columns: auto auto 1fr;
			.action {
				grid-row: 2;
			}
		}
		.title {
			display: none;
		}
		.mobile-title {
			display: block;
		}
		.description {
			grid-row: 1;
			grid-column: 1 / 4;
		}
	}

	@media (max-width: 800px) {
		.events-container {
			> :global(picture) {
				display: none;
			}
			.events-list {
				width: 100%;
			}
		}
		.support {
			flex-direction: column;
			> :global(picture) > :global(img) {
				position: static;
			}
		}
	}

	@media (max-width: 500px) {
		.mobile-title {
			padding: 0.75rem 1rem;
			h1 {
				font-size: 1.5rem;
			}
		}
	}

	@media (max-width: 400px) {
		.mobile-title {
			justify-self: stretch;
			text-align: center;
		}
		.container {
			grid-template-columns: 1fr 1fr;
		}
		.description {
			grid-column: 1 / 3;
		}
		.container .action {
			padding: 0.75rem 1rem;
		}
	}
</style>
