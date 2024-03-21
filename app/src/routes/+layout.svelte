<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import '../global.css';
	import '@fontsource-variable/outfit';
	import logo from '$lib/assets/lmc-logo.jpg';
</script>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="container">
	<header>
		<div class="title">
			<img class="logo" src={logo} alt="Little Masters Club" />
			<h1>Little Masters Club | <span>小大师聚乐部</span></h1>
		</div>
		<nav>
			<a href="/">Home</a>
			<a href="/about">About</a>
			<a href="/events">Events</a>
			<a href="/programs">Programs</a>
			<a href="/programs">Join</a>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<footer class="footer"></footer>
</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}

<style>
	header {
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.title {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	nav {
		display: flex;
		gap: 2rem;
	}
	nav a {
		text-decoration: none;
		color: var(--txt);
		font-weight: 500;
		font-size: 1.2rem;
	}

	h1 {
		margin: 0;
		font-size: 1.6rem;
	}
	h1 span {
		display: inline-block;
		font-size: 0.8em;
		margin-top: 0.2rem;
		vertical-align: text-top;
	}

	.logo {
		height: 3.5rem;
		width: 3.5rem;
		border-radius: 1rem;
		border: var(--border);
	}

	.preview-toggle {
		backdrop-filter: blur(12px);
		border-radius: 0.25rem;
		bottom: 1rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		color: #1f2937;
		display: block;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1rem;
		padding-bottom: 0.5rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		position: fixed;
		right: 1rem;
		text-align: center;
		text-decoration: none;
		z-index: 50;
	}

	.preview-toggle:hover {
		background-color: #ef4444;
		color: #ffffff;
	}

	.preview-toggle span:first-child {
		display: block;
	}
	.preview-toggle:hover span:first-child {
		display: none;
	}

	.preview-toggle span:last-child {
		display: none;
	}
	.preview-toggle:hover span:last-child {
		display: block;
	}
</style>
