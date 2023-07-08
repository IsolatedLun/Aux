<script lang='ts'>
	import { page } from "$app/stores";
	import Paginator from "../../../components/Layout/Paginator/Paginator.svelte";
	import SongContainer from "../../../components/Layout/SongContainer/SongContainer.svelte";
	import SongCard from "../../../components/Modules/SongCard/SongCard.svelte";
	import { PAGINATED_USER_SONG_URL } from "../../../consts";

    let id = Number($page.url.toString().split('/').at(-1));
</script>

<div class="[ margin-block-end-4 ]">
	<SongContainer>
        <Paginator
            urlFn={PAGINATED_USER_SONG_URL(1, id)}
            component={SongCard}
            componentContainer={SongContainer}
        />
    </SongContainer>
</div>