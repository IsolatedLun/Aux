<script lang="ts">
	import { ICON_SEARCH } from '../../../consts/icons';
	import Flex from '../../Box/Flex/Flex.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
</script>

<nav class="[ primary-navbar ]">
	<Flex align="center" justify="space-between">
		<h1 class="[ fw-lighter ]">Aux</h1>
		<TextInput
			label="Search songs"
			placeholder="Search songs..."
			attachments={['border-bottom', 'shadow-none', 'transparent']}
			endIcon={ICON_SEARCH}
		/>
		<ul>LOL</ul>
	</Flex>
</nav>
