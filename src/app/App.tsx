import { DiscordContextProvider } from '../hooks/useDiscordSdk'
import { SyncContextProvider } from '@robojs/sync'
import { Activity } from './Activity'
import './App.css'

/**
 * Set `authenticate` to true to enable Discord authentication.
 * You can also set the `scope` prop to request additional permissions.
 *
 * ```tsx
 * <DiscordContextProvider authenticate scope={['identify', 'guilds']}>
 * ```
 */
export default function App() {
	return (
		<DiscordContextProvider authenticate scope={['identify', 'guilds']} loadingScreen={<LoadingScreen />}>
			<SyncContextProvider loadingScreen={<LoadingScreen />}>
				<Activity />
			</SyncContextProvider>
		</DiscordContextProvider>
	)
}

function LoadingScreen() {
	return (
		<div className="flex h-dvh place-items-center justify-center bg-white text-5xl font-bold text-black dark:bg-black dark:text-white">
			Loading...
		</div>
	)
}
