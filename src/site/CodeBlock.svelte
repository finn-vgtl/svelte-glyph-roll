<script lang="ts">
	import CopyButton from "./CopyButton.svelte";

	let {
		code,
		title,
		maxHeight,
	}: {
		code: string;
		title?: string;
		/** Caps the height of the code; longer code scrolls. Any CSS length. */
		maxHeight?: string;
	} = $props();
</script>

<figure class="code-block">
	<figcaption>
		<span>{title ?? ""}</span>
		<CopyButton text={code} label="Copy code" />
	</figcaption>
	<!-- Focusable when its height is capped, so keyboard users can scroll it too. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre style:max-height={maxHeight} tabindex={maxHeight ? 0 : undefined}><code>{code}</code></pre>
</figure>

<style>
	.code-block {
		margin: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--code-bg);
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
