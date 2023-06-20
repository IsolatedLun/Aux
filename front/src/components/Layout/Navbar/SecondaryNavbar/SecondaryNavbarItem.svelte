<script lang='ts'>
	import { cubeCss } from "../../../../utils/cubeCss/cubeCss";
	import Flex from "../../../Box/Flex/Flex.svelte";
	import Icon from "../../../Modules/Icon/Icon.svelte";
    import Button from "../../../Modules/Interactible/Button/Button.svelte";
	import type { Props_SecondaryNavbarItem } from "../types";

    export let props: Props_SecondaryNavbarItem;
</script>

<li class="[ width-100 ]">
    <Button cls={cubeCss({utilClass: 'width-100'})} to={props.to} variant={props.buttonVariant} attachments={['big-pad', 'grow']}>
        <Flex cls={cubeCss({utilClass: 'width-100'})} align="center" justify='start'>
            <Icon ariaLabel="">{props.icon}</Icon>
            <span>{props.text}</span>
        </Flex>
    </Button>
</li>