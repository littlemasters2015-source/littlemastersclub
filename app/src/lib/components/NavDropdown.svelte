<script lang="ts">
	import { DropdownMenu as DD } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import ArrowIcon from '~icons/ph/arrow-right-bold';

	export let title: string;
	export let data: { name: string; href: string }[];
	export let path: string;

	$: isActive = data.some(({ href }) => path.startsWith(href));
</script>

<DD.Root preventScroll={false}>
	<DD.Trigger class={'nav-dropdown-trigger' + (isActive ? ' active' : '')}>{title}</DD.Trigger>
	<DD.Content class="nav-dropdown-content" transition={fade} transitionConfig={{ duration: 50 }}>
		{#each data as { name, href }}
			<DD.Item asChild let:builder>
				<a use:builder.action {...builder} class="nav-dropdown-link" {href}>
					<ArrowIcon class="nav-arrow" />{name}
				</a>
			</DD.Item>
		{/each}
	</DD.Content>
</DD.Root>

<style lang="scss">
	:global(.nav-dropdown-trigger),
	:global(.nav-dropdown-link) {
		text-decoration: none;
		color: inherit;
		font-weight: 500;
		font-size: 1.1rem;
	}
	:global(.nav-dropdown-trigger) {
		padding: 0.75rem 1rem;
		transition: 0.1s;
		border-radius: 2rem;
		border: 2px solid transparent;
		transition:
			transform 0.1s,
			box-shadow 0.1s;
	}
	:global(.nav-dropdown-trigger:hover),
	:global(.nav-dropdown-trigger.active),
	:global(.nav-dropdown-trigger[data-state='open']) {
		border-color: var(--txt);
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
	:global(.nav-dropdown-link:hover) {
		transform: translateX(0);
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
		// transform: translate(-2px, -2px);
		// box-shadow: 2px 2px 0px 0px var(--txt);
	}
</style>
