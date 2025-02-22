import { error, json, type RequestHandler } from '@sveltejs/kit';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { env } from '$env/dynamic/private';

type ResponseType = any;

async function revalidateSlug(slug: string): Promise<boolean> {
	// Set a delay to allow Sanity data to correctly propagate.
	await new Promise((resolve) => setTimeout(resolve, 8000));
	console.log(`Revalidating: ${env.SITE_URL}/${slug}`);
	const res = await fetch(`${env.SITE_URL}/${slug}`, {
		cache: 'no-store',
		headers: env.BYPASS_TOKEN
			? {
					'x-prerender-revalidate': env.BYPASS_TOKEN
				}
			: {}
	});
	if (!res.ok) {
		console.log(`Could not revalidate ${env.SITE_URL}/${slug}`);
	}
	return res.ok;
}

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? '';
	const body = (await request.clone().json()) as ResponseType;

	if (!(await isValidSignature(JSON.stringify(body), signature, env.BYPASS_TOKEN ?? ''))) {
		throw error(403, 'Forbidden');
	}

	console.log(JSON.stringify(body));

	if (body?._type === 'homePage') {
		await revalidateSlug('');
	} else if (body?._type === 'boardMember') {
		await revalidateSlug('board');
	} else if (body?._type === 'category') {
		await revalidateSlug('');
	} else if (body?._type === 'event') {
		await Promise.all([revalidateSlug('events'), revalidateSlug(`events/${body.slug.current}`)]);
	} else if (body?._type === 'program') {
		await Promise.all([
			revalidateSlug('programs'),
			revalidateSlug(`programs/${body.slug.current}`)
		]);
	} else if (body?._type === 'newsletter') {
		await Promise.all([
			revalidateSlug('newsletter'),
			revalidateSlug(`newsletter/${body.slug.current}`)
		]);
	} else {
		await revalidateSlug(body.slug.current);
	}

	return json({ ok: true });

	// throw error(404, 'Slug not found');
};

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
	api: {
		bodyParser: false
	}
};
