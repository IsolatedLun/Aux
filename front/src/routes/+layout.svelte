<script>
	import MusicPlayer from "../components/Layout/MusicPlayer/MusicPlayer.svelte";
import PrimaryNavbar from "../components/Layout/Navbar/PrimaryNavbar.svelte";

</script>

<PrimaryNavbar />
<main class="[ main-container ]">
    <slot />
</main>
<MusicPlayer />

<style>
    @import url('../../static/posty.css');
</style>