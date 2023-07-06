<script lang="ts">
	import { ICON_PLUS } from '../../../consts/icons';
	import { fetchLangugaeList, uploadSong } from '../../../services/song/songService';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard, createDefaultUser } from '../../../utils/defaultCreates';
	import { validateUploadForm } from '../../../utils/form/form';
	import { filterEnumByNumbers, isFileTypeOf } from '../../../utils/general';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import SongContainer from '../../Layout/SongContainer/SongContainer.svelte';
	import Form from '../../Modules/Form/Form.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import FileInput from '../../Modules/Interactible/Input/FileInput.svelte';
	import Select from '../../Modules/Interactible/Input/Select.svelte';
	import TagInput from '../../Modules/Interactible/Input/TagInput.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import { SongCardShapeEnum } from '../../Modules/SongCard/types';
	import LyricInputSection from './sections/LyricInputSection.svelte';
	import type { Form_Song } from './types';

	function handleFormSubmit() {
		const res = validateUploadForm(songForm);
		if (res !== true) {
			formError = res;
			return;
		}

		uploadSong(songForm)
			.then(() => alert('success'))
			.catch((err) => (formError = err));
	}

	function removeTag(tag: string) {
		songForm.tags = songForm.tags.filter((_tag) => _tag !== tag);
	}

	function addLyric() {
		if (!Object.keys(songForm.lyrics).includes(currentSelectedLanguage))
			songForm.lyrics[currentSelectedLanguage] = '';
	}

	function removeLyric(e: CustomEvent<string>) {
		songForm.lyrics[e.detail] = ''; // Won't re-render without this line.
		delete songForm.lyrics[e.detail];
	}

	async function handleLyricInput(e: CustomEvent<{text: string, name: string}>) {
		songForm.lyrics[e.detail.name] = e.detail.text;
	}

	let songForm: Form_Song = {
		title: '',
		tags: [],
		lyrics: {},

		thumbnail: null,
		audio: null,

		user: createDefaultUser()
	};

	let currentSelectedLanguage = '';
	let previewThumbnail = '';
	let formError = '';
</script>

<Form id="upload-form" title="Upload Your Song" {formError} on:submit={handleFormSubmit}>
	<Grid
		cls={cubeCss({ utilClass: 'margin-inline-auto' })}
		columns={2}
		gap={4}
		collapseOnMobile={true}
		alignCenterOnMobile={true}
		align="start"
	>
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
				on:file={(e) => (songForm.audio = e.detail)}
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
			on:file={(e) => (songForm.thumbnail = e.detail)}
			on:preview={(e) => (previewThumbnail = e.detail)}
		/>
		<Flex
			cls={cubeCss({ utilClass: 'width-100 margin-inline-start-1' })}
			justify="space-between"
			gap={2}
		>
			<Flex>
				<Button isSubmit={true}>Upload</Button>
				<Button variant="error">Cancel</Button>
			</Flex>
			{#await fetchLangugaeList() then langList}
				<Flex align="center">
					<p>Lyrics:</p>
					<Select on:select={(e) => (currentSelectedLanguage = e.detail.key)} options={langList} />
					<Button on:click={addLyric} variant="hoverable" attachments={['capsule']}>
						<Icon ariaLabel="">{ICON_PLUS}</Icon>
						<span class="[ margin-inline-start-1 ]">Add language</span>
					</Button>
				</Flex>
			{/await}
		</Flex>

		<LyricInputSection lyrics={songForm.lyrics} on:input={handleLyricInput} on:remove={removeLyric} />
	</Flex>

	<h3 class="[ margin-block-2 ]">Preview</h3>
	<Flex
		cls={cubeCss({ utilClass: 'margin-block-end-4 margin-inline-auto' })}
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
</Form>
