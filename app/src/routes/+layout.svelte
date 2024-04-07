<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import '../global.scss';
	import '@fontsource-variable/outfit';
	import logo from '$lib/assets/lmc-logo.jpg';
	import SearchIcon from '~icons/ph/magnifying-glass-bold';
	import { DropdownMenu } from 'bits-ui';
</script>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="container">
	<header>
		<a class="title" href="/">
			<img class="logo" src={logo} alt="Little Masters Club" />
			<h1>Little Masters Club | <span>小大师聚乐部</span></h1>
		</a>
		<nav>
			<a href="/">Home</a>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="nav-dropdown-trigger">
					<span>About</span>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content class="nav-dropdown-content">
					<DropdownMenu.Item asChild let:builder>
						<a use:builder.action {...builder} class="nav-dropdown-link" href="/about">About Us</a>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild let:builder>
						<a use:builder.action {...builder} class="nav-dropdown-link" href="/contact">
							Contact Us
						</a>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild let:builder>
						<a use:builder.action {...builder} class="nav-dropdown-link" href="/board">
							Board Members
						</a>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<a href="/events">Events</a>
			<a href="/programs">Programs</a>
			<a href="/join">Join</a>
			<button class="search"><SearchIcon /></button>
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

<style lang="scss">
	header {
		padding: 0.75rem 2rem 0.75rem 2rem;
		@include flex(row, space-between, center);
	}
	.title {
		@include flex(row, null, center);
		gap: 1rem;
		text-decoration: none;
		color: inherit;
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
		@include border;
		border-radius: 1rem;
	}
	nav {
		@include flex(row, null, center);
		gap: 0.5rem;
	}
	nav a,
	:global(.nav-dropdown-trigger),
	:global(.nav-dropdown-link) {
		text-decoration: none;
		color: inherit;
		font-weight: 500;
		font-size: 1.2rem;
	}
	nav a,
	:global(.nav-dropdown-trigger) {
		padding: 1rem;
		transition: 0.1s;
	}
	nav a:hover,
	:global(.nav-dropdown-trigger:hover),
	:global(.nav-dropdown-trigger[data-state='open']) {
		transform: translateY(4px);
	}
	:global(.nav-dropdown-link) {
		padding: 0.5rem;
		transition: 0.1s;
	}
	:global(.nav-dropdown-link:hover) {
		transform: translateX(6px);
	}
	:global(.nav-dropdown-content) {
		background: var(--bg);
		@include border;
		border-radius: 1.5rem;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
	}
	.search {
		width: 2rem;
		height: 2rem;
		font-size: 1.2rem;
		@include flex(row, center, center);
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
