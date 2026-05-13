<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';

	import { getChannelName } from '$lib/discordSdk';
	let channelName = $state('Unknown');
	getChannelName().then((channel) => (channelName = channel));
</script>

<div class="w-dvw h-dvh flex place-items-center place-content-center">
	<Card.Root class="maw-w-sm">
		<Card.Header>
			<Card.Title>Welcome to {channelName}</Card.Title>
		</Card.Header>
		<Card.Content>
			Visit <Button href="https://svelte.dev/docs/kit"
				>svelte.dev/docs/kit</Button
			> to read the documentation
		</Card.Content>
	</Card.Root>
</div>
