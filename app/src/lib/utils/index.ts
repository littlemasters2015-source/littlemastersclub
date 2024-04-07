export function formatTimeRange(startTime: string, endTime: string): string {
	const start = new Date(startTime);
	const end = new Date(endTime);
	return `${start.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	})}, ${start.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	})} - ${end.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	})}`;
}

export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}
