<script lang='ts'>
	import { createEventDispatcher, onMount } from "svelte";
	import { createHeaders, createRequest } from "../../../services/service";
	import { HTTP_METHODS } from "../../../services/types";
	import type { Props_PaginatorResponse } from "./types";
	import AutoSkeletron from "../../Modules/Skeletron/AutoSkeletron.svelte";
	import SongCard from "../../Modules/SongCard/SongCard.svelte";
	import { authStore } from "../../../stores/authStore";

    onMount(() => {
        let options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.25
		};

		observer = new IntersectionObserver(handleIntersection, options);
		observer.observe(intersectionEl);

        reset();
    })

    function reset() {
        results = [];
        next_page = 1;
    }

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
            urlFn(next_page), null, HTTP_METHODS.GET, includeAuthHeader ? createHeaders({}, ['auth']) : {}
        );

        let _results = [...results, ...data.results];
        results = filterFn ?  filterFn(_results) : _results;
        next_page = data.next_page;

        isFetching = false;
        dispatch('update', results);
    }

    export let includeAuthHeader = false;
    export let urlFn: (n: number) => string;
    export let filterFn: ((results: any[]) => any[]) | null = null;
    export let component: ConstructorOfATypedSvelteComponent;

    export let results: any[] = [];
    
    let observer: IntersectionObserver;
    let isFetching = false;
    let next_page: number | null = 1;

    let intersectionEl: HTMLElement;

    const dispatch = createEventDispatcher();
</script>

{#each results as result, i}
    <svelte:component this={component} props={result} {i} />
{/each}
{#if isFetching && next_page !== null}
    <AutoSkeletron>
        <SongCard />
    </AutoSkeletron>
{/if}
<div bind:this={intersectionEl} class="[ paginator__intersection ]" aria-hidden="true" />