<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';
	import { spawnOverlay } from './utils';
	import type { ButtonAttachments } from './types';

	onMount(() => {
		use(_this);
	});

	function handleClick(e: MouseEvent) {
		spawnOverlay(e);
		dispatch('click', e);
	}

	export let cls = cubeCss({});
	export let variant = 'primary';
	export let attachments: ButtonAttachments[] = [];
	export let disabled = false;
	export let use: (_this: HTMLElement) => void = () => null;
	export let to: string = '';
	export let selected = false;

	const dispatch = createEventDispatcher();
	const _class = cls.to_string({
		compostClass: 'button',
		utilClass: to ? 'display-block' : ''
	});

	let _this: HTMLElement;
</script>

{#if to}
	<a
		bind:this={_this}
		href={to}
		class={_class}
		data-variant={variant}
		data-attachments={attachments.join(',')}
		data-disabled={disabled}
		on:click={handleClick}
	>
		<slot />
	</a>
{:else}
	<button
		bind:this={_this}
		class={_class}
		data-variant={variant}
		data-attachments={attachments.join(',')}
		data-disabled={disabled}
		data-selected={selected}
		on:click={handleClick}
	>
		<slot />
	</button>
{/if}
