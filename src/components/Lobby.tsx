import { useDiscordSdk } from '../hooks/useDiscordSdk'
import { User } from 'discord.js'

async function getUser(accessToken: string) {
	const user = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		}
	}).then((response) => response.json())

	return user
}

export function Lobby(props: { channelId: string | null }) {
	const { accessToken, discordSdk } = useDiscordSdk()
	const [players, setPlayers] = useSyncState<User[]>([], ['players', props.channelId])

	discordSdk.commands.getInstanceConnectedParticipants()

	// TODO: Find a cleaner way to implement this
	if (!accessToken) {
		return (
			<div className="flex h-dvh items-center justify-center bg-white text-2xl font-bold text-black dark:bg-black dark:text-white">
				Authentication failed! Relaunch the activity to retry.
			</div>
		)
	}

	// Add yourself to players if not present
	if (!players.find((player) => player.id === session.user.id)) {
		getUser(accessToken).then((user) => {
			setPlayers((players) => players.concat(user))
		})
	}

	const gridItems = players.map((player) => {
		return (
			<div className="mt-6 text-center">
				<img
					className="rounded-full border-8"
					style={{ borderColor: player.accentColor ? player.accentColor.toString() : '16777215' }}
					src={
						player.avatar
							? `https://cdn.discordapp.com/avatars/${player.id}/${player.avatar}.webp?size=128`
							: '/profile.png'
					}
					alt={player.username}
				/>
				<p className="mt-2">{player.username}</p>
			</div>
		)
	})

	return (
		<div className="flex min-h-dvh w-dvw flex-col place-content-center place-items-center bg-white text-center text-black dark:bg-black dark:text-white">
			<h1 className="text-5xl">Lobby</h1>
			<div className="mt-4 flex w-3/4 flex-wrap place-content-center justify-center space-x-6">{gridItems}</div>
		</div>
	)
}
