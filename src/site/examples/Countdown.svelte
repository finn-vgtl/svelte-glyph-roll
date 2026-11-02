<script lang="ts">
	import { GlyphRoll } from "#lib";

	let seconds = $state(10);

	$effect(() => {
		const id = setInterval(() => {
			seconds = seconds === 0 ? 10 : seconds - 1;
		}, 1000);
		return () => clearInterval(id);
	});
</script>

<GlyphRoll
	value={seconds}
	direction="down"
	bounce={0}
	travel={1}
	enterScale={1}
	style="font-size: 56px; font-weight: 700"
	monospacedDigits
/>
