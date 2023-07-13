<script lang="ts">
	import { onMount } from 'svelte';
	import { BACKEND_URL, PAGINATED_SONG_URL } from '../../../consts';
	import {
		ICON_FAST_LEFT,
		ICON_FAST_RIGHT,
		ICON_GRIP,
		ICON_LOOP,
		ICON_MUSIC_DISC
	} from '../../../consts/icons';
	import { songStore } from '../../../stores/songStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import SongContainer from '../SongContainer/SongContainer.svelte';
	import type { Props_AudioState } from './types';
	import { convertToDateTime } from './utils';
	import Paginator from '../Paginator/Paginator.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import { MUSIC_PLAYER_OPEN_BUTTON_ID } from '../../../consts/consts';
	import { viewSong } from '../../../services/song/songService';
	import PlayerInfo from './sections/PlayerInfo.svelte';
	import { generalStore } from '../../../stores/generalStore';
	import type { SongOrderTypes } from '../SongContainer/types';

	onMount(() => {
		audioEl.addEventListener('loadstart', () => {
			audioState.audioLoaded = false;
		});
		audioEl.addEventListener('loadeddata', () => {
			audioState.audioLoaded = true;
			audioState.totalTime = convertToDateTime(audioEl.duration);

			barEl.min = '0';
			barEl.max = String(audioEl.duration);

			audioEl.play();

			viewSong($songStore.currentSong.id);
			lyrics = '';
		});
		audioEl.addEventListener('pause', () => (audioState.paused = true));
		audioEl.addEventListener('play', () => (audioState.paused = false));
		audioEl.addEventListener('timeupdate', () => {
			audioState.currentTime = convertToDateTime(audioEl.currentTime);
			barEl.value = String(audioEl.currentTime);
		});
		audioEl.addEventListener('ended', () => {
			if (!audioState.loop) songStore.next();
		});
	});

	let orderBy: SongOrderTypes = 'date_created';
	let lyrics = '';
	let audioState: Props_AudioState = {
		paused: false,
		audioLoaded: false,
		loop: false,
		currentTime: '00:00',
		totalTime: '00:00'
	};
	let audioEl: HTMLAudioElement;
	let barEl: HTMLInputElement;
</script>

<div
	class="[ music-player ] [ grid pos-fixed ]"
	aria-expanded={$generalStore.musicPlayerExpanded}
	data-expanded={$generalStore.musicPlayerExpanded}
>
	<audio
		bind:this={audioEl}
		src="{BACKEND_URL}{$songStore.currentSong.audio}"
		loop={audioState.loop}
	/>

	<Button
		on:click={() => generalStore.setMusicPlayerExpandedState(!$generalStore.musicPlayerExpanded)}
		cls={cubeCss({ blockClass: 'player__close-btn' })}
		use={(el) => (el.id = MUSIC_PLAYER_OPEN_BUTTON_ID)}
	>
		<Icon ariaLabel={($generalStore.musicPlayerExpanded ? 'Close' : 'Expand') + ' music player'}
			>{ICON_GRIP}</Icon
		>
	</Button>

	<PlayerInfo />

	<section
		class="[ player__other ] [ padding-2 overflow-y-auto ]"
		data-disabled={!$generalStore.musicPlayerExpanded}
	>
		{#key $songStore.currentSong.id}
			<SongContainer on:select={(e) => (orderBy = e.detail.value)}>
				{#key orderBy}
					<Paginator
						urlFn={PAGINATED_SONG_URL(1, orderBy)}
						filterFn={(songs) => songs.filter((x) => x.id !== $songStore.currentSong.id)}
						component={SongCard}
					/>
				{/key}
			</SongContainer>
		{/key}
	</section>

	<section
		class="[ player__bar-container ] [ pos-relative ]"
		data-disabled={!$generalStore.musicPlayerExpanded}
	>
		<input
			bind:this={barEl}
			on:input={() => (audioEl.currentTime = Number(barEl.value))}
			class="[ bar ] [ pos-absolute width-100 outline-none ]"
			type="range"
			min={0}
			max={100}
			value="0"
		/>
		<Flex
			cls={cubeCss({ utilClass: 'width-100' })}
			align="center"
			justify="space-between"
			useColumn={true}
			gap={1}
		>
			<Flex
				cls={cubeCss({ utilClass: 'width-100 margin-block-start-3 padding-inline-2' })}
				justify="space-between"
			>
				<p class="[ fs-350 ]">{audioState.currentTime}</p>
				<p class="[ fs-350 ]">{audioState.totalTime}</p>
			</Flex>
			<Flex align="center" justify="start" gap={3}>
				<Button
					on:click={() => songStore.previous()}
					disabled={!audioState.audioLoaded}
					cls={cubeCss({ utilClass: 'fs-400' })}
				>
					<Icon ariaLabel="">{ICON_FAST_LEFT}</Icon>
				</Button>
				<Button
					on:click={() => (audioState.paused ? audioEl.play() : audioEl.pause())}
					cls={cubeCss({ utilClass: 'fs-500' })}
					attachments={[
						audioState.paused ? 'hologram' : '',
						audioState.paused ? '' : 'rotate-icon',
						'capsule',
						'big-pad',
						'ratio-1'
					]}
					disabled={!audioState.audioLoaded}
				>
					<Icon ariaLabel="">{ICON_MUSIC_DISC}</Icon>
				</Button>
				<Button
					on:click={() => songStore.next()}
					disabled={!audioState.audioLoaded}
					cls={cubeCss({ utilClass: 'fs-400' })}
				>
					<Icon ariaLabel="">{ICON_FAST_RIGHT}</Icon>
				</Button>

				<Button
					on:click={() => (audioState.loop = !audioState.loop)}
					attachments={[audioState.loop ? '' : 'hologram']}
				>
					<Icon ariaLabel={audioState.loop ? 'Dont loop' : 'Loop'}>{ICON_LOOP}</Icon>
				</Button>
			</Flex>
		</Flex>
	</section>
</div>
