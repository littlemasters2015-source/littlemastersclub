<script lang="ts">
	import { DropdownMenu as DD } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import ArrowIcon from '~icons/ph/arrow-right-bold';

	export let data: {
		category: string;
		pages: { name: string; href: string; isCategory?: boolean }[];
	}[];

	$: path = $page.url.pathname;

	$: isActive = (pages: { name: string; href: string }[]) => {
		return pages.some(({ href }) => {
			if (href === '/') return path === '/';
			else return path.startsWith(href);
		});
	};
</script>

{#each data as { category, pages }}
	{#if category !== ''}
		<DD.Root preventScroll={false}>
			<DD.Trigger class={'nav-dropdown-trigger' + (isActive(pages) ? ' active' : '')}
				>{category}</DD.Trigger
			>
			<DD.Content
				class="nav-dropdown-content"
				transition={fade}
				transitionConfig={{ duration: 50 }}
			>
				{#each pages as { name, href, isCategory }}
					<DD.Item asChild let:builder>
						<a
							use:builder.action
							{...builder}
							class="nav-dropdown-link"
							class:category={isCategory}
							{href}
						>
							<ArrowIcon class="nav-arrow" />{name}
						</a>
					</DD.Item>
				{/each}
			</DD.Content>
		</DD.Root>
	{:else}
		<a class="nav-dropdown-trigger" class:active={isActive(pages)} href={pages[0].href}
			>{pages[0].name}</a
		>
	{/if}
{/each}

<style lang="scss">
	:global(.nav-dropdown-trigger),
	:global(.nav-dropdown-link) {
		text-decoration: none;
		color: inherit;
		font-weight: 500;
		font-size: 1.125rem;
	}
	:global(.nav-dropdown-trigger) {
		padding: 0.75rem 1rem;
		transition: 0.15s;
		border-radius: 2rem;
		border: 2px solid transparent;
	}
	:global(.nav-dropdown-trigger:hover),
	:global(.nav-dropdown-trigger.active),
	:global(.nav-dropdown-trigger[data-state='open']) {
		border-color: var(--txt);
	}
	:global(.nav-dropdown-trigger[data-state='open']) {
		background-color: var(--bg-2);
	}
	:global(.nav-dropdown-trigger:hover),
	:global(.nav-dropdown-trigger[data-state='open']) {
		transform: translate(-2px, -2px);
		box-shadow: 2px 2px 0px 0px var(--txt);
	}
	:global(.nav-dropdown-link) {
		padding: 0.5rem;
		transition: 0.15s;
		transform: translateX(-1.25rem);
		display: flex;
		align-items: center;
	}
	:global(.nav-dropdown-link.category) {
		padding-left: 1.5rem;
		font-size: 1rem;
		opacity: 0.9;
	}
	:global(.nav-dropdown-link:hover) {
		transform: translateX(0);
	}
	:global(.nav-dropdown-link.category:hover) {
		transform: translateX(0.5rem);
	}
	:global(.nav-arrow) {
		font-size: 0.9rem;
		margin-top: 0.05rem;
		margin-right: 0.25rem;
		opacity: 0;
		transition: 0.15s;
	}
	:global(.nav-dropdown-link:hover .nav-arrow) {
		opacity: 1;
	}
	:global(.nav-dropdown-content) {
		margin-top: 0.5rem;
		background-color: var(--bg);
		border-radius: 2rem;
		padding: 0.75rem 1.25rem 0.75rem 0.75rem;
		display: flex;
		flex-direction: column;
		@include border;
	}
</style>
