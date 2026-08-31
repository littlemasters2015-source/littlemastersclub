<script>
	export let portableText;
</script>

<div class="youtube">
	<iframe
		width="100%"
		height="100%"
		src={portableText.value.url}
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	/>
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
