import { describe, expect, it } from "vitest";

import {
	alignmentFromProp,
	directionFromProp,
	GlyphRollAlignment,
	TransitionDirection,
} from ".";

describe("alignmentFromProp", () => {
	it.each([
		["start", GlyphRollAlignment.Leading],
		["center", GlyphRollAlignment.Center],
		["end", GlyphRollAlignment.Trailing],
	])("maps %s", (prop, alignment) => {
		expect(alignmentFromProp(prop)).toBe(alignment);
	});

	it.each([undefined, null, "", "left", "CENTER"])(
		"falls back to leading for %s",
		(prop) => {
			expect(alignmentFromProp(prop)).toBe(GlyphRollAlignment.Leading);
		},
	);
});

describe("directionFromProp", () => {
	it.each([
		["auto", TransitionDirection.Auto],
		["up", TransitionDirection.Up],
		["down", TransitionDirection.Down],
	])("maps %s", (prop, direction) => {
		expect(directionFromProp(prop)).toBe(direction);
	});

	it.each([undefined, null, "", "sideways", "UP"])(
		"falls back to auto for %s",
		(prop) => {
			expect(directionFromProp(prop)).toBe(TransitionDirection.Auto);
		},
	);
});
