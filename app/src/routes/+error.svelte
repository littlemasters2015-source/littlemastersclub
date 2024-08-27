<script>
	// import PageHead from '$lib/components/PageHead.svelte';
	import { page } from '$app/stores';
</script>

<div class="page">
	{#if $page.error}
		<h1 class="errorCode">{$page.status}</h1>
		<h2 class="errorMessage">{$page.error.message}</h2>
	{/if}
</div>

<!-- <PageHead title={$page.status} description={$page.error.message} /> -->

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.errorCode {
		font-size: 5rem;
		margin: 0;
	}

	.errorMessage {
		margin: 0;
	}
</style>
