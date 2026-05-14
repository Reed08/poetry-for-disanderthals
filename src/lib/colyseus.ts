import { Client, Callbacks } from '@colyseus/sdk';
import { discordSdk } from './discordSdk';

// TODO: Figure out connection to server
const colyseusClient = new Client('');

const room = await colyseusClient.joinOrCreate(discordSdk.channelId!);

const callbacks = Callbacks.get(room);

callbacks.onAdd('players', (player, sessionId) => {
	console.log('Player joined:', sessionId);
});

callbacks.onRemove('players', (player, sessionId) => {
	console.log('Player left:', sessionId);
});
