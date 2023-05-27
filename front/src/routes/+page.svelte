<script>
	import SongCard from "../components/Modules/SongCard/SongCard.svelte";
    import Grid from '../components/Box/Grid/Grid.svelte';
	import { cubeCss } from "../utils/cubeCss/cubeCss";
	import SongContainer from "../components/Layout/SongContainer/SongContainer.svelte";
	import { createDefaultSongCard } from "../utils/defaultCreates";
</script>

<SongContainer songs={[createDefaultSongCard(), createDefaultSongCard(), createDefaultSongCard(), createDefaultSongCard()]} />
