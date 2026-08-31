<script>
	export let portableText;

	function normalizeYouTubeUrl(value) {
		if (!value) return '';

		const trimmed = value.trim();
		if (!trimmed) return '';

		const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
		if (iframeMatch) {
			return iframeMatch[1];
		}

		try {
			const url = new URL(trimmed);
			const host = url.hostname.replace(/^www\./, '');
			const videoId = url.searchParams.get('v');
			const pathParts = url.pathname.split('/').filter(Boolean);

			if (host === 'youtube.com' || host === 'm.youtube.com') {
				if (url.pathname.includes('/embed/')) {
					return url.href;
				}
				if (videoId) {
					const embedUrl = new URL('https://www.youtube.com/embed/' + videoId);
					const params = new URLSearchParams(url.search);
					params.delete('v');
					if (params.has('si')) {
						embedUrl.searchParams.set('si', params.get('si'));
					}
					return embedUrl.toString();
				}
				if (pathParts[0] === 'shorts' && pathParts[1]) {
					return 'https://www.youtube.com/embed/' + pathParts[1];
				}
			}

			if (host === 'youtu.be' && pathParts[0]) {
				return 'https://www.youtube.com/embed/' + pathParts[0];
			}
		} catch {
			return trimmed;
		}

		return trimmed;
	}

	$: embedUrl = normalizeYouTubeUrl(portableText?.value?.url);
</script>

<div class="youtube">
	{#if embedUrl}
		<iframe
			width="100%"
			height="100%"
			src={embedUrl}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		/>
	{/if}
</div>

<style lang="scss">
	.youtube {
		margin: 1.5rem 0;
		overflow: hidden;
		aspect-ratio: 16 / 9;
		@include border;
		iframe {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>
