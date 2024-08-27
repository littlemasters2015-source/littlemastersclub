<script lang="ts">
	export let start;
	export let end;

	function formatTime(timeString: string): string {
		const date = new Date(timeString);
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	}

	const startDate = new Date(start);
	const endDate = new Date(end);
</script>

{#if startDate.toDateString() === endDate.toDateString()}
	<time datetime={start}>{formatTime(start)}</time> -
	<time datetime={end}>{formatTime(end).split(', ')[1]}</time>
{:else}
	<time datetime={start}>{formatTime(start)}</time> - <time datetime={end}>{formatTime(end)}</time>
{/if}
