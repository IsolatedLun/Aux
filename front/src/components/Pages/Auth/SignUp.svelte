<script lang="ts">
	import { goto } from '$app/navigation';
	import { WEB_AUTH_LOGIN_URL } from '../../../consts';
	import { ICON_EYE } from '../../../consts/icons';
	import { register } from '../../../services/auth/authService';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Form from '../../Modules/Form/Form.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import FileInput from '../../Modules/Interactible/Input/FileInput.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import type { SignUpForm } from './types';

    function handleSignUp() {
        register(signUpForm)
            .then(() => goto(WEB_AUTH_LOGIN_URL))
            .catch(err => formError = err);
    }

	let signUpForm: SignUpForm = {
		emailAddress: '',
		username: '',
		password: '',
		profile: null
	};
    let formError = '';
</script>

<Form id="signup-form" title='Sign Up' {formError} on:submit={handleSignUp}>
    <Flex cls={cubeCss({ utilClass: 'width-100' })} collapseOnMobile={true}>
        <TextInput
            bind:value={signUpForm.username}
            label="Username"
            placeholder="Enter username"
            showLabel={true}
        />
        <TextInput
            bind:value={signUpForm.emailAddress}
            label="Email Address"
            placeholder="Enter email address"
            showLabel={true}
        />
    </Flex>
    <TextInput
        bind:value={signUpForm.password}
        label="Password"
        placeholder="Enter password"
        showLabel={true}
        endIcon={ICON_EYE}
    />
    <FileInput
        on:input={(e) => (signUpForm.profile = e.detail)}
        cls={cubeCss({ utilClass: 'margin-block-2' })}
        fileType="image"
        variant="compact"
    />
    <Button isSubmit={true}>Sign up</Button>
    <a href={WEB_AUTH_LOGIN_URL}>Already have an account?</a>
</Form>
