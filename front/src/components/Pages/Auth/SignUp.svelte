<script lang='ts'>
	import { ICON_EYE } from "../../../consts/icons";
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";
	import Flex from "../../Box/Flex/Flex.svelte";
	import Form from "../../Modules/Form/Form.svelte";
	import Button from "../../Modules/Interactible/Button/Button.svelte";
    import FileInput from "../../Modules/Interactible/Input/FileInput.svelte";
    import TextInput from "../../Modules/Interactible/Input/TextInput.svelte";


</script>

<Form id='signup-form'>
    <Flex cls={cubeCss({utilClass: 'width-100'})} useColumn={true} gap={2}>
        <h2 class="[ margin-inline-auto margin-block-end-1 ]">Sign up</h2>
        <Flex cls={cubeCss({utilClass: 'width-100'})} collapseOnMobile={true}>
            <TextInput label='Username' placeholder='Enter username' showLabel={true} />
            <TextInput label='Email Address' placeholder='Enter email address' showLabel={true} />
        </Flex>
        <TextInput label='Password' placeholder='Enter password' showLabel={true} endIcon={ICON_EYE} />
        <FileInput cls={cubeCss({utilClass: 'margin-block-2'})} fileType='image' variant='compact' />
        <Button>Sign up</Button>
        <a href="#">Already have an account?</a>
    </Flex>
</Form>