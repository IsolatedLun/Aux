<script lang="ts">
	import { createEventDispatcher, onMount, setContext } from 'svelte';
	import { ICON_GRID_H, ICON_GRID_V, ICON_SEARCH, ICON_TABLE_CELLS } from '../../../consts/icons';
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
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';

	function handleSearch() {
		dispatch('search', searchText);
	}

	export let songs: Props_SongCard[] = [];
	export let cardShape: SongCardShapeEnum = SongCardShapeEnum.SPACIOUS;
	export let previewMode = false;
	export let searchMode = false;
	export let hideOrderBy = false;
	export let initialButtonIdx = 0;

	let searchText = '';

	setContext<Props_SongCardContext>('container', {
		getCardShape: () => cardShape
	});

	const dispatch = createEventDispatcher();
</script>

<Flex
	cls={cubeCss({ blockClass: 'song-card-container-wrapper' })}
	useColumn={true}
	alignCenterOnMobile={true}
>
	<Flex
		tag="header"
		cls={cubeCss({ utilClass: 'width-100' })}
		justify={searchMode ? 'space-between' : 'end'}
		collapseOnMobile={true}
		alignCenterOnMobile={true}
	>
		{#if searchMode}
			<Flex cls={cubeCss({utilClass: 'flex-grow-0'})} align="center">
				<TextInput label="Search songs" placeholder="Search..." bind:value={searchText} />
				<Button variant="secondary" attachments={['capsule']} on:click={handleSearch}>
					<Flex gap={2}>
						<p>Search</p>
						<Icon cls={cubeCss({utilClass: 'margin-inline-end-4'})} ariaLabel="Search">{ICON_SEARCH}</Icon>
					</Flex>
				</Button>
			</Flex>
		{/if}
		<Flex
			cls={cubeCss({ utilClass: searchMode ? '' : 'width-100' })}
			gap={2}
			justify={previewMode ? 'center' : 'end'}
		>
			{#if !previewMode && !hideOrderBy}
				<Select
					on:select={(e) => dispatch('select', e.detail)}
					options={[
						{ text: 'Newest', value: '-date_created' },
						{ text: 'Popular', value: '-views' },
						{ text: 'Oldest', value: 'date_created' }
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
	</Flex>
	{#key cardShape}
		<Grid
			use={(el) => {
				el.setAttribute('data-shape', SongCardShapeEnum[cardShape].toLowerCase());
				el.setAttribute('data-preview-mode', String(previewMode));
			}}
			align="center"
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
