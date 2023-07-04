<script lang='ts'>
	import { createEventDispatcher } from "svelte";
	import { BACKEND_URL, WEB_USER_PROFILE_URL } from "../../../consts";
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";
	import { createDefaultUser } from "../../../utils/defaultCreates";
	import Flex from "../../Box/Flex/Flex.svelte";
	import Button from "../../Modules/Interactible/Button/Button.svelte";
	import { authStore } from "../../../stores/authStore";

    const dispatch = createEventDispatcher();

	const userId = $authStore.user!.id;
</script>

<a class="[ primary-navbar-user ]" href="{WEB_USER_PROFILE_URL(userId)}">
    <Button on:click={() => dispatch('click')} attachments={['transparent', 'small-pad']}>
        <div class="[ navbar__user-profile ] [ border-radius-max ] [ pointers-none ]">
            <img src="{BACKEND_URL}{$authStore.user?.profile}" alt="Your profile" />
        </div>
    </Button>
</a>