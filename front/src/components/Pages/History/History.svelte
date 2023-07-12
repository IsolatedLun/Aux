<script lang='ts'>
	import { PAGINATED_SONG_URL } from "../../../consts";
	import Paginator from "../../Layout/Paginator/Paginator.svelte";
	import SongContainer from "../../Layout/SongContainer/SongContainer.svelte";
	import type { SongOrderTypes } from "../../Layout/SongContainer/types";
	import SongCard from "../../Modules/SongCard/SongCard.svelte";

    let orderBy: SongOrderTypes = '-views';
</script>

<SongContainer on:select={(e) => orderBy = e.detail.value} searchMode={true}>
    {#key orderBy}
        <Paginator
            urlFn={PAGINATED_SONG_URL(1, orderBy)}
            component={SongCard}
        />
    {/key}
</SongContainer>