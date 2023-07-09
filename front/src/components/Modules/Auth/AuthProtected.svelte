<script lang='ts'>
	import { onMount } from "svelte";
	import { authStore } from "../../../stores/authStore";
	import { goto } from "$app/navigation";
	import { WEB_AUTH_LOGIN_URL, WEB_AUTH_SIGNUP_URL } from "../../../consts";
	import Grid from "../../Box/Grid/Grid.svelte";
	import Card from "../Card/Card.svelte";
	import Flex from "../../Box/Flex/Flex.svelte";
	import Button from "../Interactible/Button/Button.svelte";

    // I realized that I can just use {#if $authStore.authResult === 'success'}
    // But it was already too late.
    onMount(() => {
        authLock = new Promise((resolve, reject) => {
            const reCheck = () => {
                if($authStore.authResult === 'success')
                    return resolve(true)
                else if ($authStore.authResult === 'failure')
                    return reject(false)

                setTimeout(reCheck, 100);
            }

            reCheck();
        })
    })

    let authLock: Promise<boolean>;
</script>

{#await authLock}
    <Grid align='center'>
        <Card variant='primary'>
            <p>Authenticating...</p>
        </Card>
    </Grid>
    {:then _}
        {#if $authStore.authResult === 'success'}
            <slot />
        {/if}
    {:catch _}
    <Grid align='center' gap={2}>
        <Card variant='error'>
            <p>You must be logged in.</p>
        </Card>
        <Flex>
            <Button variant='secondary' to={WEB_AUTH_LOGIN_URL}>Log in</Button>
            <Button to={WEB_AUTH_SIGNUP_URL}>Sign up</Button>
        </Flex>
    </Grid>
{/await}