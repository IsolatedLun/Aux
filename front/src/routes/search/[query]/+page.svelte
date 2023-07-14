<script lang='ts'>
	import { page } from "$app/stores";
	import Paginator from "../../../components/Layout/Paginator/Paginator.svelte";
	import SongContainer from "../../../components/Layout/SongContainer/SongContainer.svelte";
	import type { SongOrderTypes } from "../../../components/Layout/SongContainer/types";
	import SongCard from "../../../components/Modules/SongCard/SongCard.svelte";
	import { PAGINATED_SEARCH_SONG_URL } from "../../../consts";

    let orderBy: SongOrderTypes = '-date_created';
    let results_length = 0;
</script>

{#key $page.params}
    <div class="[ margin-block-end-4 ]">
        {#if $page.params['query'] === '*'}
            <h2>Start searching!</h2>
            {:else}
            <h2>
                <span class="[ clr-text-muted ]">{results_length}</span> 
                <span>Search result(s) for</span>
                <span class="[ clr-text-muted ]">"{$page.params['query']}"</span>
            </h2>
        {/if}
        <SongContainer
            on:select={(e) => (orderBy = e.detail.value)}
        >
            {#key orderBy}
                {#if $page.params['query'] !== '*'}
                    <Paginator
                        on:update={(e) => results_length = e.detail.length}
                        urlFn={PAGINATED_SEARCH_SONG_URL(1, $page.params['query'])}
                        component={SongCard}
                    />
                {/if}
            {/key}
        </SongContainer>
    </div>
{/key}
