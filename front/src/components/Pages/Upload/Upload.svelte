<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { ICON_PLUS } from '../../../consts/icons';
	import {
		fetchLangugaeList,
		uploadSong,
		fetchAllLanguageLyricsForSong,
		editSong,
		deleteSong
	} from '../../../services/song/songService';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard, createDefaultUser } from '../../../utils/defaultCreates';
	import { validateEditSongForm, validateUploadForm } from '../../../utils/form/form';
	import { filterEnumByNumbers } from '../../../utils/general';
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
	import { songStore } from '../../../stores/songStore';
	import { authStore } from '../../../stores/authStore';
	import { goto } from '$app/navigation';
	import { BACKEND_URL, WEB_USER_PROFILE_URL } from '../../../consts';
	import Card from '../../Modules/Card/Card.svelte';

	onMount(() => {
		isEditMode = $page.url.searchParams.get('edit') === 'true';

		if (isEditMode) {
			if (
				($authStore.user && $songStore.currentSong.user.id !== $authStore.user.id) ||
				$songStore.currentSong.id === -1
			)
				goto('/');

			songForm = {
				title: $songStore.currentSong.title,
				tags: [],
				user: $songStore.currentSong.user,
				audio: null,
				thumbnail: null,
				lyrics: {}
			};
		}
	});

	function handleFormSubmit() {
		const res = isEditMode ? validateEditSongForm(songForm) : validateUploadForm(songForm);
		if (res !== true) {
			formError = res;
			return;
		}

		if (isEditMode) {
			editSong({ ...songForm, id: $songStore.currentSong.id })
				.then(() => goto(WEB_USER_PROFILE_URL($authStore.user!.id)))
				.catch((err) => (formError = err));
		}

		uploadSong(songForm)
			.then(() => goto(WEB_USER_PROFILE_URL($authStore.user!.id)))
			.catch((err) => (formError = err));
	}

	function removeTag(tag: string) {
		songForm.tags = songForm.tags.filter((_tag) => _tag !== tag);
	}

	function addLyric() {
		if (!Object.keys(songForm.lyrics).includes(currentSelectedLanguage) && currentSelectedLanguage)
			songForm.lyrics[currentSelectedLanguage] = '';
	}

	function removeLyric(e: CustomEvent<string>) {
		songForm.lyrics[e.detail] = ''; // Won't re-render without this line.
		delete songForm.lyrics[e.detail];
	}

	async function handleLyricInput(e: CustomEvent<{ text: string; name: string }>) {
		songForm.lyrics[e.detail.name] = e.detail.text;
	}

	async function handleFetchAllLyrics() {
		const data = await fetchAllLanguageLyricsForSong($songStore.currentSong.id);
		songForm.lyrics = data;

		return Promise.resolve(data);
	}

	function handleDeleteSong() {
		deleteSong($songStore.currentSong.id).finally(() =>
			goto(WEB_USER_PROFILE_URL($authStore.user!.id))
		);
	}

	let songForm: Form_Song = {
		title: '',
		tags: [],
		lyrics: {},

		thumbnail: null,
		audio: null,

		user: createDefaultUser()
	};

	let isEditMode = false;
	let currentSelectedLanguage = '';
	let previewThumbnail = '';
	let formError = '';
</script>

<Form id="upload-form" title="Upload Your Song" {formError} on:submit={handleFormSubmit}>
	<Card cls={cubeCss({ utilClass: 'margin-inline-auto' })} padding={2}>
		<Grid
			cls={cubeCss({ utilClass: 'margin-inline-auto' })}
			columns={2}
			gap={4}
			collapseOnMobile={true}
			alignCenterOnMobile={true}
		>
			<Flex useColumn={true} gap={2}>
				<TextInput
					bind:value={songForm.title}
					variant="primary"
					label="Title"
					showLabel={true}
					placeholder="Enter title"
				/>
				<TagInput bind:tags={songForm.tags} on:remove={(e) => removeTag(e.detail)} />
			</Flex>
			<Flex useColumn={true} align="center">
				<FileInput
					disabled={isEditMode}
					fileType="audio"
					variant="drag-drop"
					on:file={(e) => (songForm.audio = e.detail)}
				/>
			</Flex>
		</Grid>
	</Card>

	<Flex
		cls={cubeCss({ utilClass: 'width-100 margin-block-start-2' })}
		align="start"
		useColumn={true}
	>
		<FileInput
			disabled={isEditMode}
			fileType="image"
			variant="compact"
			on:file={(e) => (songForm.thumbnail = e.detail)}
			on:preview={(e) => (previewThumbnail = e.detail)}
		/>
		<Flex
			cls={cubeCss({ utilClass: 'width-100 margin-inline-start-1' })}
			justify="space-between"
			align="center"
			collapseOnMobile={true}
			alignCenterOnMobile={true}
			gap={2}
		>
			<Flex cls={cubeCss({ utilClass: 'margin-block-start-1' })} align='center'>
				{#if isEditMode}
					<Button variant="secondary" attachments={['small-pad', 'capsule']} isSubmit={true}
						>Save changes</Button
					>
					<Button on:click={handleDeleteSong} variant="error" attachments={['small-pad', 'capsule']}
						>Delete</Button
					>
				{:else}
					<Button isSubmit={true} attachments={['capsule']}>Upload</Button>
				{/if}
				<Button
					to="/"
					cls={cubeCss({ utilClass: 'margin-inline-start-1' })}
					attachments={['small-pad', 'capsule']}
					variant="hoverable">Cancel</Button
				>
			</Flex>
			{#await fetchLangugaeList() then langList}
				<Flex align="center">
					<p>Lyrics:</p>
					<Select
						on:select={(e) => (currentSelectedLanguage = e.detail.key)}
						options={langList}
						isOptional={true}
					/>
					<Button on:click={addLyric} variant="hoverable" attachments={['capsule', 'small-pad']}>
						<Icon ariaLabel="">{ICON_PLUS}</Icon>
						<span class="[ margin-inline-start-1 ]">Add language</span>
					</Button>
				</Flex>
			{/await}
		</Flex>

		<Card cls={cubeCss({utilClass: 'width-100 margin-block-start-2'})} padding={2}>
			{#if isEditMode}
				{#await handleFetchAllLyrics() then _}
					<LyricInputSection
						lyrics={songForm.lyrics}
						on:input={handleLyricInput}
						on:remove={removeLyric}
					/>
				{/await}
			{:else}
				<LyricInputSection
					lyrics={songForm.lyrics}
					on:input={handleLyricInput}
					on:remove={removeLyric}
				/>
			{/if}
		</Card>
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
			<SongContainer initialButtonIdx={i} cardShape={Number(shape)} previewMode={true}>
				<SongCard
					isPreview={true}
					props={{
						...createDefaultSongCard(),
						...songForm,
						thumbnail: isEditMode
							? BACKEND_URL + $songStore.currentSong.thumbnail
							: previewThumbnail,
						audio: ''
					}}
				/>
			</SongContainer>
		{/each}
	</Flex>
</Form>
