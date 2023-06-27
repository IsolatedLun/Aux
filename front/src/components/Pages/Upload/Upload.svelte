<script lang="ts">
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard, createDefaultUser } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import SongContainer from '../../Layout/SongContainer/SongContainer.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import DragNDrop from '../../Modules/Interactible/Input/DragNDrop.svelte';
	import TagInput from '../../Modules/Interactible/Input/TagInput.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import { SongCardShapeEnum } from '../../Modules/SongCard/types';
	import type { Form_Song } from './types';

	function removeTag(tag: string) {
		songForm.tags = songForm.tags.filter(_tag => _tag !== tag);
	}

	export let songForm: Form_Song = {
		title: 'Enter a title',
		tags: [],

		thumbnail: null,
		audio: null,

		user: createDefaultUser(),
	};
</script>

<form class="[ upload-form ] [ grid place-items-center ]">
	<h2 class="[ margin-block-end-2 ]">Upload Your Song</h2>
	<Flex gap={2} useColumn={true}>
		<Grid columns={2} gap={4}>
			<Flex useColumn={true} gap={2}>
				<TextInput variant="primary" bind:value={songForm.title} label="Title" showLabel={true} placeholder="Enter title" />
				<TagInput bind:tags={songForm.tags} on:remove={(e) => removeTag(e.detail)} />
			</Flex>
			<Flex useColumn={true} align='center'>
				<DragNDrop fileType='image' variant='thumbnail' /> 
			</Flex>
		</Grid>
		<Flex>
			<Button>Upload</Button>
			<Button variant='error'>Cancel</Button>
		</Flex>
	</Flex>
	<h3 class="[ margin-block-2 ]">Preview</h3>
	<Flex cls={cubeCss({utilClass: 'margin-block-end-4'})} justify='space-between' gap={4}>
		<SongContainer cardShape={SongCardShapeEnum.SPACIOUS} previewMode={true}>
			<SongCard props={{...createDefaultSongCard(), ...songForm, thumbnail: 'profiles/def.png', audio: ''}} />
		</SongContainer>
		<SongContainer initialButtonIdx={1} cardShape={SongCardShapeEnum.COMPACT_H} previewMode={true}>
			<SongCard props={{...createDefaultSongCard(), ...songForm, thumbnail: 'profiles/def.png', audio: ''}} />
		</SongContainer>
		<SongContainer initialButtonIdx={2} cardShape={SongCardShapeEnum.COMPACT_Y} previewMode={true}>
			<SongCard props={{...createDefaultSongCard(), ...songForm, thumbnail: 'profiles/def.png', audio: ''}} />
		</SongContainer>
	</Flex>
</form>
