<script>
	import PrimaryNavbar from "../components/Layout/PrimaryNavbar.svelte";

</script>

<PrimaryNavbar />
<main class="[ main-container ]">
    <slot />
</main>

<style>
    @import url('../../static/posty.css');
</style>