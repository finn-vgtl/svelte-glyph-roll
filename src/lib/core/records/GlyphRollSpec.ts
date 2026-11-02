import { TransitionSprings } from "../animation/TransitionSprings";
import { GlyphRollAlignment, TransitionDirection } from "../enums";
import {
	TRANSITION_SHAPE_DEFAULTS,
	type TransitionShape,
} from "./TransitionShape";

interface GlyphRollSpec {
	text: string;
	alignment: GlyphRollAlignment;
	direction: TransitionDirection;
	decimalSeparator: string;
	shape: TransitionShape;
	clipEnabled: boolean;
	animationsEnabled: boolean;
	duration: number;
	bounce: number;
}

const createGlyphRollSpec = (): GlyphRollSpec => ({
	text: "",
	alignment: GlyphRollAlignment.Leading,
	direction: TransitionDirection.Auto,
	decimalSeparator: ".",
	shape: { ...TRANSITION_SHAPE_DEFAULTS },
	clipEnabled: true,
	animationsEnabled: true,
	duration: TransitionSprings.REFERENCE_DURATION,
	bounce: TransitionSprings.DEFAULT_BOUNCE,
});

const isBlurActive = (spec: GlyphRollSpec): boolean =>
	spec.shape.blurIntensity > 0;

const specsEqual = (lhs: GlyphRollSpec, rhs: GlyphRollSpec): boolean =>
	lhs.text === rhs.text &&
	lhs.alignment === rhs.alignment &&
	lhs.direction === rhs.direction &&
	lhs.decimalSeparator === rhs.decimalSeparator &&
	lhs.clipEnabled === rhs.clipEnabled &&
	lhs.animationsEnabled === rhs.animationsEnabled &&
	lhs.duration === rhs.duration &&
	lhs.bounce === rhs.bounce &&
	lhs.shape.blurIntensity === rhs.shape.blurIntensity &&
	lhs.shape.maxBlurRadius === rhs.shape.maxBlurRadius &&
	lhs.shape.enterScale === rhs.shape.enterScale &&
	lhs.shape.travelRatio === rhs.shape.travelRatio;

export type { GlyphRollSpec };
export { createGlyphRollSpec, isBlurActive, specsEqual };
