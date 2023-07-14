<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { WEB_AUTH_LOGIN_URL, WEB_AUTH_SIGNUP_URL, WEB_SEARCH_SONG_URL } from '../../../consts';
	import { ICON_BARS, ICON_SEARCH } from '../../../consts/icons';
	import { authStore } from '../../../stores/authStore';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import NavbarUserProfile from './NavbarUserProfile.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import { goto } from '$app/navigation';

	let searchText: string = '';
	const dispatch = createEventDispatcher();
</script>

<nav class="[ primary-navbar ] [ margin-block-end-2 ]">
	<Flex align="center" justify="space-between">
		<h1 class="[ fw-bold ]">
			<a href="/">Aux</a>
		</h1>
		<TextInput
			on:enter={() => goto(WEB_SEARCH_SONG_URL(searchText))}
			bind:value={searchText}
			label="Search songs"
			placeholder="Search songs..."
			attachments={['border-bottom', 'shadow-none', 'transparent', 'border-neutral']}
			endIcon={ICON_SEARCH}
			on:endButtonClick={() => goto(WEB_SEARCH_SONG_URL(searchText))}
		/>

		<Flex align="center" gap={2}>
			{#if $authStore.isLogged}
				<NavbarUserProfile />
			{:else}
				<Flex gap={2}>
					<Button to={WEB_AUTH_SIGNUP_URL}>Sign up</Button>
					<Button to={WEB_AUTH_LOGIN_URL} variant="secondary">Log in</Button>
				</Flex>
			{/if}

			<Button
				use={(el) => el.setAttribute('data-mobile', String(true))}
				on:click={() => dispatch('secondaryOpen')}
				variant="hoverable"
				attachments={['capsule']}
			>
				<Icon ariaLabel="More options">{ICON_BARS}</Icon>
			</Button>
		</Flex>
	</Flex>
</nav>
