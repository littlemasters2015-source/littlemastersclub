<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../lib/components/LiveMode.svelte';
	import '../global.scss';
	import '@fontsource-variable/outfit';
	import logo from '$lib/assets/logo.jpg?as=logo';
	import ListIcon from '~icons/ph/list-bold';
	import XIcon from '~icons/ph/x-bold';
	import NavDropdowns from '$lib/components/NavDropdowns.svelte';
	import NavAccordion from '$lib/components/NavAccordion.svelte';
	import Img from '@zerodevx/svelte-img';
	import PageHead from '$lib/components/PageHead.svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import type { LayoutData } from './$types';
	import { stegaClean } from '@sanity/client/stega';

	export let data: LayoutData;

	const q = useQuery(data.categories);

	$: ({ data: categories } = $q);

	let menuOpen = false;

	$: $page.url && (menuOpen = false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	$: pages = [
		{
			category: '',
			pages: [{ name: 'Home', href: '/' }]
		},
		{
			category: 'About',
			pages: [
				{ name: 'About Us', href: '/about' },
				{ name: 'Contact Us', href: '/contact' },
				{ name: 'Board Members', href: '/board' },
				{ name: 'Privacy Policy', href: '/privacy-policy' }
			]
		},
		{
			category: 'Programs',
			pages: [
				{ name: 'Programs', href: '/programs' },
				...categories.map((category) => ({
					name: category.name,
					href: `/programs?category=${stegaClean(category.name)}`,
					isCategory: true
				})),
				{ name: 'Previous Programs', href: '/programs?status=previous' }
			]
		},
		{
			category: 'Events',
			pages: [
				{ name: 'Events', href: '/events' },
				{ name: 'Event Calendar', href: '/calendar' }
			]
		},
		{
			category: 'Newsletter',
			pages: [{ name: 'Newsletter', href: '/newsletter' }]
		},
		{
			category: 'Get Involved',
			pages: [
				{ name: 'Join LMC', href: '/join' },
				{ name: 'Donate', href: '/donate' },
				{ name: 'Volunteer', href: '/volunteer' }
			]
		},
		{
			category: 'Resources',
			pages: [
				{ name: 'Project Proposal', href: '/project-proposal' },
				{ name: 'Susu Scholarship', href: '/susu-scholarship' },
				{ name: 'Microsoft Giving', href: '/microsoft-giving' },
				{ name: 'Old Website', href: 'https://sg.littlemastersclub.org' }
			]
		}
	];
</script>

<PageHead />

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="container">
	<header>
		<a class="title" href="/">
			<Img class="logo" src={logo} alt="Little Masters Club Logo" />
			<h1>Little Masters Club <span> | </span><span class="chinese">小大师聚乐部</span></h1>
		</a>
		<nav>
			<NavDropdowns data={pages} />
			<button
				class="hamburger"
				aria-label={menuOpen ? 'Close mobile navigation' : 'Open mobile navigation'}
				aria-expanded={menuOpen}
				aria-controls="mobile-nav"
				on:click={toggleMenu}
			>
				{#if menuOpen}
					<XIcon />
				{:else}
					<ListIcon />
				{/if}
			</button>
			<!-- <button class="search"><SearchIcon /></button> -->
		</nav>
		<nav
			id="mobile-nav"
			class="mobile-nav"
			aria-label="Mobile navigation"
			aria-hidden={!menuOpen}
			class:open={menuOpen}
		>
			<div class="mobile-nav-inner">
				<NavAccordion data={pages} {menuOpen} />
			</div>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<footer>
		<div class="footer-inner">
			<div class="footer-left">
				<a class="footer-title" href="/">
					<Img class="footer-logo" src={logo} alt="Little Masters Club" />
					<h2>Little Masters Club<br /><span>小大师聚乐部</span></h2>
				</a>
				<p>
					Little Masters Club is a 501(c)(3) nonprofit organization that seeks to provide an
					encouraging environment for kids to be learners, mentors, team players, and leaders.
				</p>
				<h3>Address</h3>
				<span>15015 Main Street Suite 208, Bellevue WA 98007</span>
				<h3>Email</h3>
				<a href="mailto:info@littlemastersclub.org">info@littlemastersclub.org</a>
				<p class="site-credit">Site managed by Jerry Zhang</p>
			</div>
			<div class="footer-links">
				<div class="footer-links-column">
					<div class="footer-group">
						<h3>About</h3>
						<a href="/about">About Us</a>
						<a href="/contact">Contact Us</a>
						<a href="/board">Board Members</a>
					</div>
					<div class="footer-group">
						<h3>Socials</h3>
						<a
							href="https://www.instagram.com/littlemastersclub/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Instagram
						</a>
						<a
							href="https://www.youtube.com/channel/UCiaJbTxkI-6_Kl9YnLE5Fvg"
							target="_blank"
							rel="noopener noreferrer"
						>
							YouTube
						</a>
					</div>
				</div>
				<div class="footer-links-column">
					<div class="footer-group">
						<h3>Events</h3>
						<a href="/events">Events</a>
						<a href="/calendar">Event Calendar</a>
					</div>
					<div class="footer-group">
						<h3>Newsletter</h3>
						<a href="/newsletter">Newsletter</a>
					</div>
					<div class="footer-group">
						<h3>Join</h3>
						<a href="/join">Join LMC</a>
						<a href="/volunteer">Volunteer</a>
						<a href="/donate">Donate</a>
					</div>
					<div class="footer-group">
						<h3>Resources</h3>
						<a href="/project-proposal">Project Proposal</a>
						<a href="/susu-scholarship">Susu Scholarship</a>
						<a href="/microsoft-giving">Microsoft Giving</a>
						<a href="https://sg.littlemastersclub.org" target="_blank" rel="noopener noreferrer">
							Old Website
						</a>
					</div>
				</div>
				<div class="footer-links-column">
					<div class="footer-group">
						<h3>Programs</h3>
						<a href="/programs">Programs</a>
						{#each categories as category}
							<a href={`/programs?category=${stegaClean(category.name)}`}>
								{category.name}
							</a>
						{/each}
						<a href="/programs?status=previous">Previous Programs</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}

<style lang="scss">
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	header {
		padding: 0.75rem 2rem 0.75rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.title {
		gap: 1rem;
		text-decoration: none;
		display: flex;
		align-items: center;
	}
	h1 {
		margin: 0;
		font-size: 1.5rem;
	}
	.chinese {
		display: inline-block;
		font-size: 0.8em;
		margin-top: 0.2rem;
		vertical-align: text-top;
	}
	:global(.logo) {
		height: 3.25rem;
		width: 3.25rem;
		border-radius: 50%;
	}
	nav {
		gap: 0.5rem;
		display: flex;
		align-items: center;
	}
	// .search {
	// 	padding: 0.75rem;
	// 	font-size: 1.2rem;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// }

	.mobile-nav {
		display: block;
		position: fixed;
		top: 3.5rem;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 1rem;
		background-color: var(--bg);
		z-index: 100;
		transform: translateX(calc(-100% - 2rem));
		transition: 0.15s;
		@include border;
		overflow: hidden;
	}
	.mobile-nav.open {
		transform: translateX(0);
	}
	.mobile-nav-inner {
		padding: 1rem;
		overflow: auto;
		height: 100%;
	}
	:global(.container):has(.mobile-nav.open) {
		overflow: hidden;
		position: fixed;
		width: 100%;
		height: 100%;
	}
	.hamburger {
		display: none;
		font-size: 1.25rem;
		padding: 0.5rem;
		align-items: center;
	}

	footer {
		padding: 0 2rem;
		margin-top: 6rem;
	}
	.footer-inner {
		padding: 1.75rem 0rem 3rem 1.75rem;
		margin: 0 auto;
		gap: 2rem;
		display: flex;
		@include border;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		border-bottom: none;
	}
	:global(.footer-logo) {
		height: 5rem;
		width: 5rem;
		border-radius: 50%;
	}
	.footer-title {
		gap: 1rem;
		text-decoration: none;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		h2 {
			margin: 0;
		}
	}
	.footer-left {
		width: 28rem;
		h3 {
			margin: 1rem 0 0.5rem 0;
		}
	}
	.footer-links {
		flex: 1;
		display: flex;
		justify-content: space-evenly;
	}
	.footer-links-column {
		gap: 3rem;
		display: flex;
		flex-direction: column;
		a {
			text-decoration: none;
			font-weight: 400;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	.footer-group {
		gap: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		h3 {
			margin: 0;
		}
	}
	.site-credit {
		margin: 1rem 0 0.5rem 0;
		font-weight: 600;
		line-height: 1.3;
		font-size: 1rem;
	}

	@media (max-width: 1150px) {
		h1 span,
		.chinese {
			display: none;
		}
		h1 {
			font-size: 1.25rem;
		}
		:global(.logo) {
			height: 3rem;
			width: 3rem;
		}
		:global(.nav-dropdown-trigger) {
			font-size: 1rem;
			padding: 0.75rem 0.75rem;
		}
	}

	@media (max-width: 1000px) {
		.footer-inner {
			flex-direction: column;
			padding-right: 1.75rem;
		}
		.footer-left {
			width: 100%;
		}
		.footer-links {
			justify-content: space-between;
		}
	}

	@media (max-width: 900px) {
		nav :global(.nav-dropdown-trigger) {
			display: none;
		}
		.hamburger {
			display: flex;
		}
	}

	@media (max-width: 800px) {
		footer {
			padding: 0 1.25rem;
		}
		header {
			padding-left: 1.25rem;
			padding-right: 1.25rem;
		}
	}

	@media (max-width: 600px) {
		.footer-links {
			flex-wrap: wrap;
			gap: 3rem 2rem;
		}
	}

	@media (max-width: 500px) {
		.footer-title {
			flex-direction: column;
			align-items: flex-start;
			h2 {
				font-size: 1.5rem;
			}
		}
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
