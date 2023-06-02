<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { songStore } from '../../../stores/songStore';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import SongCardCompact from './SongCard_Compact.svelte';
	import SongCardSpacious from './SongCard_Spacious.svelte';
	import { SongCardShapeEnum, type Props_SongCard, type Props_SongCardContext } from './types';
	
	export let props: Props_SongCard = createDefaultSongCard();
	const { getCardShape } = getContext('container') as Props_SongCardContext; 
	const cardShape: SongCardShapeEnum = getCardShape();

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
