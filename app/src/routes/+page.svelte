<script lang="ts">
	import banner from '$lib/assets/banner.jpg';
</script>

<div class="page">
	<section>
		<img class="banner" src={banner} alt="banner" />
	</section>
</div>

<style>
	.page {
		padding: 1rem 2rem;
	}

	.banner {
		width: 100%;
		height: 30rem;
		object-fit: cover;
		object-position: 50% 70%;
		border-radius: 2rem;
		border: var(--border);
	}
</style>
