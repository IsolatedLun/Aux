<script lang='ts'>
	import { onMount } from "svelte";
	import { cubeCss } from "../../../../utils/cubeCss/cubeCss";
	import type { Props_CubeCSS_API } from "../../../../utils/cubeCss/types";

    onMount(() => {
        _this.style.gridArea = 'child-' + index;

        use(_this);
    })

    export let cls: Props_CubeCSS_API = cubeCss({});
    export let index: number = -1; // Index is set automatically by the parent

    export let use: (e: HTMLElement) => void = () => null;

    const cssCls = cls.to_string({
        blockClass: 'grid-area-child'
    });

    let _this: HTMLElement;
</script>

<div class={cssCls} bind:this={_this}>
    <slot />
</div>