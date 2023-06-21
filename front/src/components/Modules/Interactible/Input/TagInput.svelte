<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ICON_TIMES } from '../../../../consts/icons';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';
	import Flex from '../../../Box/Flex/Flex.svelte';
	import Icon from '../../Icon/Icon.svelte';
	import Button from '../Button/Button.svelte';
	import TextInput from './TextInput.svelte';

	function handleInput(e: Event) {
		text = (e.target as HTMLInputElement).value;
        if(tags.includes(text.slice(0, -1))) {
                return;
        }

		else if (text.length > 1 && !(new Set(text).size === 1) && text.at(-1) === ',') {
			tags = [...tags, text.slice(0, -1).replaceAll(',', '')];
			text = '';
		}
	}

	function handleTagClick(tag: string) {
		dispatch('remove', tag);
	}

	export let tags: string[] = [];

	let text = '';

	const dispatch = createEventDispatcher();
</script>

<Flex useColumn={true} gap={2}>
	<TextInput
		bind:value={text}
		label="Tags"
		showLabel={true}
		placeholder="Enter a tag and insert a comma"
		on:input={(e) => handleInput(e.detail)}
	/>
	<Flex justify="start" cls={cubeCss({ utilClass: 'flex-wrap' })}>
		{#each tags as tag}
			<Button variant="secondary" attachments={['hologram']} on:click={() => handleTagClick(tag)}>
				<Flex gap={1} align="center">
					{tag}
					<Icon ariaLabel="Remove tags ">{ICON_TIMES}</Icon>
				</Flex>
			</Button>
		{/each}
	</Flex>
</Flex>
