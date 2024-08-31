<script>
	export let portableText;
</script>

<div class="youtube">
	<iframe
		width="816"
		height="459"
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
		overflow: hidden;
		@include border;
		iframe {
			display: block;
		}
	}
</style>
