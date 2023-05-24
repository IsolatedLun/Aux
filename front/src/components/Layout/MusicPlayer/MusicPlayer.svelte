<script lang='ts'>
	import { ICON_CARET_LEFT, ICON_CARET_RIGHT, ICON_GRIP, ICON_PLAY } from "../../../consts/icons";
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";
	import Flex from "../../Box/Flex/Flex.svelte";
	import Icon from "../../Modules/Icon/Icon.svelte";
	import Button from "../../Modules/Interactible/Button/Button.svelte";


</script>

<div class="[ music-player ] [ pos-fixed border-radius-bevelled ]">
    <Flex cls={cubeCss({blockClass: 'music-player-inner'})} useColumn={true} align='center'>
        <Flex useColumn={true} gap={1} align='center'>
            <Button attachments={['transparent', 'tiny-pad']}>
                <Icon ariaLabel=''>{ICON_GRIP}</Icon>
            </Button>
            <div class="[ player__thumbnail ] [ border-radius-bevelled ]">
                <img src="https://i.ytimg.com/vi/FumQefCcn3s/hqdefault.jpg?sqp=-oaymwE2COADEI4CSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBzgWAAtAFigIMCAAQARhlIEIoTTAP&rs=AOn4CLCAVOl5_h0gv5zpx0X4qhitN-t-ag" alt="" />
            </div>
        </Flex>
        <p class="[ text-ellipsis-2 ]">End of the world</p>
        <Flex cls={cubeCss({blockClass: 'player__time-controls'})} useColumn={true} gap={0}>
            <div class="[ player__bar ] [ width-100 ]">
                <input class="[ width-100 ]" type="range" min="0" max="1213241" step="1" />
            </div>
            <Flex cls={cubeCss({utilClass: 'width-100'})} justify='space-between'>
                <p class="[ fs-300 ]">00:00</p>
                <p class="[ fs-300 ]">00:00</p>
            </Flex>
        </Flex>
        <Flex cls={cubeCss({utilClass: 'width-100'})} align='center' gap={1} justify='space-between'>
            <Button cls={cubeCss({blockClass: 'fs-500'})} attachments={['transparent', 'small-pad']}>
                <Icon ariaLabel='Previous'>{ICON_CARET_LEFT}</Icon>
            </Button>
            <Button cls={cubeCss({blockClass: 'fs-500'})} attachments={['hologram', 'capsule', 'big-pad']}>
                <Icon ariaLabel='Play'>{ICON_PLAY}</Icon>
            </Button>
            <Button cls={cubeCss({blockClass: 'fs-500'})} attachments={['transparent', 'small-pad']}>
                <Icon ariaLabel='Next'>{ICON_CARET_RIGHT}</Icon>
            </Button>
        </Flex>
    </Flex>

    <audio src=""></audio>
</div>