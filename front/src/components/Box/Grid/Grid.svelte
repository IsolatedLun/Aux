<script lang="ts">
	import { onMount } from 'svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import type { GridPlacementTypes } from './types';

	onMount(() => {
		use(_this!);
	});

	export let id = '';
	export let tag = 'div';
	export let cls = cubeCss({});
	export let align: GridPlacementTypes = 'start';
	export let columns = 0;
	export let gap: string | number = 1;

	export let collapseOnMobile = false;
	export let alignCenterOnMobile = false;
	
	export let use: (_this: HTMLElement) => void = () => null;
	const _class = cls.to_string({
		utilClass: `grid place-items-${align} gap-${gap} grid-template-columns-${columns}`
	});
	export let _this: HTMLElement | null = null;
</script>

<svelte:element
	this={tag}
	{id}
	class={_class}
	bind:this={_this}
	data-collapse={collapseOnMobile}
	data-center-on-mobile={alignCenterOnMobile}
>
	<slot />
</svelte:element>