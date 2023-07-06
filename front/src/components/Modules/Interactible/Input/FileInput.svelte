<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { ICON_IMAGE, ICON_UPLOAD } from '../../../../consts/icons';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';
	import Flex from '../../../Box/Flex/Flex.svelte';
	import Icon from '../../Icon/Icon.svelte';
	import Button from '../Button/Button.svelte';
	import type { FileType } from '../../../../utils/types';

	onMount(() => {
		id = crypto.randomUUID();
	});

	function handleButtonClick() {
		inputEl.click();
	}

	function handleInput() {
		if (inputEl.files) {
			fileName = inputEl.files[0].name;

			if (fileType === 'image') {
				dispatch('preview', URL.createObjectURL(inputEl.files[0]));
			}

			dispatch('input', inputEl);
			dispatch('file', inputEl.files[0]);
		}
	}

	export let id: string = '';
	export let cls = cubeCss({});
	export let fileType: FileType;
	export let variant = 'default';

	let inputEl: HTMLInputElement;
	let fileName = 'Empty file';

	const _class = cls.to_string({
		compostClass: 'input-container drag-drop-input-container',
		utilClass: 'pos-relative width-100'
	});
	const dispatch = createEventDispatcher();
</script>

<div class={_class} data-variant={variant}>
	<label for={id}>
		{#if variant === 'drag-drop'}
			<Flex useColumn={true} align="center" gap={2}>
				<Icon cls={cubeCss({ utilClass: 'fs-500' })} ariaLabel="Upload icon">{ICON_UPLOAD}</Icon>
				<p class="[ fs-350 text-align-center ]">
					Drag & drop or upload your <span class="[ underline ]">{fileType}</span> file
				</p>
				<p class="[ fw-bold clr-text-muted ]">OR</p>
				<Button cls={cubeCss({ utilClass: 'z-index-high' })} on:click={handleButtonClick}
					>Browse files</Button
				>

				<Flex useColumn={true} align="center">
					<p class="[ clr-text-muted fw-bold fs-300 ]">File name</p>
					<p class="[ fs-350 text-ellipsis-1 ]">{fileName}</p>
				</Flex>
			</Flex>
		{:else if variant === 'compact'}
			<Flex align="center" justify="start" gap={2}>
				{#if fileType === 'image'}
					<Icon ariaLabel="Upload image">{ICON_IMAGE}</Icon>
				{/if}
				<Button
					cls={cubeCss({ utilClass: 'z-index-high' })}
					attachments={['capsule', 'small-pad']}
					on:click={handleButtonClick}>Browse files</Button
				>
				<p class="[ fs-350 text-ellipsis-1 ]">{fileName}</p>
			</Flex>
		{/if}

		<input
			bind:this={inputEl}
			{id}
			on:input={handleInput}
			type="file"
			class="[ pos-absolute inset-0 opacity-0 width-100 ]"
		/>
	</label>
</div>
