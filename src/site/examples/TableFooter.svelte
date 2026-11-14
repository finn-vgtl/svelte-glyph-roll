<script lang="ts">
	import { GlyphRoll } from "#lib";

	const columns = ["orders", "units", "revenue"] as const;
	type Column = (typeof columns)[number];

	const rows = $state([
		{ region: "North", orders: 128, units: 342, revenue: 18240 },
		{ region: "East", orders: 96, units: 271, revenue: 14385 },
		{ region: "South", orders: 143, units: 389, revenue: 21960 },
		{ region: "West", orders: 87, units: 214, revenue: 11530 },
	]);

	// One region takes new orders, so its row and every total change at once.
	$effect(() => {
		const id = setInterval(() => {
			const row = rows[Math.floor(Math.random() * rows.length)];
			const orders = 1 + Math.floor(Math.random() * 4);
			row.orders += orders;
			row.units += orders * (1 + Math.floor(Math.random() * 3));
			row.revenue += orders * (40 + Math.floor(Math.random() * 120));
		}, 1800);
		return () => clearInterval(id);
	});

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
		{#each rows as row (row.region)}
			<tr>
				<th scope="row">{row.region}</th>
				{#each columns as column (column)}
					<td>
						<GlyphRoll value={format(column, row[column])} alignment="end" monospacedDigits />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<th scope="row">Total</th>
			{#each columns as column, index (column)}
				<!-- The edited row rolls first, then the totals follow 60 ms apart. -->
				<td>
					<GlyphRoll
						value={format(column, totals[index])}
						delay={(index + 1) * 60}
						alignment="end"
						monospacedDigits
					/>
				</td>
			{/each}
		</tr>
	</tfoot>
</table>

<style>
	table {
		width: 100%;
		max-width: 26rem;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	th,
	td {
		padding: 0.4rem 0.5rem;
		text-align: end;
		white-space: nowrap;
	}

	th:first-child {
		text-align: start;
	}

	thead th {
		color: var(--text-muted);
		font-weight: 500;
		border-bottom: 1px solid var(--border);
	}

	tbody th {
		font-weight: 400;
	}

	tfoot th,
	tfoot td {
		font-weight: 600;
		border-top: 1px solid var(--border-strong);
	}
</style>
