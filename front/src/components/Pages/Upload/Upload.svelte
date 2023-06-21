<script lang="ts">
	import { HOLOGRAM_INPUT_PRESET } from '../../../consts/consts';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import SongContainer from '../../Layout/SongContainer/SongContainer.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import DragNDrop from '../../Modules/Interactible/Input/DragNDrop.svelte';
	import TagInput from '../../Modules/Interactible/Input/TagInput.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import type { Form_Song } from './types';

	function removeTag(tag: string) {
		songForm.tags = songForm.tags.filter(_tag => _tag !== tag);
	}

	export let songForm: Form_Song = {
		title: '',
		tags: [],
		thumbnail: null,
		audio: null
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
	<div class="[ margin-block-end-4 ]">
		<SongContainer previewMode={true}>
			<SongCard props={createDefaultSongCard()} />
		</SongContainer>
	</div>
</form>