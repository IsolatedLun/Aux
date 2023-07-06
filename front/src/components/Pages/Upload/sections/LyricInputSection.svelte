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

	function handleRemove(name: string) {
		dispatch('remove', name);
	}

	export let lyrics: Record<string, string>;
	let wrapLanguageInputs = false;

	const dispatch = createEventDispatcher();
</script>

<Flex
	cls={cubeCss({ utilClass: 'width-100 margin-block-start-2' })}
	align="center"
	justify="space-between"
>
	<h3>Languages:</h3>
	<CheckboxInput label="Wrap inputs" bind:bool={wrapLanguageInputs} />
</Flex>

{#if Object.keys(lyrics).length === 0}
	<p class="[ clr-text-muted ] [ padding-1 ]">No languages added</p>
{/if}

{#key wrapLanguageInputs}
	<Flex
		cls={cubeCss({ utilClass: `width-100 margin-block-1 flex-wrap` })}
		justify="space-between"
		align="start"
		useColumn={!wrapLanguageInputs}
	>
		{#each Object.keys(lyrics) as lyric}
			<Flex align="center" cls={cubeCss({ utilClass: !wrapLanguageInputs ? 'width-100' : '' })}>
				<p class="[ fs-350 ]">{lyric}:</p>
				<FileInput fileType="any" variant="compact" on:file={(e) => handleInput(e.detail, lyric)} />
				<Button
					on:click={() => handleRemove(lyric)}
					variant="error"
					attachments={['capsule', 'small-pad']}
					><Icon ariaLabel="Remove language">{ICON_TIMES}</Icon></Button
				>
			</Flex>
		{/each}
	</Flex>
{/key}
