<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';

	import { Spinner } from '$lib/components/ui/spinner/index';
	import * as Item from '$lib/components/ui/item/index';
	import * as Card from '$lib/components/ui/card/index';
	import { RiErrorWarningLine } from 'remixicon-svelte';

	import { discordSdkReady } from '$lib/discordSdk';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
{#await discordSdkReady}
	<div class="w-dvw h-dvh flex place-content-center place-items-center">
		<Item.Root variant="muted" class="max-w-sm">
			<Item.Media>
				<Spinner />
			</Item.Media>
			<Item.Content>
				<Item.Title class="line-clamp-1">Loading Discord...</Item.Title>
			</Item.Content>
		</Item.Root>
	</div>
{:then}
	{@render children()}
{:catch err}
	<div class="w-dvw h-dvh flex place-content-center place-items-center">
		<Card.Root class="max-w-sm w-full">
			<Card.Header>
				<Card.Title class="flex"
					><RiErrorWarningLine class="size-5 fill-red-500 mr-2" />Error
					initializing Discord!</Card.Title
				>
				<Card.Description
					>Make sure to allow the auth prompt. Relaunch the activity to retry.</Card.Description
				>
			</Card.Header>
			<Card.Footer>
				<p>{err}</p>
			</Card.Footer>
		</Card.Root>
	</div>
{/await}
