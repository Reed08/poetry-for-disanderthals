import { DiscordSDK } from '@discord/embedded-app-sdk';
import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';

interface Auth {
	access_token: string;
	user: {
		username: string;
		discriminator: string;
		id: string;
		public_flags: number;
		avatar?: string | null | undefined;
		global_name?: string | null | undefined;
	};
	scopes: (
		| -1
		| 'identify'
		| 'identify.premium'
		| 'email'
		| 'connections'
		| 'guilds'
		| 'guilds.join'
		| 'guilds.members.read'
		| 'guilds.channels.read'
		| 'gdm.join'
		| 'bot'
		| 'rpc'
		| 'rpc.notifications.read'
		| 'rpc.voice.read'
		| 'rpc.voice.write'
		| 'rpc.video.read'
		| 'rpc.video.write'
		| 'rpc.screenshare.read'
		| 'rpc.screenshare.write'
		| 'rpc.activities.write'
		| 'webhook.incoming'
		| 'messages.read'
		| 'applications.builds.upload'
		| 'applications.builds.read'
		| 'applications.commands'
		| 'applications.commands.permissions.update'
		| 'applications.commands.update'
		| 'applications.store.update'
		| 'applications.entitlements'
		| 'activities.read'
		| 'activities.write'
		| 'activities.invites.write'
		| 'relationships.read'
		| 'relationships.write'
		| 'voice'
		| 'dm_channels.read'
		| 'role_connections.write'
		| 'presences.read'
		| 'presences.write'
		| 'openid'
		| 'dm_channels.messages.read'
		| 'dm_channels.messages.write'
		| 'gateway.connect'
		| 'account.global_name.update'
		| 'payment_sources.country_code'
		| 'sdk.social_layer_presence'
		| 'sdk.social_layer'
		| 'lobbies.write'
		| 'application_identities.write'
	)[];
	expires: string;
	application: {
		id: string;
		description: string;
		name: string;
		icon?: string | null | undefined;
		rpc_origins?: string[] | undefined;
	};
}

export let auth: Auth;

export let discordSdk = new DiscordSDK(PUBLIC_DISCORD_CLIENT_ID);
export const discordSdkReady = new Promise<void | string>(
	async (resolve, reject) => {
		const result = await setupDiscordSdk();

		if (result === true) {
			resolve();
		} else {
			reject(result);
		}
	},
);

async function setupDiscordSdk(): Promise<true | string> {
	await discordSdk.ready();

	try {
		const { code } = await discordSdk.commands.authorize({
			client_id: PUBLIC_DISCORD_CLIENT_ID,
			response_type: 'code',
			state: '',
			prompt: 'none',
			scope: ['identify', 'guilds', 'applications.commands'],
		});
		console.log('hoi');

		const response = await fetch('/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				code,
			}),
		});
		const { access_token } = await response.json();

		auth = await discordSdk.commands.authenticate({
			access_token,
		});
	} catch (err) {
		if (typeof err === 'string') {
			return err;
		} else if (err instanceof Error) {
			return err.message;
		}
	}

	if (auth == null) {
		return 'Auth returned null';
	}

	return true;
}

export async function getChannelName() {
	let channelName = 'woa';

	if (discordSdk.channelId != null && discordSdk.guildId != null) {
		const channel = await discordSdk.commands.getChannel({
			channel_id: discordSdk.channelId,
		});
		if (channel.name != null) {
			channelName = channel.name;
		}
	}

	return channelName;
}
