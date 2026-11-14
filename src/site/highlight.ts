import { createHighlighter } from "@tanstack/highlight/core";
import { css } from "@tanstack/highlight/languages/css";
import { html } from "@tanstack/highlight/languages/html";
import { js } from "@tanstack/highlight/languages/js";
import { svelte } from "@tanstack/highlight/languages/svelte";
import { ts } from "@tanstack/highlight/languages/ts";
import { createThemeRule, themeTokenClasses } from "@tanstack/highlight/theme";
import { githubDarkTheme } from "@tanstack/highlight/themes/github-dark";
import { githubLightTheme } from "@tanstack/highlight/themes/github-light";

/** Highlights the site's code samples. `svelte` delegates its script and style blocks to the rest. */
const highlighter = createHighlighter({
	languages: [css, html, js, svelte, ts],
});

/** GitHub Light and Dark, following the system setting like the rest of the site. */
const syntaxThemeCss = [
	createThemeRule(":root", githubLightTheme),
	`@media (prefers-color-scheme: dark) {\n${createThemeRule(":root", githubDarkTheme)}\n}`,
	...themeTokenClasses.map(
		(token) => `.th-${token} { color: var(--th-${token}); }`,
	),
].join("\n");

export { highlighter, syntaxThemeCss };
