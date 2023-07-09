<script lang='ts'>
	import { BACKEND_URL } from "../../../consts";
	import type { Props_User } from "../../../types";
	import type { UserProfileVariants } from "./types";

    export let user: Props_User;
    export let variant: UserProfileVariants = 'default'
</script>

<div class="[ profile ]" data-variant="{variant}">
    <img class="[ border-radius-max ]" src="{BACKEND_URL}{user.profile}" alt="Profile of {user.username}">
</div>