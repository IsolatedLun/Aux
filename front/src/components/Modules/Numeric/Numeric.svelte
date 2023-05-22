<script lang="ts">
	export let tag = 'span';
	export let value: number;
</script>

<svelte:element this={tag}>
	{Intl.NumberFormat('en', { notation: 'compact' }).format(value)}
</svelte:element>
