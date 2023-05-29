<script lang='ts'>
	import { onMount } from "svelte";
	import { createRequest } from "../../../services/service";
	import { HTTP_METHODS } from "../../../services/types";
	import type { Props_PaginatorResponse } from "./types";
	import AutoSkeletron from "../../Modules/Skeletron/AutoSkeletron.svelte";
	import SongCard from "../../Modules/SongCard/SongCard.svelte";

    onMount(() => {
        let options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.25
		};

		observer = new IntersectionObserver(handleIntersection, options);
		observer.observe(intersectionEl);
    })

    function handleIntersection(
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				if (!isFetching) get_next();
				break;
			}
		}
	}

    async function get_next() {
        isFetching = true;

        if (next_page === null) {
            return;
        }

        const data = await createRequest<null, Props_PaginatorResponse>(
            urlFn(next_page), null, HTTP_METHODS.GET, {}
        );
        results = [...results, ...data.results];

        isFetching = false;
    }

    export let urlFn: (n: number) => string;
    export let component: ConstructorOfATypedSvelteComponent;
    export let componentContainer: ConstructorOfATypedSvelteComponent;

    let observer: IntersectionObserver;
    let isFetching = false;
    let results: any[] = [];
    let next_page: number | null = 1;

    let intersectionEl: HTMLElement;
</script>

<div class="[ paginator ]">
    <div class="[ results ]">
        <svelte:component this={componentContainer}>
            {#if isFetching}
                <AutoSkeletron>
                    <SongCard />
                </AutoSkeletron>
                {:else}
                    {#each results as result}
                        <svelte:component this={component} props={result} />
                    {/each}
            {/if}
        </svelte:component>
    </div>
    <div bind:this={intersectionEl} class="[ paginator__intersection ]" aria-hidden="true" />
</div>