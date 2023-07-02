<script lang="ts">
	import { WEB_AUTH_LOGIN_URL, WEB_AUTH_SIGNUP_URL } from '../../../consts';
	import { ICON_SEARCH } from '../../../consts/icons';
	import { authStore } from '../../../stores/authStore';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import NavbarUserProfile from './NavbarUserProfile.svelte';
	import SecondaryNavbar from './SecondaryNavbar/SecondaryNavbar.svelte';

	export let secondaryNavbarExpanded = false;
</script>

<nav class="[ primary-navbar ] [ margin-block-end-2 ]">
	<Flex align="center" justify="space-between">
		<h1 class="[ fw-bold ]">
			<a href="/">Aux</a>
		</h1>
		<TextInput
			label="Search songs"
			placeholder="Search songs..."
			attachments={['border-bottom', 'shadow-none', 'transparent', 'border-neutral']}
			endIcon={ICON_SEARCH}
		/>
		
		{#if $authStore.isLogged}
			<NavbarUserProfile on:click={() => secondaryNavbarExpanded = true} />
			{:else}
			<Flex gap={2}>
				<Button to={WEB_AUTH_SIGNUP_URL}>Sign up</Button>
				<Button to={WEB_AUTH_LOGIN_URL} variant='secondary'>Log in</Button>
			</Flex>
		{/if}
	</Flex>
</nav>

<SecondaryNavbar on:close={() => secondaryNavbarExpanded = false} expanded={secondaryNavbarExpanded} />
