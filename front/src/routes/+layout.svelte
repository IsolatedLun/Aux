<script>
	import { onMount } from "svelte";
	import MusicPlayer from "../components/Layout/MusicPlayer/MusicPlayer.svelte";
    import PrimaryNavbar from "../components/Layout/Navbar/PrimaryNavbar.svelte";
	import { getTokensFromLocalStorage } from "../utils/tokenHandler";
	import { authenticate } from "../services/auth/authService";
	import { authStore } from "../stores/authStore";
	import Flex from "../components/Box/Flex/Flex.svelte";
	import Button from "../components/Modules/Interactible/Button/Button.svelte";
	import { cubeCss } from "../utils/cubeCss/cubeCss";
	import SecondaryNavbar from "../components/Layout/Navbar/SecondaryNavbar/SecondaryNavbar.svelte";

    onMount(() => {
        const tokens = getTokensFromLocalStorage();
        if(tokens) {
            authenticate().then(res => authStore.login(res));
        }
    })

    let secondaryNavbarExpanded = false;
</script>


<main class="[ main-container ]">
    <PrimaryNavbar on:secondaryOpen={() => secondaryNavbarExpanded = true} />
    <slot />
</main>
<MusicPlayer />

<SecondaryNavbar
	on:close={() => (secondaryNavbarExpanded = false)}
	expanded={secondaryNavbarExpanded}
/>

<style>
    @import url('../../static/posty.css');
</style>