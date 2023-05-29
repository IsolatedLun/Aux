<script lang='ts'>
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";

    export let cls = cubeCss({});

    let _class = cls.to_string({
        blockClass: 'auto-skeletron',
    })
</script>

<div class="{_class}">
    <slot />
</div>