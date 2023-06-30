<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import { cubeCss } from "../../../utils/cubeCss/cubeCss";

    export let id: string;
	export let cls = cubeCss({});

	const _class = cls.to_string({
        compostClass: 'form',
        utilClass: 'grid place-items-center margin-inline-auto'
    })
    const dispatch = createEventDispatcher();
</script>

<form {id} class={_class} on:submit={(e) => dispatch('submit', e)}>
	<slot />
</form>