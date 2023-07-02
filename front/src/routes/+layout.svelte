<script>
	import { onMount } from "svelte";
	import MusicPlayer from "../components/Layout/MusicPlayer/MusicPlayer.svelte";
    import PrimaryNavbar from "../components/Layout/Navbar/PrimaryNavbar.svelte";
	import { getTokensFromLocalStorage } from "../utils/tokenHandler";
	import { authenticate } from "../services/auth/authService";
	import { authStore } from "../stores/authStore";

    onMount(() => {
        const tokens = getTokensFromLocalStorage();
        if(tokens) {
            authenticate().then(res => authStore.login(res));
        }
    })
</script>

<PrimaryNavbar />
<main class="[ main-container ]">
    <slot />
</main>
<MusicPlayer />

<style>
    @import url('../../static/posty.css');
</style>