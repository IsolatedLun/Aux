<script lang="ts">
	import { ICON_UPLOAD } from "../../../../consts/icons";
	import { cubeCss } from "../../../../utils/cubeCss/cubeCss";
	import Flex from "../../../Box/Flex/Flex.svelte";
	import Icon from "../../Icon/Icon.svelte";
	import Button from "../Button/Button.svelte";

	export let fileType: string;
	export let variant = 'default';
</script>

<div
	class="[ drag-drop-input-container ] [ pos-relative ]" data-variant={variant}
>
    <Flex useColumn={true} align='center' gap={2}>
        <Icon cls={cubeCss({utilClass: 'fs-500'})} ariaLabel='Upload icon'>{ICON_UPLOAD}</Icon>
        <p class="[ fs-350 text-align-center ]">
            Drag & drop or upload your <span class="[ underline ]">{fileType}</span> file
        </p>
        <p class="[ clr-text-muted ]">OR</p>
        <Button>Browse files</Button>
    </Flex>

    <input type="file" class="[ pos-absolute inset-0 opacity-0 width-100 ]" />
</div>
