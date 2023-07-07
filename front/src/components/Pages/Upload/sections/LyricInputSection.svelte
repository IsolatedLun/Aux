<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ICON_TIMES } from '../../../../consts/icons';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';
	import Flex from '../../../Box/Flex/Flex.svelte';
	import Icon from '../../../Modules/Icon/Icon.svelte';
	import Button from '../../../Modules/Interactible/Button/Button.svelte';
	import CheckboxInput from '../../../Modules/Interactible/Input/CheckboxInput.svelte';
	import FileInput from '../../../Modules/Interactible/Input/FileInput.svelte';

	async function handleInput(file: File, name: string) {
		const text = await file.text();

		dispatch('input', { text, name });
	}

	function handleTextArea(e: Event, name: string) {
		const target = e.target as HTMLTextAreaElement;
		const text = target.value;

		dispatch('input', { text, name });
	}

	function handleRemove(name: string) {
		dispatch('remove', name);
	}

	export let lyrics: Record<string, string>;

	let wrapLanguageInputs = false;
	let isTextMode = true;

	const dispatch = createEventDispatcher();
</script>

<Flex
	cls={cubeCss({ utilClass: 'width-100 margin-block-start-2' })}
	align="center"
	justify="space-between"
>
	<h3>Languages:</h3>
	<Flex gap={2}>
		<CheckboxInput disabled={isTextMode} label="Wrap" bind:bool={wrapLanguageInputs} />
		<CheckboxInput label="Text mode" bind:bool={isTextMode} />
	</Flex>
</Flex>

{#if Object.keys(lyrics).length === 0}
	<p class="[ clr-text-muted ] [ padding-1 ]">No languages added</p>
{/if}

<Flex
	cls={cubeCss({ utilClass: `width-100 margin-block-1 flex-wrap` })}
	gap={2}
	justify="space-between"
	align="start"
	useColumn={!wrapLanguageInputs}
>
	{#if isTextMode}
		{#each Object.keys(lyrics) as lyric}
			<Flex
				useColumn={true}
				align="start"
				cls={cubeCss({ utilClass: 'width-100' })}
			>
				<p class="[ fs-350 ]">{lyric}:</p>
				<div class="[ input-container ] [ width-100 ]">
					<textarea
						on:input={(e) => handleTextArea(e, lyric)}
						class="[ input ]"
						data-variant="primary"
						name="{lyric}-lyric"
						value={lyrics[lyric]}
						spellcheck={false}
					/>
				</div>
				<Button
					on:click={() => handleRemove(lyric)}
					variant="error"
					attachments={['capsule', 'small-pad']}>Remove</Button
				>
			</Flex>
		{/each}
	{:else}
		{#each Object.keys(lyrics) as lyric}
			<Flex align="center" cls={cubeCss({ utilClass: !wrapLanguageInputs ? 'width-100' : '' })}>
				<p class="[ fs-350 ]">{lyric}:</p>
				<FileInput
					fileType="any"
					variant="compact"
					on:file={(e) => handleInput(e.detail, lyric)}
				/>
				<Button
					on:click={() => handleRemove(lyric)}
					variant="error"
					attachments={['capsule', 'small-pad']}
					><Icon ariaLabel="Remove language">{ICON_TIMES}</Icon></Button
				>
			</Flex>
		{/each}
	{/if}
</Flex>
