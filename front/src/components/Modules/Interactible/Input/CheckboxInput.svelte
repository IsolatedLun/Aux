<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';
	import Flex from '../../../Box/Flex/Flex.svelte';
	import type { TextInputAttachments } from './types';
	import Icon from '../../Icon/Icon.svelte';
	import Button from '../Button/Button.svelte';

	onMount(() => {
		id = crypto.randomUUID();
		use(_this);
	});

	function handleInput(e: Event) {
		dispatch('input', e);
	}

	export let cls = cubeCss({});
	export let wrapperCls = cubeCss({});
	export let variant = 'primary';
	export let attachments: TextInputAttachments[] = [];
	export let label: string;
	export let use: (_this: HTMLElement) => void = () => null;
	export let showLabel = true;

	export let id = '';
	export let bool = false;

	const dispatch = createEventDispatcher();

	const _class = cls.to_string({
		compostClass: 'input',
		utilClass: 'outline-none'
	});
	const _wrapperCombinedClass = wrapperCls.combine({
		blockClass: 'input-container',
		utilClass: 'pos-relative width-100'
	});

	let _this: HTMLElement;
</script>

<Flex
	cls={cubeCss(_wrapperCombinedClass)}
	gap={2}
	align="center"
	justify="start"
	use={(e) => e.setAttribute('data-variant', variant)}
>
	<input
		bind:this={_this}
		bind:checked={bool}
		class={_class}
		data-variant={variant}
		data-attachments={attachments.join(',')}
		on:input={handleInput}
		{id}
		type="checkbox"
	/>
	<label for={id} hidden={!showLabel}>
		{label}
	</label>
</Flex>
