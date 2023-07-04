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

	function handleSelect(e: Event) {
		const target = (e.target as HTMLSelectElement);
		const [key, value] = [target.textContent, target.value];

		dispatch('select', {key, value});
	}

	export let cls = cubeCss({});
	export let use: (_this: HTMLElement) => void = () => null;
    export let options: Record<string, string>[] = [];

	export let id = '';

	const dispatch = createEventDispatcher();

	const _class = cls.to_string({
		compostClass: 'input',
		utilClass: 'outline-none'
	});

	let _this: HTMLElement;
</script>

<select class="{_class}" bind:this={_this} {id}>
	<option disabled selected value>-- Select option --</option>
    {#each options as option}
        <option on:click={handleSelect} value="{Object.values(option)[1]}">{Object.values(option)[0]}</option>
    {/each}
</select>
