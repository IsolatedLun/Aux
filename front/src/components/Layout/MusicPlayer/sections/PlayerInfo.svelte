<script lang="ts">
	import { BACKEND_URL, WEB_EDIT_SONG_URL } from '../../../../consts';
	import { fetchLanguageLyricsForSong } from '../../../../services/song/songService';
	import { authStore } from '../../../../stores/authStore';
	import { generalStore } from '../../../../stores/generalStore';
	import { songStore } from '../../../../stores/songStore';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';
	import Flex from '../../../Box/Flex/Flex.svelte';
	import Button from '../../../Modules/Interactible/Button/Button.svelte';
	import Select from '../../../Modules/Interactible/Input/Select.svelte';

	async function fetchLyrics(language: string) {
		fetchLanguageLyricsForSong($songStore.currentSong.id, language)
			.then((res) => (lyrics = res))
			.catch(() => (lyrics = 'Currently unavailable.'));
	}

	let lyrics = '';
</script>

<section class="[ player__info ] [ width-100 overflow-y-auto ]">
	<div class="[ info__wrapper ] [ grid place-items-center width-100 height-100 padding-2 ]">
		<Flex
			cls={cubeCss({ blockClass: 'info__content', utilClass: 'width-100' })}
			useColumn={true}
			align="center"
		>
			<Flex useColumn={true} align="center">
				{#if $authStore.user && $authStore.isLogged && $authStore.user.id === $songStore.currentSong.user.id}
					<Button
						on:click={() => generalStore.setMusicPlayerExpandedState(false)}
						to={WEB_EDIT_SONG_URL}
						variant="secondary"
						attachments={['small-pad', 'capsule']}>Edit song</Button
					>
				{/if}
				<div>
					<div class="[ music__thumbnail ]">
						<img src="{BACKEND_URL}{$songStore.currentSong.thumbnail}" alt="A cat" />
					</div>
					<div class="[ text-align-center ]">
						<h2>{$songStore.currentSong.title}</h2>
						<p class="[ fs-350 clr-text-muted ]">{$songStore.currentSong.user.username}</p>
					</div>
				</div>
			</Flex>

			{#if $songStore.currentSong && $songStore.currentSong.languages.length > 0}
				<Flex
					cls={cubeCss({ utilClass: 'width-100 margin-block-1' })}
					align="center"
					justify="space-between"
				>
					<h3>Lyrics</h3>
					<Select
						on:select={(e) => fetchLyrics(e.detail.key)}
						isOptional={true}
						options={$songStore.currentSong.languages.map((x) => ({ [x]: x }))}
					/>
				</Flex>

				<p class="[ clr-text-muted whitespace-pre-line padding-block-1 padding-inline-2 ]">
					{lyrics}
				</p>
			{/if}
		</Flex>
	</div>
</section>
