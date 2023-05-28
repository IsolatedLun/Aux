<script lang="ts">
	import { onMount } from 'svelte';
	import { BACKEND_URL } from '../../../consts';
	import {
		ICON_CARET_LEFT,
		ICON_CARET_RIGHT,
		ICON_ELLIPSIS_V,
		ICON_FAST_LEFT,
		ICON_FAST_RIGHT,
		ICON_GRIP,
		ICON_PAUSE,
		ICON_PLAY,
		ICON_SAVE
	} from '../../../consts/icons';
	import { songStore } from '../../../stores/songStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import { createDefaultSongCard } from '../../../utils/defaultCreates';
	import Flex from '../../Box/Flex/Flex.svelte';
	import Grid from '../../Box/Grid/Grid.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Button from '../../Modules/Interactible/Button/Button.svelte';
	import type { Props_SongCard } from '../../Modules/SongCard/types';
	import SongContainer from '../SongContainer/SongContainer.svelte';

	onMount(() => {
		audioEl.addEventListener('loadstart', () => audioLoaded = false);
		audioEl.addEventListener('loadeddata', () => {
			audioLoaded = true;
			audioEl.play();
		});
		audioEl.addEventListener('pause', () => paused = true);
		audioEl.addEventListener('play', () => paused = false);
	})

	let expanded = false;
	let paused = true;
	let audioLoaded = false;
	let songStoreData: Props_SongCard;
	let audioEl: HTMLAudioElement;

	songStore.subscribe(props => {
		songStoreData = props;
	});
</script>

<div class="[ music-player ] [ grid pos-fixed ]" data-expanded={expanded}>
	<audio bind:this={audioEl} src="{BACKEND_URL}{songStoreData.audio}"></audio>

	<Button
		on:click={() => (expanded = !expanded)}
		cls={cubeCss({ blockClass: 'player__close-btn' })}
		attachments={['flat']}
	>
		<Icon ariaLabel="">{ICON_GRIP}</Icon>
	</Button>

	<section class="[ player__info ]">
		<div class="[ info__wrapper ] [ grid place-items-center margin-block-auto height-100 ]">
			<Flex cls={cubeCss({ blockClass: 'info__content' })} useColumn={true} align="center">
				<div class="[ music__thumbnail ]">
					<img
						src="{BACKEND_URL}{songStoreData.thumbnail}"
						alt="A cat"
					/>
				</div>
				<div class="[ text-align-center ]">
					<h2>{songStoreData.title}</h2>
					<p class="[ fs-350 clr-text-muted ]">{songStoreData.user.username}</p>
				</div>
			</Flex>
		</div>
	</section>

	<section class="[ player__other ] [ padding-2 overflow-y-auto ]">
		<SongContainer songs={[createDefaultSongCard()]} />
	</section>

	<section class="[ player__bar-container ] [ pos-relative ]">
		<input class="[ bar ] [ pos-absolute width-100 ]" type="range" min={0} max={100} value="0" />
		<Flex align="center" justify="start">
			<Flex cls={cubeCss({ utilClass: 'padding-2' })} align="center" justify="start" gap={3}>
				<Button disabled={!audioLoaded} cls={cubeCss({ utilClass: 'fs-400' })}>
					<Icon ariaLabel="">{ICON_FAST_LEFT}</Icon>
				</Button>
				<Button
					on:click={() => paused ? audioEl.play() : audioEl.pause()}
					cls={cubeCss({ utilClass: 'fs-500' })}
					attachments={['hologram', 'capsule', 'big-pad']}
					disabled={!audioLoaded}
				>
					{#if paused}
						<Icon ariaLabel="">{ICON_PLAY}</Icon>
						{:else}
						<Icon ariaLabel="">{ICON_PAUSE}</Icon>
					{/if}
				</Button>
				<Button disabled={!audioLoaded} cls={cubeCss({ utilClass: 'fs-400' })}>
					<Icon ariaLabel="">{ICON_FAST_RIGHT}</Icon>
				</Button>
			</Flex>
			<p class="[ fs-350 ]">00:00</p>
			<p class="[ clr-text-muted ]">|</p>
			<p class="[ fs-350 ]">00:00</p>
		</Flex>
	</section>
</div>
