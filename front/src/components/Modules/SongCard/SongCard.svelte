<script lang="ts">
	import { ICON_EYE, ICON_PLAY } from '../../../consts/icons';
	import { songStore } from '../../../stores/songStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../Interactible/Button/Button.svelte';
	import Numeric from '../Numeric/Numeric.svelte';
	import SongCardCompact from './SongCard_Compact.svelte';
	import SongCardSpacious from './SongCard_Spacious.svelte';
	import { SongCardShapeEnum, type Props_SongCard } from './types';
	
	export let props: Props_SongCard = createDefaultSongCard();
	export let cardShape: SongCardShapeEnum = SongCardShapeEnum.SPACIOUS;

	function setSong() {
		songStore.update((e) => props);
	}
</script>
{#if cardShape === SongCardShapeEnum.SPACIOUS}
	<SongCardSpacious on:select={setSong} {props} />
	{:else if cardShape === SongCardShapeEnum.COMPACT_H}
	<SongCardCompact on:select={setSong} useColumn={false} {props} />
	{:else if cardShape === SongCardShapeEnum.COMPACT_Y}
	<SongCardCompact on:select={setSong} useColumn={true} {props} />
{/if}
