<script lang="ts">
	import banner from '$lib/assets/banner.jpg';
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
			<a class="action" href="/join">Get Involved</a>
			<a class="action" href="/about">Learn More</a>
		</div>
	</section>
</div>

<style>
	.page {
		padding: 0rem 2rem;
	}

	.head {
		display: grid;
		grid-template-rows: auto 3rem auto;
		grid-template-columns: 1fr auto 1fr;
	}
	.banner {
		grid-row: 1 / 3;
		grid-column: 1 / 4;
		width: 100%;
		height: 30rem;
		object-fit: cover;
		object-position: 50% 70%;
		border-radius: 2rem;
		border: var(--border);
	}
	.container {
		grid-row: 2 / 4;
		grid-column: 2;
		display: grid;
		gap: 1rem;
		grid-template-columns: auto auto auto;
		grid-template-rows: 1fr auto;
	}
	.box {
		background-color: var(--bg);
		border-radius: 2rem;
		border: var(--border);
		padding: 2rem;
	}
	.title {
		grid-row: 1;
		grid-column: 1 / 3;
		max-width: 21rem;
	}
	h1 {
		margin: 0;
		font-size: 3rem;
	}
	.description {
		grid-row: 1 / 3;
		grid-column: 3;
		font-size: 1.2rem;
		max-width: 44rem;
		width: 100%;
	}
	.description p {
		margin: 0;
	}
	a {
		text-align: center;
		text-decoration: none;
		color: var(--txt);
		font-size: 1.2rem;
		font-weight: 500;
		padding: 1rem 1.5rem;
		background-color: var(--primary);
		border-radius: 2rem;
		border: var(--border);
	}
</style>
