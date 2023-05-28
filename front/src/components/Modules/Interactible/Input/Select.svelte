<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';
	import Flex from '../../../Box/Flex/Flex.svelte';
	import type { SelectOption, TextInputAttachments } from './types';
	import Icon from '../../Icon/Icon.svelte';
	import Button from '../Button/Button.svelte';
	import type { KeyValue } from '../../../../types';

	onMount(() => {
		id = crypto.randomUUID();
		use(_this);
	});

	function handleSelect(e: InputEvent) {
		dispatch('select', (e.target as HTMLSelectElement).value);
	}

	export let cls = cubeCss({});
	export let use: (_this: HTMLElement) => void = () => null;
    export let options: SelectOption[] = [];

	export let id = '';

	const dispatch = createEventDispatcher();

	const _class = cls.to_string({
		compostClass: 'input',
		utilClass: 'outline-none'
	});

	let _this: HTMLElement;
</script>

<select class="{_class}" {id}>
    {#each options as option}
        <option value="{option.value}">{option.text}</option>
    {/each}
</select>
