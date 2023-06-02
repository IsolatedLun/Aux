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
	export let placeholder: string;
	export let use: (_this: HTMLElement) => void = () => null;
	export let showLabel = false;

	export let id = '';
	export let value = '';

	export let endIcon: string | null = null;
	export let endButtonAction: (_this: HTMLElement) => void = () => null;

	const dispatch = createEventDispatcher();

	const _class = cls.to_string({
		compostClass: 'input width-100',
		utilClass: 'outline-none'
	});
	const _wrapperCombinedClass = wrapperCls.combine({
		blockClass: 'input-container',
		utilClass: 'pos-relative width-100'
	});

	let _this: HTMLElement;
</script>

<Flex cls={cubeCss(_wrapperCombinedClass)} useColumn={true} use={(e) => e.setAttribute('data-variant', variant)}>
	<label for={id} hidden={!showLabel}>
		{label}
	</label>
	<input
		bind:this={_this}
		bind:value={value}
		class={_class}
		data-variant={variant}
		data-attachments={attachments.join(',')}
		on:input={handleInput}
		{id}
		type='text'
		{placeholder}
	/>

	{#if endIcon}
		<Button
			cls={cubeCss({ blockClass: 'input-end-button', utilClass: 'pos-absolute' })}
			attachments={['transparent']}
			on:click={() => endButtonAction(_this)}
		>
			<Icon ariaLabel="">{endIcon}</Icon>
		</Button>
	{/if}
</Flex>
