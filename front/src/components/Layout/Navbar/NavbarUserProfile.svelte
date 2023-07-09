<script lang='ts'>
	import { createEventDispatcher } from "svelte";
	import { BACKEND_URL, WEB_USER_PROFILE_URL } from "../../../consts";
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";
	import { createDefaultUser } from "../../../utils/defaultCreates";
	import Flex from "../../Box/Flex/Flex.svelte";
	import Button from "../../Modules/Interactible/Button/Button.svelte";
	import { authStore } from "../../../stores/authStore";
	import UserProfile from "../../Modules/Profile/UserProfile.svelte";

    const dispatch = createEventDispatcher();

	const userId = $authStore.user!.id;
</script>

{#if $authStore.user}
	<a class="[ primary-navbar-user ]" href="{WEB_USER_PROFILE_URL(userId)}" data-desktop='true'>
		<Button on:click={() => dispatch('click')} attachments={['transparent', 'small-pad']}>
			<UserProfile user={$authStore.user} />
		</Button>
	</a>
{/if}