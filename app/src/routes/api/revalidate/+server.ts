import { error, json, type RequestHandler } from '@sveltejs/kit';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { env } from '$env/dynamic/private';

type ResponseType = {
	_id?: string;
	slug?: string;
	_type?: string;
};

async function revalidateSlug(slug: string): Promise<boolean> {
	// Set a delay to allow Sanity data to correctly propagate.
	await new Promise((resolve) => setTimeout(resolve, 2000));
	console.log(`Revalidating: ${env.SITE_URL}/${slug}`);
	const res = await fetch(`${env.SITE_URL}/${slug}`, {
		cache: 'no-store',
		headers: {
			'x-prerender-revalidate': env.BYPASS_TOKEN
		}
	});
	if (!res.ok) {
		console.log(`Could not revalidate ${env.SITE_URL}/${slug}`);
	}
	return res.ok;
}

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? '';
	const body = (await request.clone().json()) as ResponseType;

	if (!(await isValidSignature(JSON.stringify(body), signature, env.BYPASS_TOKEN))) {
		throw error(403, 'Forbidden');
	}

	if (body?.slug) {
		console.log(JSON.stringify(body));
		const ok = await revalidateSlug(body.slug);
		// if (body?._type === 'event') {
		// 	await revalidateSlug('events');
		// } else if (body?._type === 'program') {
		// 	await revalidateSlug('programs');
		// } else if (body?._type === 'newsletter') {
		// 	await revalidateSlug('newsletters');
		// }
		return json({ ok });
	}

	throw error(404, 'Slug not found');
};

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
	api: {
		bodyParser: false
	}
};
