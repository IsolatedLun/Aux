<script lang="ts">
	import { BACKEND_URL } from '../../../consts';
	import { ICON_EYE, ICON_PLAY } from '../../../consts/icons';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../Interactible/Button/Button.svelte';
	import Numeric from '../Numeric/Numeric.svelte';
	import type { Props_SongCard } from './types';
	
	export let props: Props_SongCard = createDefaultSongCard();
	export let cls = cubeCss({});

	let _combinedCss = cls.combine({
		blockClass: 'song-card',
		utilClass: 'pos-relative'
	});
</script>
<Flex useColumn={true} cls={cubeCss(_combinedCss)}>
	<div
		class="[ card__thumbnail-container ] [ pos-relative overflow-hidden border-radius-bevelled ]"
	>
		<Button
			attachments={['capsule', 'cube', 'huge-pad']}
			cls={cubeCss({ blockClass: 'card__play-btn', utilClass: 'pos-absolute' })}
		>
			<Icon ariaLabel="Play">{ICON_PLAY}</Icon>
		</Button>
		<img
			src="{BACKEND_URL}{props.thumbnail}"
			alt="Thumbnail for {props.title}"
		/>
	</div>

	<p class="[ text-ellipsis-2 ]">{props.title}</p>
	<Flex cls={cubeCss({ utilClass: 'width-100' })} align="center" justify="space-between">
		<Flex>
			<Icon
				ariaLabel="Views"
				cls={cubeCss({ utilClass: 'fs-350 clr-text-muted' })}>{ICON_EYE}</Icon
			>
			<p class="[ fs-350 clr-text-muted ]">
				<Numeric value={props.views} /> <span class="[ visually-hidden ]">views</span>
			</p>
		</Flex>
		<div class="[ card__profile-container ] [ border-radius-max ]">
			<img
				src="{BACKEND_URL}{props.user.profile}"
				alt="Profile of {props.user.username}"
			/>
		</div>
	</Flex>
</Flex>
