<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import { cubeCss } from "../../../utils/cubeCss/cubeCss";
	import Card from "../Card/Card.svelte";
	import Flex from "../../Box/Flex/Flex.svelte";

    export let id: string;
	export let cls = cubeCss({});
    export let title = '';
    export let formError = '';

	const _class = cls.to_string({
        compostClass: 'form',
        utilClass: 'grid place-items-center margin-inline-auto'
    })
    const dispatch = createEventDispatcher();
</script>

<form {id} class={_class} on:submit={(e) => dispatch('submit', e)}>
    <Flex cls={cubeCss({ utilClass: 'width-100' })} useColumn={true} gap={2}>
        {#if title}
            <h2 class="[ margin-inline-auto margin-block-end-1 ]">{title}</h2>
        {/if}
        {#if formError}
            <Card variant='error' cls={cubeCss({utilClass: 'align-self-center margin-block-end-2'})}>
                <p>{formError}</p>
            </Card>
        {/if}
        <slot />
    </Flex>
</form>