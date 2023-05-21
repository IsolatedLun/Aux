<script>
	import SongCard from "../components/Modules/SongCard/SongCard.svelte";
    import Grid from '../components/Box/Grid/Grid.svelte';
	import { cubeCss } from "../utils/cubeCss/cubeCss";
</script>

<h1>Top songs</h1>
<Grid cls={cubeCss({blockClass: 'song-card-container'})} gap={2}>
    <SongCard />
    <SongCard />
    <SongCard />
    <SongCard />
    <SongCard />
    <SongCard />
    <SongCard />
</Grid>
