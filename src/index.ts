import Editor from './components/Editor.vue';
import Sandbox from './components/Sandbox.vue';
import type { File } from './utils/files';
import type {
	SandpackTheme,
	SandpackPredefinedTheme,
	SandpackSyntaxStyle,
} from './utils/themes';
import { getPredefinedTheme } from './utils/themes';

export { Editor, Sandbox, getPredefinedTheme };
export type {
	File,
	SandpackTheme,
	SandpackPredefinedTheme,
	SandpackSyntaxStyle,
};
