<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { cubeCss } from '../../../../utils/cubeCss/cubeCss';
	import Flex from '../../../Box/Flex/Flex.svelte';
	import type { TextInputAttachments } from './types';
	import Icon from '../../Icon/Icon.svelte';
	import Button from '../Button/Button.svelte';
	import type { Some } from '../../../../types';

	onMount(() => {
		id = crypto.randomUUID();
		use(_this!);
	});

	function handleInput(e: Event) {
		dispatch('input', e);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter')
			dispatch('enter');
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

	const dispatch = createEventDispatcher();

	const _class = cls.to_string({
		compostClass: 'input width-100',
		utilClass: 'outline-none'
	});
	const _wrapperCombinedClass = wrapperCls.combine({
		blockClass: 'input-container',
		utilClass: 'pos-relative width-100'
	});

	export let _this: Some<HTMLElement> = null;
</script>

<Flex cls={cubeCss(_wrapperCombinedClass)} useColumn={true} use={(e) => e.setAttribute('data-variant', variant)}>
	<label for={id} hidden={!showLabel}>
		{label}
	</label>
	<div class="[ pos-relative width-100 ]">
		<input
			bind:this={_this}
			bind:value={value}
			
			on:input={handleInput}
			on:keydown={handleKeyDown}

			class={_class}
			data-variant={variant}
			data-attachments={attachments.join(',')}
			{id}
			type='text'
			{placeholder}
		/>

		{#if endIcon}
			<Button
				cls={cubeCss({ blockClass: 'input-end-button', utilClass: 'pos-absolute' })}
				attachments={['transparent']}
				on:click={() => dispatch('endButtonClick', _this)}
			>
				<Icon ariaLabel="">{endIcon}</Icon>
			</Button>
		{/if}
	</div>
</Flex>
