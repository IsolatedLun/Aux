<script lang='ts'>
	import { onMount } from "svelte";
	import { cubeCss } from "../../../../utils/cubeCss/cubeCss";
	import type { Props_CubeCSS_API } from "../../../../utils/cubeCss/types";
	import { autoIndexGridChildren, createGridRow } from "../utils";
	import { GRID_CHILD_STR } from "../../../../consts/consts";

    onMount(() => {
        let gridArea = '';

        area.forEach(row => gridArea += createGridRow(row))

        _this.style.gridTemplateAreas = gridArea;
        
        const indices = autoIndexGridChildren(_this);
        _this.style.setProperty('--_mobile-grid-area', `"${indices.join('" "')}"`);
    })

    

    export const cls: Props_CubeCSS_API = cubeCss({});
    export let autoCollapse: boolean = true;
    export let area: number[][];

    const cssCls = cls.to_string({
        blockClass: 'grid grid-area'
    });

    let _this: HTMLElement;
</script>

<div class={cssCls} bind:this={_this} data-collapse={autoCollapse}>
    <slot />
</div>