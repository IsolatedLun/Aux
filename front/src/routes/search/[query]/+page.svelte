<script lang='ts'>
	import { page } from "$app/stores";
	import Paginator from "../../../components/Layout/Paginator/Paginator.svelte";
	import SongContainer from "../../../components/Layout/SongContainer/SongContainer.svelte";
	import type { SongOrderTypes } from "../../../components/Layout/SongContainer/types";
	import SongCard from "../../../components/Modules/SongCard/SongCard.svelte";
	import { PAGINATED_SEARCH_SONG_URL } from "../../../consts";

    let orderBy: SongOrderTypes = '-date_created';
</script>

{#key $page.params}
    <div class="[ margin-block-end-4 ]">
        <h2>Search results for "{$page.params['query']}"</h2>
        <SongContainer
            on:select={(e) => (orderBy = e.detail.value)}
        >
            {#key orderBy}
                <Paginator
                    urlFn={PAGINATED_SEARCH_SONG_URL(1, $page.params['query'])}
                    component={SongCard}
                />
            {/key}
        </SongContainer>
    </div>
{/key}
