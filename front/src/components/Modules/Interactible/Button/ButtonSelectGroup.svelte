<script lang='ts'>
	import { onMount } from "svelte";
	import { cubeCss } from "../../../../utils/cubeCss/cubeCss";
	import Flex from "../../../Box/Flex/Flex.svelte";

    onMount(() => {
        let buttons = _this.querySelectorAll('.button') as NodeListOf<HTMLButtonElement>; 
        buttons.forEach((btn, i) => btn.setAttribute('data-index', String(i)));

        _this.addEventListener('click', (e) => {
            const currentButton = e.target as HTMLButtonElement;
            if (!currentButton.classList.contains('button')) {
                return;
            }
            
            const currentButtonIndex = currentButton.getAttribute('data-index');
            currentButton.setAttribute(
                'data-selected', 
                'true'
            ); // String(currentButton.getAttribute('data-selected') !== 'true')

            buttons.forEach(btn => 
                btn.getAttribute('data-index') !== currentButtonIndex
                ? btn.setAttribute('data-selected', 'false')
                : null
            )
        });

        buttons[initialIdx].click();
    })

	export let cls = cubeCss({});
    export let initialIdx = 0;

	const _combinedClass = cls.combine({
        blockClass: 'button-select-group'
    })

    let _this: HTMLElement;
</script>

<div class="[ button-select-group-wrapper ]">
    <Flex cls={cubeCss(_combinedClass)} bind:_this={_this}>
        <slot />
    </Flex>
</div>