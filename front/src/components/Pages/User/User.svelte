<script lang='ts'>
	import { BACKEND_URL, PAGINATED_USER_SONG_URL } from "../../../consts";
	import { ICON_ERROR } from "../../../consts/icons";
	import { fetchUser } from "../../../services/auth/authService";
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";
	import Flex from "../../Box/Flex/Flex.svelte";
	import Grid from "../../Box/Grid/Grid.svelte";
	import Paginator from "../../Layout/Paginator/Paginator.svelte";
	import SongContainer from "../../Layout/SongContainer/SongContainer.svelte";
	import type { SongOrderTypes } from "../../Layout/SongContainer/types";
	import Card from "../../Modules/Card/Card.svelte";
	import Icon from "../../Modules/Icon/Icon.svelte";
	import Button from "../../Modules/Interactible/Button/Button.svelte";
	import UserProfile from "../../Modules/Profile/UserProfile.svelte";
	import SongCard from "../../Modules/SongCard/SongCard.svelte";

    export let id: number;

    let orderBy: SongOrderTypes = 'date_created';
</script>

{#await fetchUser(id) then data}
    <Flex cls={cubeCss({blockClass: 'user'})} useColumn={true} align='center'>
        <UserProfile user={data} variant='large' />
        <h2>{data.username}</h2>
    </Flex>
    <div class="[ margin-block-4 ]">
        <SongContainer on:select={(e) => orderBy = e.detail.value}>
            {#key orderBy}
                <Paginator
                    urlFn={PAGINATED_USER_SONG_URL(1, id, orderBy)}
                    component={SongCard}
                />
            {/key}
        </SongContainer>
    </div>

    {:catch}
        <Grid cls={cubeCss({utilClass: 'width-100'})} align='center' gap={3}>
            <Card padding={2} variant='error'>
                <Flex align='center' gap={2}>
                    <Icon cls={cubeCss({utilClass: 'clr-misc-error'})} ariaLabel=''>{ICON_ERROR}</Icon>
                    <p>User not found.</p>
                </Flex>
            </Card>
            <Button variant='secondary' to='/'>Go back</Button>
        </Grid>
{/await}