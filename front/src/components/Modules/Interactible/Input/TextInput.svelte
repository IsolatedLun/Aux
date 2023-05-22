<script lang='ts'>
	import { createEventDispatcher, onMount } from "svelte";
	import { cubeCss } from "../../../../utils/cubeCss/cubeCss";
	import Flex from "../../../Box/Flex/Flex.svelte";

    onMount(() => {
        id = crypto.randomUUID();
		use(_this);
	});

	function handleInput(e: MouseEvent) {
		dispatch('input', e);
	}

	export let cls = cubeCss({});
    export let wrapperCls = cubeCss({});
	export let variant = 'primary';
	export let attachments: string[] = [];
    export let type = 'text'
    export let label: string;
    export let placeholder: string;
	export let use: (_this: HTMLElement) => void = () => null;
    export let showLabel = false;

    export let id = '';

	const dispatch = createEventDispatcher();

	const _class = cls.to_string({
		compostClass: 'input width-100',
        utilClass: 'outline-none'
	});
    const _wrapperCombinedClass = wrapperCls.combine({
		blockClass: 'input-container',
        utilClass: 'width-100'
	});

	let _this: HTMLElement;
</script>

<Flex cls={cubeCss(_wrapperCombinedClass)} useColumn={true}>
    <label for={id} hidden={!showLabel}>
        {label}
    </label>
    <input 
        bind:this={_this}
        class={_class}
        data-variant={variant}
        data-attachments={attachments.join(',')}
        on:click={handleInput}

        {id}
        {type}
        {placeholder}
    />
</Flex>