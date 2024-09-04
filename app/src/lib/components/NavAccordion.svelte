<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	export let data: { category: string; pages: { name: string; href: string }[] }[];

	$: path = $page.url.pathname;

	$: isCategoryActive = (pages: { name: string; href: string }[]) => {
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

<Accordion.Root>
	{#each data as { category, pages }}
		{#if category !== ''}
			<Accordion.Item
				class={'accordion-nav-item' + (isCategoryActive(pages) ? ' active' : '')}
				value={category}
			>
				<Accordion.Header>
					<Accordion.Trigger />
				</Accordion.Header>
				<Accordion.Content>
					{#each pages as { name, href }}
						<a class="accordion-nav-link" class:active={isPageActive(href)} {href}>{name}</a>
					{/each}
				</Accordion.Content>
			</Accordion.Item>
		{/if}
	{/each}
</Accordion.Root>

<style lang="scss">
</style>
