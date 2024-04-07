<script lang="ts">
	import { DropdownMenu as DD } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import ArrowIcon from '~icons/ph/arrow-right-bold';

	export let title: string;
	export let data: { name: string; href: string }[];
</script>

<DD.Root preventScroll={false}>
	<DD.Trigger class="nav-dropdown-trigger">{title}</DD.Trigger>
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
		font-size: 1.2rem;
	}
	:global(.nav-dropdown-trigger) {
		padding: 0.75rem 1.25rem;
		transition: 0.1s;
		border-radius: 2rem;
		border: 2px solid transparent;
	}
	:global(.nav-dropdown-trigger:hover),
	:global(.nav-dropdown-trigger[data-state='open']) {
		border-color: var(--txt);
	}
	:global(.nav-dropdown-trigger[data-state='open']) {
		background: var(--bg-2);
	}
	:global(.nav-dropdown-link) {
		@include flex(row, null, center);
		padding: 0.5rem;
		transition: 0.15s;
		transform: translateX(-1.25rem);
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
		background: var(--bg);
		@include border;
		border-radius: 2rem;
		padding: 0.75rem 1.25rem 0.75rem 0.75rem;
		display: flex;
		flex-direction: column;
	}
</style>
