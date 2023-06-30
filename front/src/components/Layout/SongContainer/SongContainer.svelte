<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { ICON_GRID_H, ICON_GRID_V, ICON_TABLE_CELLS } from '../../../consts/icons';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import ButtonSelectGroup from '../../Modules/Interactible/Button/ButtonSelectGroup.svelte';
	import Select from '../../Modules/Interactible/Input/Select.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import type { Props_SongCard, Props_SongCardContext } from '../../Modules/SongCard/types';
	import { SongCardShapeEnum } from '../../Modules/SongCard/types';

	export let songs: Props_SongCard[] = [];
	export let cardShape: SongCardShapeEnum = SongCardShapeEnum.SPACIOUS;
	export let previewMode = false;
	export let initialButtonIdx = 0;

	setContext<Props_SongCardContext>('container', {
		getCardShape: () => cardShape
	})
</script>

<Flex useColumn={true} alignCenterOnMobile={true}>
	<Flex cls={cubeCss({ utilClass: 'width-100' })} gap={2} justify="{previewMode ? 'center' : 'end'}">
		{#if !previewMode}
			<Select 
				options={[
					{value: 'top-rated', text: 'Top Rated'}
				]} 
			/>
		{/if}
		<ButtonSelectGroup initialIdx={initialButtonIdx}>
			<Button
				on:click={() => (cardShape = SongCardShapeEnum.SPACIOUS)}
				disabled={previewMode}
				attachments={['hologram', 'transparent', 'capsule']}
			>
				<Icon ariaLabel="Spacius layout">{ICON_TABLE_CELLS}</Icon>
			</Button>
			<Button
				on:click={() => (cardShape = SongCardShapeEnum.COMPACT_Y)}
				disabled={previewMode}
				attachments={['hologram', 'transparent', 'capsule']}
			>
				<Icon ariaLabel="Compact layout 1">{ICON_GRID_V}</Icon>
			</Button>
			<Button
				on:click={() => (cardShape = SongCardShapeEnum.COMPACT_H)}
				disabled={previewMode}
				attachments={['hologram', 'transparent', 'capsule']}
			>
				<Icon ariaLabel="Compact layout 2">{ICON_GRID_H}</Icon>
			</Button>
		</ButtonSelectGroup>
	</Flex>
	{#key cardShape}
		<Grid
			use={(el) => {
				el.setAttribute('data-shape', SongCardShapeEnum[cardShape].toLowerCase());
				el.setAttribute('data-preview-mode', String(previewMode));
			}}
			align='center'
			alignCenterOnMobile={true}
			cls={cubeCss({ blockClass: 'song-card-container', utilClass: 'margin-block-2 width-100' })}
			gap={3}
		>
			{#each songs as song}
				<SongCard props={song} isPreview={previewMode} />
			{/each}

			<slot />
		</Grid>
	{/key}	
</Flex>
