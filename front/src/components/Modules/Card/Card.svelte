<script lang="ts">
	import { onMount } from 'svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import type { BorderRadiusTypes, CardVariants } from './types';

	onMount(() => {
		use(_this);
	});

	export let cls = cubeCss({});
	export let variant: CardVariants = 'primary';
    export let padding = 1;
    export let borderRadius: BorderRadiusTypes = 'bevelled';
	export let use: (_this: HTMLElement) => void = () => null;

    let _this: HTMLElement;

	const _class = cls.to_string({
		compostClass: 'card',
        utilClass: `padding-${padding} border-radius-${borderRadius}`
	});
</script>

<div class="{_class}" bind:this={_this} data-variant='{variant}'>
    <slot />
</div>
