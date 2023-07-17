<script lang='ts'>
	import { goto } from "$app/navigation";
	import { WEB_AUTH_LOGIN_URL, WEB_USER_PROFILE_URL } from "../../../consts";
	import { ICON_EYE, ICON_EYE_CROSSED } from "../../../consts/icons";
	import { deleteUser, saveUser } from "../../../services/auth/authService";
	import { authStore } from "../../../stores/authStore";
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";
	import Flex from "../../Box/Flex/Flex.svelte";
    import Card from "../../Modules/Card/Card.svelte";
	import Button from "../../Modules/Interactible/Button/Button.svelte";
	import FileInput from "../../Modules/Interactible/Input/FileInput.svelte";
	import TextInput from "../../Modules/Interactible/Input/TextInput.svelte";
	import { togglePasswordInput } from "../../Modules/Interactible/Input/utils";
	import UserProfile from "../../Modules/Profile/UserProfile.svelte";
	import type { EditUserForm } from "./types";

    function handleDeleteUser() {
        deleteUser()
        .finally(() => {
            authStore.logout();
            goto('/');
        })
    }

    function handleSaveUser() {
        saveUser(editForm)
            .then((user) => {
                authStore.setUser(user);
                goto(WEB_USER_PROFILE_URL($authStore.user!.id));
            })
            .catch() // ...
    }

    let editForm: EditUserForm = {
        username: $authStore.user!.username,
        newPassword: '',
        profile: null
    }
    let profilePreview = '';
    let showPassword = false;
</script>

{#if $authStore.user}
    <Card padding={2}>
        <Flex useColumn={true} align='center' gap={5} collapseOnMobile={true} alignCenterOnMobile={true}>
            <Flex useColumn={true} align='center'>
                <UserProfile variant='large' user={$authStore.user} />
                <h2>{editForm.username}</h2>
            </Flex>
            <Flex useColumn={true} gap={2}>
                <TextInput
                    bind:value={editForm.username}
                    label="Username"
                    placeholder="Enter username"
                    showLabel={true}
                />
                <TextInput
                    bind:value={editForm.newPassword}
                    label="New password"
                    placeholder="Enter new password"
                    showLabel={true}
                    on:endButtonClick={(e) => showPassword = togglePasswordInput(e.detail)}
                    endIcon={showPassword ? ICON_EYE_CROSSED : ICON_EYE}
                />
                <FileInput
                    fileType="image"
                    variant="compact"
                    on:file={(e) => (editForm.profile = e.detail)}
                    on:preview={(e) => (profilePreview = e.detail)}
                />
            </Flex>
        </Flex>
    </Card>

    <Flex cls={cubeCss({utilClass: 'width-100 margin-block-start-2 margin-block-end-6'})}>
        <Flex gap={2}>
            <Button on:click={handleSaveUser} variant='secondary' attachments={['capsule']}>Save account</Button>
            <Button on:click={handleDeleteUser} variant='error' attachments={['capsule']}>Delete account</Button>
        </Flex>
        <Button to={WEB_USER_PROFILE_URL($authStore.user.id)} variant='hoverable' attachments={['capsule']}>Cancel</Button>
    </Flex>
{/if}