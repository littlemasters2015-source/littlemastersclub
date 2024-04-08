<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../lib/components/LiveMode.svelte';
	import '../global.scss';
	import '@fontsource-variable/outfit';
	import logo from '$lib/assets/lmc-logo.jpg';
	import SearchIcon from '~icons/ph/magnifying-glass-bold';
	import NavDropdown from '$lib/components/NavDropdown.svelte';
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
			<NavDropdown
				title="About"
				data={[
					{ name: 'About Us', href: '/about' },
					{ name: 'Contact Us', href: '/contact' },
					{ name: 'Board Members', href: '/board' }
				]}
			/>
			<NavDropdown
				title="Events"
				data={[
					{ name: 'Events', href: '/events' },
					{ name: 'Event Calendar', href: '/calendar' }
				]}
			/>
			<NavDropdown
				title="Programs"
				data={[
					{ name: 'All Programs', href: '/programs' },
					{ name: 'Culture', href: '/programs?category=culture' }
				]}
			/>
			<NavDropdown
				title="Join"
				data={[
					{ name: 'Get Involved', href: '/join' },
					{ name: 'Volunteer', href: '/volunteer' },
					{ name: 'Resources', href: '/resources' }
				]}
			/>
			<button class="search"><SearchIcon /></button>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<footer>
		<div class="footer-inner">
			<div class="footer-left">
				<a class="footer-title" href="/">
					<img class="footer-logo" src={logo} alt="Little Masters Club" />
					<h2>Little Masters Club<br /><span>小大师聚乐部</span></h2>
				</a>
				<p>
					Little Masters Club is a 501(c)(3) nonprofit organization that seeks to provide an
					encouraging environment for kids to be learners, mentors, team players, and leaders.
				</p>
				<h4>Address</h4>
				<span>15015 Main Street Suite 208, Bellevue WA 98007</span>
				<h4>Email</h4>
				<a href="mailto:info@littlemastersclub.org">info@littlemastersclub.org</a>
			</div>
			<div class="footer-links">
				<div class="footer-links-column">
					<div class="footer-group">
						<h3>Socials</h3>
						<a href="https://twitter.com/LMC_US" target="_blank" rel="noopener noreferrer">
							Twitter
						</a>
						<a
							href="https://www.facebook.com/LittleMastersClubUS/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Facebook
						</a>
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
						<h3>About</h3>
						<a href="/about">About Us</a>
						<a href="/contact">Contact Us</a>
						<a href="/board">Board Members</a>
					</div>
					<div class="footer-group">
						<h3>Events</h3>
						<a href="/events">Events</a>
						<a href="/calendar">Event Calendar</a>
					</div>
				</div>
				<div class="footer-links-column">
					<div class="footer-group">
						<h3>Programs</h3>
						<a href="/programs">All Programs</a>
						<a href="/programs?category=culture">Culture</a>
					</div>
					<div class="footer-group">
						<h3>Join</h3>
						<a href="/join">Get Involved</a>
						<a href="/volunteer">Volunteer</a>
						<a href="/resources">Resources</a>
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
		@include flex(column);
		min-height: 100vh;
	}
	main {
		@include flex(column);
		flex: 1;
	}
	header {
		@include flex(row, space-between, center);
		padding: 0.75rem 2rem 0.75rem 2rem;
	}
	.title {
		@include flex(row, null, center);
		gap: 1rem;
		text-decoration: none;
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
		height: 3.25rem;
		width: 3.25rem;
		@include border;
		border-radius: 1rem;
	}
	nav {
		@include flex(row, null, center);
		gap: 0.25rem;
	}
	nav a {
		text-decoration: none;
		font-weight: 500;
		font-size: 1.2rem;
		padding: 0.75rem 1.25rem;
		transition: 0.1s;
		border-radius: 2rem;
		border: 2px solid transparent;
	}
	nav a:hover {
		border-color: var(--txt);
	}
	.search {
		padding: 0.75rem;
		font-size: 1.2rem;
		@include flex(row, center, center);
	}
	footer {
		padding: 0 1.5rem;
		margin-top: 6rem;
	}
	.footer-inner {
		// background: var(--bg-2);
		@include border;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		border-bottom: none;
		padding: 2rem 0rem 3rem 2rem;
		max-width: 80rem;
		margin: 0 auto;
		@include flex(row, null, null);
		gap: 2rem;
	}
	.footer-logo {
		height: 5rem;
		width: 5rem;
		@include border;
		border-radius: 1.5rem;
	}
	.footer-title {
		@include flex(row, null, center);
		gap: 1rem;
		text-decoration: none;
		margin-bottom: 1.5rem;
		h2 {
			margin: 0;
		}
	}
	.footer-left {
		width: 27rem;
		h4 {
			margin: 1rem 0 0.5rem 0;
		}
	}
	.footer-links {
		flex: 1;
		@include flex(row, space-evenly);
	}
	.footer-links-column {
		@include flex(column);
		gap: 3rem;
		a {
			font-size: 1.1rem;
			text-decoration: none;
			font-weight: 400;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	.footer-group {
		@include flex(column, null, start);
		gap: 1rem;
		width: 10rem;
		h3 {
			margin: 0;
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
