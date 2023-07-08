<script lang="ts">
	import SongCard from '../components/Modules/SongCard/SongCard.svelte';
	import SongContainer from '../components/Layout/SongContainer/SongContainer.svelte';
	import Paginator from '../components/Layout/Paginator/Paginator.svelte';
	import { BACKEND_URL, PAGINATED_SONG_URL } from '../consts';
	import { songStore } from '../stores/songStore';
</script>

<title>Aux | Home</title>
<div class="[ margin-block-end-4 ]">
	<SongContainer>
		<Paginator
			urlFn={PAGINATED_SONG_URL}
			component={SongCard}
			componentContainer={SongContainer}
		/>
	</SongContainer>
</div>
