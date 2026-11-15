const PACKAGE = "svelte-glyph-roll";

const INSTALL_COMMANDS = {
	npm: `npm install ${PACKAGE}`,
	pnpm: `pnpm add ${PACKAGE}`,
	yarn: `yarn add ${PACKAGE}`,
	bun: `bun add ${PACKAGE}`,
} as const;

type PackageManager = keyof typeof INSTALL_COMMANDS;

const QUICK_START = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

	let count = $state(0);
</script>

<GlyphRoll value={count} style="font-size: 48px" monospacedDigits />

<button onclick={() => count++}>Increment</button>`;

const COUNTER_EXAMPLE = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

	let count = $state(1234);
</script>

<GlyphRoll value={count} style="font-size: 56px; font-weight: 600" monospacedDigits />

<button onclick={() => (count -= 1)}>−</button>
<button onclick={() => (count += 1)}>+</button>`;

const PRICE_EXAMPLE = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

	// Shared by the glyphs and the colour, so both settle together.
	const duration = 420;

	let price = $state(184.32);
	let previous = $state(184.32);

	$effect(() => {
		const id = setInterval(() => {
			previous = price;
			price = Math.max(1, price + (Math.random() - 0.5) * 4);
		}, 1600);
		return () => clearInterval(id);
	});

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
</script>

<GlyphRoll
	value={formatter.format(price)}
	{duration}
	style="font-size: 40px; font-weight: 600; color: {price >= previous ? '#16a34a' : '#dc2626'}; transition: color {duration}ms"
	monospacedDigits
/>`;

const CLOCK_EXAMPLE = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

	const format = (date: Date) =>
		date.toLocaleTimeString("en-GB", { hour12: false });

	let time = $state(format(new Date()));

	$effect(() => {
		const id = setInterval(() => (time = format(new Date())), 1000);
		return () => clearInterval(id);
	});
</script>

<!-- A clock is not a number, so pin the direction. -->
<GlyphRoll value={time} direction="up" style="font-size: 40px" monospacedDigits />`;

const COUNTDOWN_EXAMPLE = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

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
/>`;

const STATUS_EXAMPLE = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

	const steps = ["Save", "Saving…", "Saved"];

	let index = $state(0);

	$effect(() => {
		const id = setInterval(() => {
			index = (index + 1) % steps.length;
		}, 1400);
		return () => clearInterval(id);
	});
</script>

<!-- Text has no numeric order, so pin the direction. -->
<GlyphRoll value={steps[index]} direction="up" style="font-size: 40px; font-weight: 600" />`;

const WEATHER_EXAMPLE = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

	const forecast = ["☀️ Sunny", "⛅ Cloudy", "🌧️ Rainy", "❄️ Snowy"];

	let index = $state(0);

	$effect(() => {
		const id = setInterval(() => {
			index = (index + 1) % forecast.length;
		}, 1600);
		return () => clearInterval(id);
	});
</script>

<!-- Each emoji is one glyph, even when it is several code points. -->
<GlyphRoll value={forecast[index]} direction="up" style="font-size: 40px; font-weight: 600" />`;

const TABLE_FOOTER_EXAMPLE = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

	const columns = ["orders", "units", "revenue"] as const;
	type Column = (typeof columns)[number];

	const rows = $state([
		{ region: "North", orders: 128, units: 342, revenue: 18240 },
		{ region: "East", orders: 96, units: 271, revenue: 14385 },
		{ region: "South", orders: 143, units: 389, revenue: 21960 },
		{ region: "West", orders: 87, units: 214, revenue: 11530 },
	]);

	// Every region takes new orders at once, so every cell and every total changes together.
	$effect(() => {
		const id = setInterval(() => {
			for (const row of rows) {
				const orders = 1 + Math.floor(Math.random() * 4);
				row.orders += orders;
				row.units += orders * (1 + Math.floor(Math.random() * 3));
				row.revenue += orders * (40 + Math.floor(Math.random() * 120));
			}
		}, 2400);
		return () => clearInterval(id);
	});

	// Each cell waits one step per row and one per column, so the change sweeps diagonally from
	// the top-left cell down to the last total. Exaggerated to make the stagger easy to see.
	const STEP = 90;
	const delay = (row: number, column: number) => (row + column) * STEP;

	const totals = $derived(
		columns.map((column) => rows.reduce((sum, row) => sum + row[column], 0)),
	);

	const count = new Intl.NumberFormat("en-US");
	const currency = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	});

	const format = (column: Column, value: number) =>
		column === "revenue" ? currency.format(value) : count.format(value);
</script>

<table>
	<thead>
		<tr>
			<th scope="col">Region</th>
			<th scope="col">Orders</th>
			<th scope="col">Units</th>
			<th scope="col">Revenue</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as row, rowIndex (row.region)}
			<tr>
				<th scope="row">{row.region}</th>
				{#each columns as column, columnIndex (column)}
					<td>
						<GlyphRoll
							value={format(column, row[column])}
							delay={delay(rowIndex, columnIndex)}
							alignment="end"
							monospacedDigits
						/>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<th scope="row">Total</th>
			{#each columns as column, columnIndex (column)}
				<!-- The footer is the row after the last one, so the totals land last. -->
				<td>
					<GlyphRoll
						value={format(column, totals[columnIndex])}
						delay={delay(rows.length, columnIndex)}
						alignment="end"
						monospacedDigits
					/>
				</td>
			{/each}
		</tr>
	</tfoot>
</table>`;

const TEXT_EXAMPLE = `<!-- Both labels start with "Sav", so only the ending rolls. -->
<GlyphRoll value={saving ? "Saving…" : "Saved"} direction="up" />`;

const INLINE_EXAMPLE = `<script lang="ts">
	import { GlyphRoll } from "svelte-glyph-roll";

	let readers = $state(97);

	$effect(() => {
		const id = setInterval(() => {
			// Hover around 100 so the count keeps gaining and losing a digit.
			readers += readers < 100 ? 2 : Math.random() < 0.5 ? -3 : 1;
		}, 1500);
		return () => clearInterval(id);
	});
</script>

<!-- Inherits the paragraph's font and sits on its baseline. -->
<p>
	Right now, <GlyphRoll value={readers} style="font-weight: 600" /> people are reading this page,
	and the sentence makes room as the count grows.
</p>`;

const TUNING_EXAMPLE = `<GlyphRoll
	value={value}
	duration={700}
	bounce={0.7}
	travel={0.6}
	enterScale={0.2}
	blurIntensity={3}
	maxBlurRadius={12}
/>`;

const TYPOGRAPHY_EXAMPLE = `<p class="distance">
	<GlyphRoll value="42,195 km" />
</p>

<style>
	.distance {
		font: italic 700 32px Georgia, serif;
		letter-spacing: -0.5px;
		color: rebeccapurple;
	}
</style>`;

const FORMATTING_EXAMPLE = `<script lang="ts">
	const euro = new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "EUR",
	});

	let amount = $state(1299.5);
</script>

<!-- "1.299,50 €": align around the comma, not the dot. -->
<GlyphRoll value={euro.format(amount)} decimalSeparator="," monospacedDigits />`;

const ATTRIBUTES_EXAMPLE = `<GlyphRoll
	value={score}
	class="score"
	style="vertical-align: middle"
	data-testid="score"
/>`;

const STATIC_EXAMPLE = `<!-- Only animate after the user interacts. -->
<GlyphRoll value={total} animated={hasInteracted} />`;

export type { PackageManager };
export {
	ATTRIBUTES_EXAMPLE,
	CLOCK_EXAMPLE,
	COUNTDOWN_EXAMPLE,
	COUNTER_EXAMPLE,
	FORMATTING_EXAMPLE,
	INLINE_EXAMPLE,
	INSTALL_COMMANDS,
	PACKAGE,
	PRICE_EXAMPLE,
	QUICK_START,
	STATIC_EXAMPLE,
	STATUS_EXAMPLE,
	TABLE_FOOTER_EXAMPLE,
	TEXT_EXAMPLE,
	TUNING_EXAMPLE,
	TYPOGRAPHY_EXAMPLE,
	WEATHER_EXAMPLE,
};
