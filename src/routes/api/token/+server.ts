import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
import { DISCORD_CLIENT_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { code } = await request.json();

	const response = await fetch(`https://discord.com/api/oauth2/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: PUBLIC_DISCORD_CLIENT_ID,
			client_secret: DISCORD_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code,
		}),
	});

	const { access_token } = await response.json();

	return json({ access_token });
};
