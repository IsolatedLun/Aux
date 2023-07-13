<script lang="ts">
	import { PAGINATED_SONG_URL, PAGINATED_USER_HISTORY_SONG_URL } from '../../../consts';
	import { authStore } from '../../../stores/authStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Paginator from '../../Layout/Paginator/Paginator.svelte';
	import SongContainer from '../../Layout/SongContainer/SongContainer.svelte';
	import type { SongOrderTypes } from '../../Layout/SongContainer/types';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';

	let orderBy: SongOrderTypes = '-views';
	let searchText = '';
</script>

{#if $authStore.isLogged}
	<div class="[ margin-block-end-4 ]">
		<SongContainer
			on:select={(e) => (orderBy = e.detail.value)}
			on:search={(e) => (searchText = e.detail)}
			searchMode={true}
			hideOrderBy={true}
		>
			{#key [orderBy, searchText]}
                <Paginator
                    includeAuthHeader={true}
                    urlFn={PAGINATED_USER_HISTORY_SONG_URL(1, searchText ? searchText : '*')}
                    component={SongCard}
                />
			{/key}
		</SongContainer>
	</div>
{/if}
