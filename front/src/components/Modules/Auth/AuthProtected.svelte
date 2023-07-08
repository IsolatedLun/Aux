<script lang='ts'>
	import { onMount } from "svelte";
	import { authStore } from "../../../stores/authStore";
	import { goto } from "$app/navigation";
	import { WEB_AUTH_LOGIN_URL } from "../../../consts";

    onMount(() => {
        if(!$authStore.isLogged)
            goto(WEB_AUTH_LOGIN_URL);
    })
</script>

<slot />