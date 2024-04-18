export function formatDateTimeRange(start: string, end: string): string {
	return `${formatDateRange(start, end, true)}, ${formatTimeRange(start, end)}`;
}

export function formatDateRange(start: string, end: string, short: boolean = false): string {
	const startDate = new Date(start);
	const endDate = new Date(end);

	const options: Intl.DateTimeFormatOptions = {
		year: short ? undefined : 'numeric',
		month: short ? 'short' : 'short',
		day: 'numeric'
	};

	const startString = startDate.toLocaleDateString('en-US', options);
	const endString = endDate.toLocaleDateString('en-US', options);
	if (startString === endString) {
		return startString;
	}
	return `${startString} - ${endString}`;
}

export function formatTimeRange(start: string, end: string): string {
	const startDate = new Date(start);
	const endDate = new Date(end);
	const options: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: '2-digit'
	};
	const startString = startDate.toLocaleTimeString('en-US', options);
	const endString = endDate.toLocaleTimeString('en-US', options);
	if (startString === endString) {
		return startString;
	}
	return `${startString} - ${endString}`;
}

export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}
