<script>
	import { page } from '$app/stores';

	$: title = $page.error ? $page.status : $page.data.meta.title;
	$: description = $page.error ? $page.error.message : $page.data.meta.description;
	$: type = $page.data.meta.type || 'website';
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
