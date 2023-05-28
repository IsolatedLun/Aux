<script lang="ts">
	import { ICON_BARS, ICON_GRID_H, ICON_GRID_V, ICON_TABLE_CELLS } from '../../../consts/icons';
	import { getSongs } from '../../../services/song/songService';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import ButtonSelectGroup from '../../Modules/Interactible/Button/ButtonSelectGroup.svelte';
	import Select from '../../Modules/Interactible/Input/Select.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import type { Props_SongCard } from '../../Modules/SongCard/types';
	import { SongCardShapeEnum } from '../../Modules/SongCard/types';

	export let songs: Props_SongCard[] = [];
	export let cardShape: SongCardShapeEnum = SongCardShapeEnum.SPACIOUS;
</script>

<Flex useColumn={true}>
	<Flex cls={cubeCss({ utilClass: 'width-100' })} gap={2} justify="end">
		<Select 
			options={[
				{value: 'top-rated', text: 'Top Rated'}
			]} 
		/>
		<ButtonSelectGroup>
			<Button
				on:click={() => (cardShape = SongCardShapeEnum.SPACIOUS)}
				attachments={['hologram', 'transparent', 'capsule']}
			>
				<Icon ariaLabel="">{ICON_TABLE_CELLS}</Icon>
			</Button>
			<Button
				on:click={() => (cardShape = SongCardShapeEnum.COMPACT_Y)}
				attachments={['hologram', 'transparent', 'capsule']}
			>
				<Icon ariaLabel="">{ICON_GRID_V}</Icon>
			</Button>
			<Button
				on:click={() => (cardShape = SongCardShapeEnum.COMPACT_H)}
				attachments={['hologram', 'transparent', 'capsule']}
			>
				<Icon ariaLabel="">{ICON_GRID_H}</Icon>
			</Button>
		</ButtonSelectGroup>
	</Flex>
	{#await getSongs() then data}
		{#key cardShape}
			<Grid
				use={(el) => el.setAttribute('data-shape', SongCardShapeEnum[cardShape].toLowerCase())}
				align='center'
				cls={cubeCss({ blockClass: 'song-card-container', utilClass: 'margin-block-2 width-100' })}
				gap={3}
			>
				{#each data as song}
					<SongCard props={song} {cardShape} />
				{/each}
			</Grid>
		{/key}	
	{/await}
</Flex>
