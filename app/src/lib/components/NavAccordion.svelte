<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import CaretDownIcon from '~icons/ph/caret-down-bold';

	export let data: {
		category: string;
		pages: { name: string; href: string; isCategory?: boolean }[];
	}[];
	export let menuOpen: boolean;

	$: path = $page.url.pathname;

	$: isCategoryActive = (pages: { name: string; href: string; isCategory?: boolean }[]) => {
		return pages.some(({ href }) => {
			if (href === '/') return path === '/';
			else return path.startsWith(href);
		});
	};

	$: isPageActive = (href: string) => {
		if (href === '/') return path === '/';
		else return path.startsWith(href);
	};
</script>

<Accordion.Root class="accordion-nav">
	{#each data as { category, pages }}
		{#if category !== ''}
			<Accordion.Item
				class={'accordion-nav-item' + (isCategoryActive(pages) ? ' active' : '')}
				value={category}
			>
				<Accordion.Header class="accordion-nav-header" level={2} data-heading-level="2">
					<Accordion.Trigger class="accordion-nav-trigger" tabindex={menuOpen ? 0 : -1}>
						{category}
						<span class="accordion-nav-arrow">
							<CaretDownIcon />
						</span>
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content
					class="accordion-nav-content"
					transition={slide}
					transitionConfig={{ duration: 150 }}
				>
					{#each pages as { name, href, isCategory }}
						<a
							class="accordion-nav-link"
							class:category={isCategory}
							class:active={isPageActive(href)}
							{href}
							target={href.startsWith('http') ? '_blank' : '_self'}
							rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
						>
							{name}
						</a>
					{/each}
				</Accordion.Content>
			</Accordion.Item>
		{:else}
			<a
				class="accordion-nav-link-alone"
				class:active={isPageActive(pages[0].href)}
				href={pages[0].href}
				tabindex={menuOpen ? 0 : -1}>{pages[0].name}</a
			>
		{/if}
	{/each}
</Accordion.Root>

<style lang="scss">
	:global(.accordion-nav) {
		display: flex;
		flex-direction: column;
	}
	:global(.accordion-nav-item) {
	}
	:global(.accordion-nav-header) {
	}
	:global(.accordion-nav-trigger) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		width: 100%;
		font-size: 1.5rem;
		font-weight: 500;
	}
	:global(.accordion-nav-trigger[data-state='open']) .accordion-nav-arrow {
		transform: rotate(180deg);
	}
	:global(.accordion-nav-arrow) {
		transition: transform 0.15s;
		display: inline-flex;
		font-size: 1.25rem;
	}
	:global(.accordion-nav-content) {
		display: flex;
		flex-direction: column;
		padding-bottom: 0.5rem;
	}
	.accordion-nav-link {
		font-size: 1.25rem;
		text-decoration: none;
		padding: 0.5rem;
		padding-left: 2rem;
	}
	.accordion-nav-link.category {
		padding-left: 3rem;
		font-size: 1.125rem;
		opacity: 0.9;
	}
	.accordion-nav-link-alone {
		font-size: 1.5rem;
		font-weight: 500;
		padding: 0.75rem;
		text-decoration: none;
	}
</style>
