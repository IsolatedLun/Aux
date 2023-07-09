<script lang='ts'>
	import { page } from "$app/stores";
	import User from "../../../components/Pages/User/User.svelte";

    let id = Number($page.url.toString().split('/').at(-1));
</script>

<User {id} />