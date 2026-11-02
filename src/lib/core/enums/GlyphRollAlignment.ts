enum GlyphRollAlignment {
	Leading = "leading",
	Center = "center",
	Trailing = "trailing",
}

const alignmentFromProp = (
	propValue: string | null | undefined,
): GlyphRollAlignment => {
	switch (propValue) {
		case "center":
			return GlyphRollAlignment.Center;
		case "end":
			return GlyphRollAlignment.Trailing;
		default:
			return GlyphRollAlignment.Leading;
	}
};

export { alignmentFromProp, GlyphRollAlignment };
