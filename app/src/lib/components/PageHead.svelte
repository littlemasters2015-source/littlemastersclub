<script>
	import { page } from '$app/stores';

	$: title = $page.error ? $page.status : $page.data.meta.title || 'Little Masters Club';
	$: description = $page.error
		? $page.error.message
		: $page.data.meta.description ||
			'Little Masters Club is a nonprofit organization that seeks to provide an encouraging environment for kids to be learners, mentors, team players, and leaders.';
	$: type = $page.error ? 'website' : $page.data.meta.type || 'website';
	$: url = $page.url.href;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:site_name" content="Little Masters Club" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content={type} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
</svelte:head>
