<script lang="ts">
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard, createDefaultUser } from '../../../utils/defaultCreates';
	import { validateUploadForm } from '../../../utils/form/form';
	import { filterEnumByNumbers, isFileTypeOf } from '../../../utils/general';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import SongContainer from '../../Layout/SongContainer/SongContainer.svelte';
	import Card from '../../Modules/Card/Card.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import FileInput from '../../Modules/Interactible/Input/FileInput.svelte';
	import TagInput from '../../Modules/Interactible/Input/TagInput.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import { SongCardShapeEnum } from '../../Modules/SongCard/types';
	import type { Form_Song } from './types';

	function removeTag(tag: string) {
		songForm.tags = songForm.tags.filter((_tag) => _tag !== tag);
	}

	function handleFormSubmit() {
		const res = validateUploadForm(songForm);

		res !== true ? error = res : error = '';
	}

	export let songForm: Form_Song = {
		title: '',
		tags: [],

		thumbnail: null,
		audio: null,

		user: createDefaultUser()
	};

	let previewThumbnail = '';
	let error = '';
</script>

<form class="[ upload-form ] [ grid place-items-center ]" on:submit={handleFormSubmit}>
	<h2 class="[ margin-block-end-2 ]">Upload Your Song</h2>
	{#if error}
		<Card variant='error' cls={cubeCss({utilClass: 'margin-block-end-2'})}>
			<p>{error}</p>
		</Card>
	{/if}
	<Grid columns={2} gap={4} collapseOnMobile={true} alignCenterOnMobile={true} align="start">
		<Flex useColumn={true} gap={2}>
			<TextInput
				variant="primary"
				bind:value={songForm.title}
				label="Title"
				showLabel={true}
				placeholder="Enter title"
			/>
			<TagInput bind:tags={songForm.tags} on:remove={(e) => removeTag(e.detail)} />
		</Flex>
		<Flex useColumn={true} align="center">
			<FileInput
				fileType="audio"
				variant="drag-drop"
				on:input={(e) => (songForm.audio = e.detail)}
			/>
		</Flex>
	</Grid>

	<Flex
		cls={cubeCss({ utilClass: 'width-100 margin-block-start-2' })}
		align="start"
		useColumn={true}
	>
		<FileInput
			fileType="image"
			variant="compact"
			on:input={(e) => (songForm.thumbnail = e.detail)}
			on:preview={(e) => (previewThumbnail = e.detail)}
		/>
		<Flex cls={cubeCss({ utilClass: 'margin-inline-start-1' })} gap={2}>
			<Button isSubmit={true}>Upload</Button>
			<Button variant="error">Cancel</Button>
		</Flex>
	</Flex>

	<h3 class="[ margin-block-2 ]">Preview</h3>
	<Flex
		cls={cubeCss({ utilClass: 'margin-block-end-4' })}
		justify="space-between"
		gap={4}
		alignCenterOnMobile={true}
		collapseOnMobile={true}
	>
		{#each filterEnumByNumbers(SongCardShapeEnum) as shape, i}
			<SongContainer initialButtonIdx={i} cardShape={shape} previewMode={true}>
				<SongCard
					isPreview={true}
					props={{
						...createDefaultSongCard(),
						...songForm,
						thumbnail: previewThumbnail,
						audio: ''
					}}
				/>
			</SongContainer>
		{/each}
	</Flex>
</form>
