<script lang="ts">
	import { ICON_SEARCH } from '../../../consts/icons';
	import Flex from '../../Box/Flex/Flex.svelte';
	import TextInput from '../../Modules/Interactible/Input/TextInput.svelte';
	import NavbarUserProfile from './NavbarUserProfile.svelte';
	import SecondaryNavbar from './SecondaryNavbar/SecondaryNavbar.svelte';

	export let secondaryNavbarExpanded = false;
</script>

<nav class="[ primary-navbar ] [ margin-block-end-2 ]">
	<Flex align="center" justify="space-between">
		<h1 class="[ fw-lighter ]">
			<a href="/">Aux</a>
		</h1>
		<TextInput
			label="Search songs"
			placeholder="Search songs..."
			attachments={['border-bottom', 'shadow-none', 'transparent', 'border-neutral']}
			endIcon={ICON_SEARCH}
		/>
		<NavbarUserProfile on:click={() => secondaryNavbarExpanded = true} />
	</Flex>
</nav>

<SecondaryNavbar on:close={() => secondaryNavbarExpanded = false} expanded={secondaryNavbarExpanded} />
