<script lang="ts">
	import { onMount } from 'svelte';
	import { BACKEND_URL, PAGINATED_SONG_URL } from '../../../consts';
	import {
		ICON_FAST_LEFT,
		ICON_FAST_RIGHT,
		ICON_GRIP,
		ICON_MUSIC_DISC,
		ICON_PAUSE,
		ICON_PLAY
	} from '../../../consts/icons';
	import { songStore } from '../../../stores/songStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import type { Props_SongCard } from '../../Modules/SongCard/types';
	import SongContainer from '../SongContainer/SongContainer.svelte';
	import type { Props_AudioState } from './types';
	import { convertToDateTime } from './utils';
	import Paginator from '../Paginator/Paginator.svelte';
	import SongCard from '../../Modules/SongCard/SongCard.svelte';
	import { MUSIC_PLAYER_OPEN_BUTTON_ID } from '../../../consts/consts';

	onMount(() => {
		audioEl.addEventListener('loadstart', () => (audioState.audioLoaded = false));
		audioEl.addEventListener('loadeddata', () => {
			audioState.audioLoaded = true;
			audioState.totalTime = convertToDateTime(audioEl.duration);

			barEl.min = '0';
			barEl.max = String(audioEl.duration);

			audioEl.play();
		});
		audioEl.addEventListener('pause', () => (audioState.paused = true));
		audioEl.addEventListener('play', () => (audioState.paused = false));
		audioEl.addEventListener('timeupdate', () => {
			audioState.currentTime = convertToDateTime(audioEl.currentTime);
			barEl.value = String(audioEl.currentTime);
		});
	});

	let expanded = false;
	let audioState: Props_AudioState = {
		paused: false,
		audioLoaded: false,
		currentTime: '00:00',
		totalTime: '00:00'
	};
	let songStoreData: Props_SongCard;
	let audioEl: HTMLAudioElement;
	let barEl: HTMLInputElement;

	songStore.subscribe((props) => {
		songStoreData = props;
	});
</script>

<div class="[ music-player ] [ grid pos-fixed ]" aria-expanded="{expanded}" data-expanded={expanded}>
	<audio bind:this={audioEl} src="{BACKEND_URL}{songStoreData.audio}" />

	<Button
		on:click={() => (expanded = !expanded)}
		cls={cubeCss({ blockClass: 'player__close-btn' })}
		use={(el) => (el.id = MUSIC_PLAYER_OPEN_BUTTON_ID)}
	>
		<Icon ariaLabel={(expanded ? 'Close' : 'Expand') + ' music player'}>{ICON_GRIP}</Icon>
	</Button>

	<section class="[ player__info ]">
		<div class="[ info__wrapper ] [ grid place-items-center margin-block-auto height-100 ]">
			<Flex cls={cubeCss({ blockClass: 'info__content' })} useColumn={true} align="center">
				<div class="[ music__thumbnail ]">
					<img src="{BACKEND_URL}{songStoreData.thumbnail}" alt="A cat" />
				</div>
				<div class="[ text-align-center ]">
					<h2>{songStoreData.title}</h2>
					<p class="[ fs-350 clr-text-muted ]">{songStoreData.user.username}</p>
				</div>
			</Flex>
		</div>
	</section>

	<section class="[ player__other ] [ padding-2 overflow-y-auto ]">
		<Paginator urlFn={PAGINATED_SONG_URL} component={SongCard} componentContainer={SongContainer} />
	</section>

	<section class="[ player__bar-container ] [ pos-relative ]">
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
				<Button disabled={!audioState.audioLoaded} cls={cubeCss({ utilClass: 'fs-400' })}>
					<Icon ariaLabel="">{ICON_FAST_LEFT}</Icon>
				</Button>
				<Button
					on:click={() => (audioState.paused ? audioEl.play() : audioEl.pause())}
					cls={cubeCss({ utilClass: 'fs-500' })}
					attachments={
						[
							audioState.paused ? 'hologram' : '', 
							audioState.paused ? '' : 'rotate-icon',
							'capsule', 'big-pad', 'ratio-1'
						]
					}
					disabled={!audioState.audioLoaded}
				>
					<Icon ariaLabel="">{ICON_MUSIC_DISC}</Icon>
				</Button>
				<Button disabled={!audioState.audioLoaded} cls={cubeCss({ utilClass: 'fs-400' })}>
					<Icon ariaLabel="">{ICON_FAST_RIGHT}</Icon>
				</Button>
			</Flex>
		</Flex>
	</section>
</div>
