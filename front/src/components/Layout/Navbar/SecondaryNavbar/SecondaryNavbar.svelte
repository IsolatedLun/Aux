<script lang='ts'>
	import { createEventDispatcher, onMount } from 'svelte';
	import {
	ICON_HISTORY,
	ICON_HOME,
		ICON_QUESTION_CIRCLE,
		ICON_SETTINGS,
		ICON_SIGN_IN,
		ICON_SIGN_OUT,
		ICON_TIMES,
		ICON_UPLOAD,
		ICON_USER
	} from '../../../../consts/icons';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';

	import Flex from '../../../Box/Flex/Flex.svelte';
	import Icon from '../../../Modules/Icon/Icon.svelte';
	import Button from '../../../Modules/Interactible/Button/Button.svelte';
	import SecondaryNavbarItem from './SecondaryNavbarItem.svelte';
	import { authStore } from '../../../../stores/authStore';
	import { goto } from '$app/navigation';
	import { WEB_AUTH_LOGIN_URL, WEB_AUTH_SIGNUP_URL, WEB_HISTORY_URL, WEB_USER_PROFILE_URL } from '../../../../consts';

	onMount(() => {
		const observer = new MutationObserver(() => {
			if (currentLocation !== document.location.href) {
				currentLocation = document.location.href;
				dispatch('close');
			}
		})

		// observer.observe(document.querySelector('html') as HTMLElement);
	})

	function handleLogout() {
		authStore.logout();

		dispatch('close');
		goto(WEB_AUTH_LOGIN_URL);
	}

	export let expanded = false;

	let currentLocation = '';

	const dispatch = createEventDispatcher()
</script>

<div class='[ secondary-navbar ] [ pos-fixed padding-2 ]' aria-expanded="{expanded}">
	<Flex
		cls={cubeCss({utilClass: 'height-100'})}
		useColumn={true}
		gap={3}
	>
	
		<Flex cls={cubeCss({ utilClass: 'width-100' })} useColumn={true} tag="ul" align="center">
			{#if $authStore.isLogged}
				<SecondaryNavbarItem
					props={{
						to: 'upload',
						buttonVariant: 'primary',
						icon: ICON_UPLOAD,
						text: 'Upload'
					}}
				/>

				{:else}
				<SecondaryNavbarItem
					props={{
						to: WEB_AUTH_SIGNUP_URL,
						buttonVariant: 'primary',
						icon: ICON_SIGN_IN,
						text: 'Sign up'
					}}
				/>
				<SecondaryNavbarItem
					props={{
						to: WEB_AUTH_LOGIN_URL,
						buttonVariant: 'secondary',
						icon: ICON_SIGN_IN,
						text: 'Log in'
					}}
				/>
			{/if}
		</Flex>
	
		<Flex cls={cubeCss({ utilClass: 'width-100' })} useColumn={true} tag="ul" align="center">
			{#if $authStore.user && $authStore.isLogged}
				<SecondaryNavbarItem
					props={{
						to: WEB_USER_PROFILE_URL($authStore.user.id),
						buttonVariant: 'primary',
						icon: ICON_USER,
						text: 'My profile'
					}}
				/>
				<SecondaryNavbarItem
					props={{
						to: '',
						buttonVariant: 'primary',
						icon: ICON_SETTINGS,
						text: 'Settings'
					}}
				/>
			{/if}

			<Flex
				cls={cubeCss({ utilClass: 'width-100 margin-block-start-2' })}
				useColumn={true}
				tag="ul"
				align="center"
			>
				<SecondaryNavbarItem
					props={{
						to: '/',
						buttonVariant: 'hoverable',
						icon: ICON_HOME,
						text: 'Home'
					}}
				/>
				{#if $authStore.isLogged}
					<SecondaryNavbarItem
						props={{
							to: WEB_HISTORY_URL,
							buttonVariant: 'hoverable',
							icon: ICON_HISTORY,
							text: 'History'
						}}
					/>
				{/if}
			</Flex>
		</Flex>
	
		<Flex
			cls={cubeCss({ utilClass: 'width-100 margin-block-start-auto margin-block-end-3' })}
			useColumn={true}
			tag="ul"
			align="center"
		>
			{#if $authStore.isLogged}
				<SecondaryNavbarItem
					props={{
						action: handleLogout,
						buttonVariant: 'secondary',
						icon: ICON_SIGN_OUT,
						text: 'Log out'
					}}
				/>
			{/if}
			<SecondaryNavbarItem
				props={{
					to: '',
					buttonVariant: 'secondary',
					icon: ICON_QUESTION_CIRCLE,
					text: 'Help'
				}}
			/>
		</Flex>
	
		<Button
			on:click={() => dispatch('close')}
			variant="error"
			cls={cubeCss({ utilClass: 'width-100 margin-block-end-1' })}
			attachments={['grow', 'capsule']}
			use={(el) => el.setAttribute('data-mobile', String(true))}
		>
			<Icon ariaLabel="Close">{ICON_TIMES}</Icon>
		</Button>
	</Flex>
</div>
