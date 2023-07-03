<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { songStore } from '../../../stores/songStore';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import SongCardCompact from './SongCard_Compact.svelte';
	import SongCardSpacious from './SongCard_Spacious.svelte';
	import { SongCardShapeEnum, type Props_SongCard, type Props_SongCardContext } from './types';
	
	function setSong() {
		if(!isPreview)
			songStore.play(i);
	}

	export let i: number = -1;
	export let props: Props_SongCard = createDefaultSongCard();
	export let isPreview = false;

	const { getCardShape } = getContext('container') as Props_SongCardContext; 
	const cardShape: SongCardShapeEnum = getCardShape();
</script>

{#if cardShape === SongCardShapeEnum.SPACIOUS}
	<SongCardSpacious on:select={setSong} {props} {isPreview} />
	{:else if cardShape === SongCardShapeEnum.COMPACT_H}
	<SongCardCompact on:select={setSong} useColumn={false} {props} {isPreview} />
	{:else if cardShape === SongCardShapeEnum.COMPACT_Y}
	<SongCardCompact on:select={setSong} useColumn={true} {props} {isPreview} />
{/if}