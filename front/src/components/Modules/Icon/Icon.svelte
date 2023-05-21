<script lang="ts">
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";


	export let tag = 'span';
	export let cls = cubeCss({});

	const _class = cls.to_string({
        compostClass: 'icon',
        utilClass: 'ignore-self'
    })
</script>

<svelte:element this={tag} class={_class} aria-hidden="true">
	<slot />
</svelte:element>