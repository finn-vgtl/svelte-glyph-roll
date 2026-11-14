<script lang="ts">
	import CopyButton from "./CopyButton.svelte";
	import { highlighter } from "./highlight";

	let {
		code,
		title,
		lang = "svelte",
		maxHeight,
	}: {
		code: string;
		title?: string;
		/** Language to highlight the code as. */
		lang?: "css" | "html" | "js" | "svelte" | "ts";
		/** Caps the height of the code; longer code scrolls. Any CSS length. */
		maxHeight?: string;
	} = $props();

	const tokens = $derived(highlighter.tokenize(code, { lang }).tokens);
</script>

<figure class="code-block">
	<figcaption>
		<span>{title ?? ""}</span>
		<CopyButton text={code} label="Copy code" />
	</figcaption>
	<!-- Focusable when its height is capped, so keyboard users can scroll it too. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre style:max-height={maxHeight} tabindex={maxHeight ? 0 : undefined}><code
		>{#each tokens as token, index (index)}{#if token.className}<span class="th-{token.className}"
					>{token.value}</span
				>{:else}{token.value}{/if}{/each}</code
	></pre>
</figure>

<style>
	.code-block {
		margin: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--code-bg);
		color: var(--th-token);
		overflow: hidden;
		min-width: 0;
	}

	figcaption {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.4rem 0.5rem 0.4rem 1rem;
		border-bottom: 1px solid var(--border);
		font-size: 0.8rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
	}

	pre {
		margin: 0;
		padding: 1rem;
		overflow: auto;
		tab-size: 2;
		font-size: 0.85rem;
		line-height: 1.6;
	}
</style>
