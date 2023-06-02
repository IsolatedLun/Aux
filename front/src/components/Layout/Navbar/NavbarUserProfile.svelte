<script lang='ts'>
	import { BACKEND_URL } from "../../../consts";
	import { createDefaultUser } from "../../../utils/defaultCreates";
	import Flex from "../../Box/Flex/Flex.svelte";
	import Button from "../../Modules/Interactible/Button/Button.svelte";


</script>

<div class="[ primary-navbar-user ]">
    <Button attachments={['hologram']}>
        <Flex align='center'>
            <div class="[ navbar__user-profile ] [ border-radius-max ] [ pointers-none ]">
                <img src="{BACKEND_URL}{createDefaultUser().profile}" alt="Your profile" />
            </div>
            <p>IsolatedGamer</p>
        </Flex>
    </Button>
</div>