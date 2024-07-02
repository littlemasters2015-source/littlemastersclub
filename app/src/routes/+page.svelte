<script lang="ts">
	import banner from '$lib/assets/banner.jpg';
	import support from '$lib/assets/signin.jpg';
	import eventsImg from '$lib/assets/hands.jpg';

	import { formatDateTimeRange } from '$lib/utils';
	import { useQuery } from '@sanity/svelte-loader';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: events } = $q);
</script>

<div class="page">
	<section class="head">
		<img class="banner" src={banner} alt="banner" />
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
				<br />
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
		<img src={support} alt="support" />
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
					<a class="box event" href={`/events/${event.slug.current}`}>
						{#if event.image}
							<img src={urlFor(event.image).url()} alt={event.title} />
						{/if}
						<div class="info">
							<h3>{event.title}</h3>
							{#if event.startTime && event.endTime}
								<p>{formatDateTimeRange(event.startTime, event.endTime)}</p>
							{/if}
							<p class="description">{event.description}</p>
						</div>
					</a>
				{/each}
			</div>
			<img src={eventsImg} alt="events" />
		</div>
	</section>
</div>

<style lang="scss">
	.page {
		padding: 0rem 2rem;
	}
	section {
		margin: auto;
		margin-bottom: 6rem;
		max-width: 66rem;
	}
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
		@include border;
	}
	.head {
		display: grid;
		grid-template-rows: auto 3rem auto;
		grid-template-columns: 1fr auto 1fr;
		max-width: unset;
	}
	.banner {
		grid-row: 1 / 3;
		grid-column: 1 / 4;
		height: 40vh;
		object-position: 50% 65%;
	}
	.container {
		max-width: 66rem;
		grid-row: 2 / 4;
		grid-column: 2;
		display: grid;
		gap: 1.25rem;
		grid-template-columns: auto auto auto;
		grid-template-rows: 1fr auto;
	}
	.title {
		grid-row: 1;
		grid-column: 1 / 3;
		max-width: 21rem;
		padding: 2.2rem;
	}
	.title h1 {
		margin: 0;
		font-size: 2.75rem;
	}
	.description {
		grid-row: 1 / 3;
		grid-column: 3;
		max-width: 44rem;
		width: 100%;
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
	.event {
		display: block;
		text-decoration: none;
		padding: 0;
		position: relative;
		height: 11rem;
		background-color: var(--bg-2);
		overflow: hidden;
		@include elevate;

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

			h3 {
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
	}
	.youtube {
		@include border;
		overflow: hidden;
		iframe {
			display: block;
		}
	}
</style>
