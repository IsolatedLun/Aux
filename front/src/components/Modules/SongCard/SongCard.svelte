<script lang='ts'>
	import { ICON_EYE } from '../../../consts/icons';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
    import Flex  from '../../Box/Flex/Flex.svelte'
    import Icon  from '../../Modules/Icon/Icon.svelte'

    let css = cubeCss({});

    let _combinedCss = css.combine({
        blockClass: 'song-card',
        utilClass: 'pos-relative'
    })
</script>

<Flex useColumn={true} cls={cubeCss(_combinedCss)}>
    <div class="[ card__img-container ] [ pos-relative overflow-hidden border-radius-bevelled ]">
        <button class="[ card__play-btn ] [ pos-absolute ]">Play</button>
        <img src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*" alt="" />
    </div>

    <p>End of the world</p>
    <Flex cls={cubeCss({utilClass: 'width-100'})} align='center' justify='space-between'>
        <Flex>
            <Icon cls={cubeCss({utilClass: 'fs-350 clr-text-muted'})}>{ICON_EYE}</Icon>
            <p class="[ fs-350 clr-text-muted ]">123.9k</p>
        </Flex>
        <div class="[ card__profile-container ]">
            <img src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*" alt="" />
        </div>
    </Flex>
</Flex>