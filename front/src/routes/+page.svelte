<script lang="ts">
	import SongCard from '../components/Modules/SongCard/SongCard.svelte';
	import SongContainer from '../components/Layout/SongContainer/SongContainer.svelte';
	import Paginator from '../components/Layout/Paginator/Paginator.svelte';
	import { PAGINATED_SONG_URL } from '../consts';
	import type { SongOrderTypes } from '../components/Layout/SongContainer/types';

	let orderBy: SongOrderTypes = 'date_created';
</script>

<title>Aux | Home</title>
<div class="[ margin-block-end-4 ]">
	<SongContainer on:select={(e) => orderBy = e.detail.value}>
		{#key orderBy}
			<Paginator
				urlFn={PAGINATED_SONG_URL(1, orderBy)}
				component={SongCard}
			/>
		{/key}
	</SongContainer>
</div>
