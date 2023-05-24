<script>
	import SongCard from "../components/Modules/SongCard/SongCard.svelte";
    import Grid from '../components/Box/Grid/Grid.svelte';
	import { cubeCss } from "../utils/cubeCss/cubeCss";
</script>

<Grid cls={cubeCss({blockClass: 'song-card-container', utilClass: 'margin-block-2'})} gap={2}>
    <SongCard />
    <SongCard />
    <SongCard />
    <SongCard />
    <SongCard />
    <SongCard />
    <SongCard />
</Grid>
