<script lang="ts">
	import { HOLOGRAM_INPUT_PRESET } from '../../../consts/consts';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import SongContainer from '../../Layout/SongContainer/SongContainer.svelte';
	import DragNDrop from '../../Modules/Interactible/Input/DragNDrop.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import type { Form_Song } from './types';

	export let songForm: Form_Song = {
		title: '',
		tags: [],
		thumbnail: null,
		audio: null
	};
</script>

<div class="[ upload ] [ grid place-items-center ]">
	<h2 class="[ margin-block-end-2 ]">Upload Your Song</h2>
	<Flex gap={2}>
		<Flex useColumn={true} gap={2}>
			<TextInput attachments={HOLOGRAM_INPUT_PRESET} variant="primary" bind:value={songForm.title} label="Title" showLabel={true} placeholder="Enter title" />
			<TextInput attachments={HOLOGRAM_INPUT_PRESET} variant="primary" label="Tags" showLabel={true} placeholder="Enter tag" />
		</Flex>
		<Flex useColumn={true} align='center'>
            <DragNDrop fileType='image' variant='thumbnail' /> 
        </Flex>
	</Flex>

	<h3 class="[ margin-block-2 ]">Preview</h3>
	<div class="margin-block-end-3">
		<SongContainer>
			<SongCard props={createDefaultSongCard()} />
		</SongContainer>
	</div>
</div>
