<script lang="ts">
	import banner from '$lib/assets/banner.jpg?as=lg';
	import support from '$lib/assets/signin.jpg?as=md';
	import eventsImg from '$lib/assets/hands.jpg?as=md';

	import EventPreview from '$lib/components/EventPreview.svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import ArrowLeftIcon from '~icons/ph/arrow-left';
	import ArrowRightIcon from '~icons/ph/arrow-right';
	import Img from '@zerodevx/svelte-img';

	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: events } = $q);

	let emblaApi: EmblaCarouselType;
	let options = { loop: true };
	let plugins = [Autoplay({ delay: 4000 })];

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
		console.log(emblaApi.slideNodes());
	}
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
					<div class="embla__slide">
						<Img src={banner} alt="banner" />
					</div>
					<div class="embla__slide">
						<Img src={banner} alt="banner" />
					</div>
					<div class="embla__slide">
						<Img src={banner} alt="banner" />
					</div>
				</div>
			</div>
			<button class="embla__prev" on:click={() => emblaApi.scrollPrev()}>
				<ArrowLeftIcon style="font-size: 1.5rem;" />
			</button>
			<button class="embla__next" on:click={() => emblaApi.scrollNext()}>
				<ArrowRightIcon style="font-size: 1.5rem;" />
			</button>
		</div>
		<div class="container">
			<div class="box title">
				<h1>Every Kid is a Master.</h1>
			</div>
			<div class="box description">
				<p>
					Little Masters Club is a 501(c)(3) nonprofit organization that seeks to provide an
					encouraging environment for kids to be learners, mentors, team players, and leaders. We
					promote “learning by doing” through a multitude of fun projects.
				</p>
				<p>
					Our goal is to connect children to their community, invoke their compassion and
					motivation, develop their skills, and give them an opportunity to shine.
				</p>
			</div>
			<a class="action big" href="/join">Get Involved</a>
			<a class="action big" href="/about">Learn More</a>
		</div>
	</section>

	<section class="youtube">
		<iframe
			width="1056"
			height="594"
			src="https://www.youtube-nocookie.com/embed/AyDXMj-lnzU?si=d3so5hBTkQydBJIT"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		/>
	</section>

	<section class="support">
		<Img src={support} alt="support" />
		<div class="box">
			<h2>Support Us</h2>
			<p>
				We rely on the generosity of our community to provide children with engaging projects and
				events. Your support is greatly appreciated!
			</p>
			<a class="action" href="/donate">Donate</a>
		</div>
	</section>

	<section>
		<h2 class="large">Upcoming Events</h2>
		<div class="events-container">
			<div class="events-list">
				{#each events as event}
					<EventPreview {event} />
				{/each}
			</div>
			<Img src={eventsImg} alt="events" />
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
	.events-container > :global(picture) {
		width: 30%;
	}
	.support > :global(picture) {
		width: 60%;
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
			transition: 0.2s;
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
	}
	.title h1 {
		margin: 0;
		font-size: 3rem;
	}
	.description {
		grid-row: 1 / 3;
		grid-column: 3;
		gap: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		p {
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
		height: 18rem;
		img {
			width: 60%;
			object-fit: cover;
		}
		p {
			margin: 1rem 0;
		}
		.box {
			width: 40%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
		}
	}
	h2.large {
		font-size: 2rem;
		margin: 1rem 0;
	}
	.events-container {
		display: flex;
		gap: 1.25rem;

		img {
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
		@include border;
		iframe {
			display: block;
		}
	}
</style>
