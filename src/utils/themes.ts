import { HighlightStyle, tags } from '@codemirror/highlight';
import { EditorView } from '@codemirror/view';

export type SandpackPredefinedTheme =
	| 'light'
	| 'dark'
	| 'sandpack-dark'
	| 'night-owl'
	| 'aqua-blue'
	| 'github-light'
	| 'monokai-pro';

export interface SandpackTheme {
	palette: {
		activeText: string;
		defaultText: string;
		inactiveText: string;
		activeBackground: string;
		defaultBackground: string;
		inputBackground: string;
		accent: string;
		errorBackground: string;
		errorForeground: string;
	};
	syntax: {
		plain: string | SandpackSyntaxStyle;
		comment: string | SandpackSyntaxStyle;
		keyword: string | SandpackSyntaxStyle;
		definition: string | SandpackSyntaxStyle;
		punctuation: string | SandpackSyntaxStyle;
		property: string | SandpackSyntaxStyle;
		tag: string | SandpackSyntaxStyle;
		static: string | SandpackSyntaxStyle;
		string?: string | SandpackSyntaxStyle; // use static as fallback
	};
	typography: {
		bodyFont: string;
		monoFont: string;
		fontSize: string;
		lineHeight: string;
	};
}

export interface SandpackSyntaxStyle {
	color?: string;
	fontStyle?: 'normal' | 'italic';
	fontWeight?:
		| 'normal'
		| 'bold'
		| '100'
		| '200'
		| '300'
		| '400'
		| '500'
		| '600'
		| '700'
		| '800'
		| '900';
	textDecoration?:
		| 'none'
		| 'underline'
		| 'line-through'
		| 'underline line-through';
}

export function getPredefinedTheme(
	themeId: SandpackPredefinedTheme,
): SandpackTheme {
	return SANDPACK_THEMES[themeId];
}

export function themeEditor(theme: SandpackTheme) {
	return EditorView.theme({
		'&': {
			backgroundColor: theme.palette.defaultBackground,
			color:
				getSyntaxStyle(theme.syntax.plain).color || theme.palette.activeText,
			padding: '16px 0',
			height: 'calc(100% - 40px)',
		},

		'&.cm-editor.cm-focused': {
			outline: 'none',
		},

		'.cm-activeLine': {
			backgroundColor: hexToCSSRGBa(theme.palette.activeBackground, 0.5),
		},

		'.cm-errorLine': {
			backgroundColor: hexToCSSRGBa(theme.palette.errorBackground, 0.2),
		},

		'.cm-matchingBracket, .cm-nonmatchingBracket': {
			color: 'inherit',
			background: theme.palette.activeBackground,
		},

		'.cm-content': {
			padding: 0,
			caretColor: theme.palette.activeText,
		},

		'.cm-scroller': {
			fontFamily: theme.typography.monoFont,
			lineHeight: theme.typography.lineHeight,
		},

		'.cm-gutters': {
			backgroundColor: theme.palette.defaultBackground,
			color: theme.palette.defaultText,
			border: 'none',
		},

		'.cm-gutter.cm-lineNumbers': {
			paddingLeft: '4px',
			paddingRight: '4px',
		},

		'.cm-lineNumbers .cm-gutterElement': {
			padding: 0,
		},

		'.cm-line': {
			padding: '0 12px',
		},
	});
}

export function getSyntaxHighlight(theme: SandpackTheme) {
	return HighlightStyle.define([
		{ tag: tags.link, textDecoration: 'underline' },
		{ tag: tags.emphasis, fontStyle: 'italic' },
		{ tag: tags.strong, fontWeight: 'bold' },

		{
			tag: tags.keyword,
			...getSyntaxStyle(theme.syntax.keyword),
		},
		{
			tag: [tags.atom, tags.number, tags.bool],
			...getSyntaxStyle(theme.syntax.static),
		},
		{
			tag: tags.tagName,
			...getSyntaxStyle(theme.syntax.tag),
		},
		{ tag: tags.variableName, ...getSyntaxStyle(theme.syntax.plain) },
		{
			// Highlight function call
			tag: tags.function(tags.variableName),
			...getSyntaxStyle(theme.syntax.definition),
		},
		{
			// Highlight function definition differently (eg: functional component def in React)
			tag: tags.definition(tags.function(tags.variableName)),
			...getSyntaxStyle(theme.syntax.definition),
		},
		{
			tag: tags.propertyName,
			...getSyntaxStyle(theme.syntax.property),
		},
		{
			tag: [tags.literal, tags.inserted],
			...getSyntaxStyle(theme.syntax.string ?? theme.syntax.static),
		},
		{ tag: tags.punctuation, ...getSyntaxStyle(theme.syntax.punctuation) },
		{ tag: tags.comment, ...getSyntaxStyle(theme.syntax.comment) },
	]);
}

function getSyntaxStyle(
	token: string | SandpackSyntaxStyle,
): SandpackSyntaxStyle {
	if (typeof token === 'string') {
		return { color: token };
	}
	return token;
}

function hexToCSSRGBa(hex: string, alpha: number): string {
	if (hex.startsWith('#') && (hex.length === 4 || hex.length === 7)) {
		const { red, green, blue } = hexToRGB(hex);
		return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
	}

	return hex;
}

function hexToRGB(hex: string): { red: number; green: number; blue: number } {
	let r = '0';
	let g = '0';
	let b = '0';

	if (hex.length === 4) {
		r = '0x' + hex[1] + hex[1];
		g = '0x' + hex[2] + hex[2];
		b = '0x' + hex[3] + hex[3];
	} else if (hex.length === 7) {
		r = '0x' + hex[1] + hex[2];
		g = '0x' + hex[3] + hex[4];
		b = '0x' + hex[5] + hex[6];
	}

	return {
		red: +r,
		green: +g,
		blue: +b,
	};
}

const defaultLight: SandpackTheme = {
	palette: {
		activeText: '#1f2933',
		defaultText: '#757678',
		inactiveText: '#e4e7eb',
		activeBackground: '#e4e7eb',
		defaultBackground: '#f8f9fb',
		inputBackground: '#ffffff',
		accent: '#64D2FF',
		errorBackground: '#ffcdca',
		errorForeground: '#811e18',
	},
	syntax: {
		plain: '#151515',
		comment: { color: '#999', fontStyle: 'italic' },
		keyword: '#0971F1',
		tag: '#0971F1',
		punctuation: '#151515',
		definition: '#151515',
		property: '#151515',
		static: '#FF453A',
		string: '#BF5AF2',
	},
	typography: {
		bodyFont:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		monoFont:
			'"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		fontSize: '14px',
		lineHeight: '1.4',
	},
};

/**
 * @category Theme
 */
const defaultDark: SandpackTheme = {
	palette: {
		activeText: '#FFFFFF',
		defaultText: '#999999',
		inactiveText: '#343434',
		activeBackground: '#343434',
		defaultBackground: '#040404',
		inputBackground: '#242424',
		accent: '#6caedd',
		errorBackground: '#ffcdca',
		errorForeground: '#811e18',
	},
	syntax: {
		plain: '#FFFFFF',
		comment: { color: '#757575', fontStyle: 'italic' },
		keyword: '#77B7D7',
		tag: '#DFAB5C',
		punctuation: '#ffffff',
		definition: '#86D9CA',
		property: '#77B7D7',
		static: '#C64640',
		string: '#977CDC',
	},
	typography: {
		bodyFont:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		monoFont:
			'"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		fontSize: '14px',
		lineHeight: '1.4',
	},
};

/**
 * @category Theme
 */
const sandpackDark: SandpackTheme = {
	palette: {
		activeText: '#90e86f',
		defaultText: '#5a5a5a',
		inactiveText: '#1a1a1a',
		activeBackground: '#272727',
		defaultBackground: '#151515',
		inputBackground: '#2e2e2e',
		accent: '#90e86f',
		errorBackground: '#dac1fb',
		errorForeground: '#b08df8',
	},
	syntax: {
		plain: '#f0fdaf',
		comment: { color: '#757575', fontStyle: 'italic' },
		keyword: '#e5fd78',
		tag: '#f0fdaf',
		punctuation: '#ffffff',
		definition: '#eeeeee',
		property: '#90e86f',
		static: '#ffffff',
		string: '#dafecf',
	},
	typography: {
		bodyFont:
			'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		monoFont:
			'"Fira Code", "Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		fontSize: '14px',
		lineHeight: '1.6',
	},
};

/**
 * @category Theme
 */
const aquaBlueTheme: SandpackTheme = {
	palette: {
		activeText: '#1f2933',
		defaultText: '#737373',
		inactiveText: '#e4e7eb',
		activeBackground: '#e4e7eb',
		defaultBackground: '#f8f9fb',
		inputBackground: '#ffffff',
		accent: '#6caedd',
		errorBackground: '#ffcdca',
		errorForeground: '#811e18',
	},

	syntax: {
		plain: '#1F2933',
		comment: { color: '#A7B6C2', fontStyle: 'italic' },
		keyword: '#1A56DB',
		tag: '#1A56DB',
		punctuation: '#394b59',
		definition: '#A23DAD',
		property: '#14919B',
		static: '#1A56DB',
		string: '#1992D4',
	},
	typography: {
		bodyFont:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		monoFont:
			'"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		fontSize: '14px',
		lineHeight: '1.4',
	},
};

/**
 * @category Theme
 */
const githubLightTheme: SandpackTheme = {
	palette: {
		activeText: '#24292e',
		defaultText: '#959da5',
		inactiveText: '#e4e7eb',
		activeBackground: '#e4e7eb',
		defaultBackground: '#ffffff',
		inputBackground: '#ffffff',
		accent: '#c8c8fa',
		errorBackground: '#ffcdca',
		errorForeground: '#811e18',
	},
	syntax: {
		keyword: '#d73a49',
		property: '#005cc5',
		plain: '#24292e',
		static: '#032f62',
		string: '#032f62',
		definition: '#6f42c1',
		punctuation: '#24292e',
		tag: '#22863a',
		comment: {
			color: '#6a737d',
			fontStyle: 'normal',
		},
	},
	typography: {
		bodyFont:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		monoFont:
			'"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		fontSize: '14px',
		lineHeight: '1.4',
	},
};

/**
 * @category Theme
 */
const nightOwlTheme: SandpackTheme = {
	palette: {
		activeText: 'rgb(197, 228, 253)',
		defaultText: 'rgb(105, 136, 161)',
		inactiveText: 'rgb(78, 82, 97)',
		activeBackground: 'rgb(58, 62, 77)',
		defaultBackground: 'rgb(1, 22, 39)',
		inputBackground: 'rgb(11, 41, 66)',
		accent: '#7fdbca',
		errorBackground: '#ffcdca',
		errorForeground: '#811e18',
	},
	syntax: {
		plain: '#d6deeb',
		comment: { color: '#999999', fontStyle: 'italic' },
		keyword: { color: '#c792ea', fontStyle: 'italic' },
		tag: '#7fdbca',
		punctuation: '#7fdbca',
		definition: '#82aaff',
		property: { color: '#addb67', fontStyle: 'italic' },
		static: '#f78c6c',
		string: '#ecc48d',
	},
	typography: {
		bodyFont:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		monoFont:
			'"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		fontSize: '14px',
		lineHeight: '1.4',
	},
};

/**
 * @category Theme
 */
const monokaiProTheme: SandpackTheme = {
	palette: {
		activeText: 'rgb(252, 252, 250)',
		defaultText: 'rgb(147, 146, 147)',
		inactiveText: '#444344',
		activeBackground: '#444344',
		defaultBackground: 'rgb(45, 42, 46)',
		inputBackground: 'rgb(25, 24, 26)',
		accent: 'rgb(255, 216, 102)',
		errorBackground: '#ffcdca',
		errorForeground: '#811e18',
	},
	syntax: {
		plain: 'rgb(252, 252, 250)',
		comment: { color: '#757575', fontStyle: 'italic' },
		keyword: 'rgb(255, 97, 136)',
		tag: 'rgb(120, 220, 232)',
		punctuation: 'rgb(147, 146, 147)',
		definition: 'rgb(169, 220, 118)',
		property: { color: 'rgb(120, 220, 232)', fontStyle: 'italic' },
		static: 'rgb(171, 157, 242)',
		string: 'rgb(255, 216, 102)',
	},
	typography: {
		bodyFont:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		monoFont:
			'"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		fontSize: '14px',
		lineHeight: '1.4',
	},
};

/**
 * @category Theme
 */
const SANDPACK_THEMES: Record<SandpackPredefinedTheme, SandpackTheme> = {
	light: defaultLight,
	dark: defaultDark,
	'sandpack-dark': sandpackDark,
	'night-owl': nightOwlTheme,
	'aqua-blue': aquaBlueTheme,
	'monokai-pro': monokaiProTheme,
	'github-light': githubLightTheme,
};
