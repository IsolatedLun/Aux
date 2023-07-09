<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { BACKEND_URL, WEB_USER_PROFILE_URL } from '../../../consts';
	import { ICON_EYE, ICON_PLAY } from '../../../consts/icons';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../Interactible/Button/Button.svelte';
	import Numeric from '../Numeric/Numeric.svelte';
	import type { Props_SongCard } from './types';
	import UserProfile from '../Profile/UserProfile.svelte';
	
	export let props: Props_SongCard = createDefaultSongCard();
	export let cls = cubeCss({});
	export let isPreview = false;

	let _combinedCss = cls.combine({
		blockClass: 'song-card',
		utilClass: 'pos-relative width-100'
	});

	const dispatch = createEventDispatcher();
</script>

<Flex useColumn={true} cls={cubeCss(_combinedCss)}>
	<div
		class="
			[ card__thumbnail-container ] 
			[ pos-relative overflow-hidden border-radius-bevelled width-100 ]
		"
	>
		<Button
			on:click={() => dispatch('select')}
			attachments={['capsule', 'cube', 'huge-pad']}
			cls={cubeCss({ blockClass: 'card__play-btn', utilClass: 'pos-absolute' })}
		>
			<Icon ariaLabel="Play">{ICON_PLAY}</Icon>
		</Button>
		<img
			src="{isPreview ? props.thumbnail : BACKEND_URL + props.thumbnail}"
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
		<a href="{WEB_USER_PROFILE_URL(props.user.id)}">
			<UserProfile user={props.user} variant='songCard' />
		</a>
	</Flex>
</Flex>
