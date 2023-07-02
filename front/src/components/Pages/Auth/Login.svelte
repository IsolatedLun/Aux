<script lang="ts">
	import { goto } from '$app/navigation';
	import { WEB_AUTH_SIGNUP_URL } from '../../../consts';
	import { ICON_EYE } from '../../../consts/icons';
	import { login } from '../../../services/auth/authService';
	import type { LoginResponse } from '../../../services/auth/types';
	import { authStore } from '../../../stores/authStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Card from '../../Modules/Card/Card.svelte';
	import Form from '../../Modules/Form/Form.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import CheckboxInput from '../../Modules/Interactible/Input/CheckboxInput.svelte';
	import FileInput from '../../Modules/Interactible/Input/FileInput.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import type { LoginForm } from './types';

    function handleFormSubmit() {
        login(loginForm)
            .then(handleLogin)
            .catch(err => formError = err);
    }

    function handleLogin(data: LoginResponse) {
		if(remember)
			authStore.setTokens(data.tokens);
        authStore.login(data.user);

        goto('/');
    }

    let formError = '';
	let remember = false;

	const loginForm: LoginForm = {
		emailAddress: '',
		password: ''
	};
</script>

<Form id="signup-form" title='Log In' {formError} on:submit={handleFormSubmit}>
	<TextInput
		bind:value={loginForm.emailAddress}
		label="Email Address"
		placeholder="Enter email address"
		showLabel={true}
	/>
	<TextInput
		bind:value={loginForm.password}
		label="Password"
		placeholder="Enter password"
		showLabel={true}
		endIcon={ICON_EYE}
	/>
	<CheckboxInput label='Remember me?' bind:bool={remember} />
	<Button isSubmit={true}>Log in</Button>
	<a href={WEB_AUTH_SIGNUP_URL}>Don't have an account?</a>
</Form>
