<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { BACKEND_URL } from '../../../consts';
	import { ICON_EYE, ICON_PLAY } from '../../../consts/icons';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../Interactible/Button/Button.svelte';
	import type { ButtonAttachments } from '../Interactible/Button/types';
	import Numeric from '../Numeric/Numeric.svelte';
	import type { Props_SongCard } from './types';
	
	export let props: Props_SongCard = createDefaultSongCard();
	export let cls = cubeCss({});
    export let useColumn = false;
	export let isPreview = false;

    let paddingType: ButtonAttachments = 'big-pad';
	let _combinedCss = cls.combine({
		blockClass: 'song-card',
		utilClass: 'pos-relative width-100'
	});

	const dispatch = createEventDispatcher();
</script>

<Flex {useColumn} cls={cubeCss(_combinedCss)} justify='start'>
	<div
		class="
			[ card__thumbnail-container ] 
			[ pos-relative overflow-hidden border-radius-bevelled width-100 ]
		"
	>
		<Button
			on:click={() => dispatch('select')}
			attachments={['capsule', 'cube', paddingType]}
			cls={cubeCss({ blockClass: 'card__play-btn', utilClass: 'pos-absolute' })}
		>
			<Icon ariaLabel="Play">{ICON_PLAY}</Icon>
		</Button>
		<img
			src="{isPreview ? props.thumbnail : BACKEND_URL + props.thumbnail}"
			alt="Thumbnail for {props.title}"
		/>
	</div>

	<Flex useColumn={true}>
        <p class="[ fs-325 text-ellipsis-2 ]">{props.title}</p>
        <p class="[ fs-275 clr-text-muted ]">{props.user.username}</p>
    </Flex>
</Flex>
