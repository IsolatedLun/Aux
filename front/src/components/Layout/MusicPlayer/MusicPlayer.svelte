<script lang="ts">
	import {
		ICON_CARET_LEFT,
		ICON_CARET_RIGHT,
		ICON_ELLIPSIS_V,
		ICON_FAST_LEFT,
		ICON_FAST_RIGHT,
		ICON_GRIP,
		ICON_PLAY,
		ICON_SAVE
	} from '../../../consts/icons';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import SongContainer from '../SongContainer/SongContainer.svelte';

	let expanded = false;
</script>

<div class="[ music-player ] [ grid pos-fixed ]" data-expanded={expanded}>
	<Button
		on:click={() => (expanded = !expanded)}
		cls={cubeCss({ blockClass: 'player__close-btn' })}
		attachments={['flat']}
	>
		<Icon ariaLabel="">{ICON_GRIP}</Icon>
	</Button>

	<section class="[ player__info ]">
		<div class="[ info__wrapper ] [ grid place-items-center margin-block-auto height-100 ]">
			<Flex cls={cubeCss({ blockClass: 'info__content' })} useColumn={true} align="center">
				<div class="[ music__thumbnail ]">
					<img
						src="https://hips.hearstapps.com/hmg-prod/images/domestic-cat-lies-in-a-basket-with-a-knitted-royalty-free-image-1592337336.jpg?crop=0.668xw:1.00xh;0.247xw,0&resize=1200:*"
						alt="A cat"
					/>
				</div>
				<div class="[ text-align-center ]">
					<h2>End of the world</h2>
					<p class="[ fs-350 clr-text-muted ]">FORGOTTENAGE</p>
				</div>
			</Flex>
		</div>
	</section>

	<section class="[ player__other ] [ padding-2 overflow-y-auto ]">
		<SongContainer songs={[createDefaultSongCard()]} />
	</section>

	<section class="[ player__bar-container ] [ pos-relative ]">
		<input class="[ bar ] [ pos-absolute width-100 ]" type="range" />
		<Flex align="center" justify="start">
			<Flex cls={cubeCss({ utilClass: 'padding-2' })} align="center" justify="start" gap={3}>
				<Button cls={cubeCss({ utilClass: 'fs-400' })}>
					<Icon ariaLabel="">{ICON_FAST_LEFT}</Icon>
				</Button>
				<Button
					cls={cubeCss({ utilClass: 'fs-500' })}
					attachments={['hologram', 'capsule', 'big-pad']}
				>
					<Icon ariaLabel="">{ICON_PLAY}</Icon>
				</Button>
				<Button cls={cubeCss({ utilClass: 'fs-400' })}>
					<Icon ariaLabel="">{ICON_FAST_RIGHT}</Icon>
				</Button>
			</Flex>
			<p class="[ fs-350 ]">00:00</p>
			<p class="[ clr-text-muted ]">|</p>
			<p class="[ fs-350 ]">00:00</p>
		</Flex>
	</section>
</div>
