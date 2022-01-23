<template>
	<div
		ref="wrapper"
		class="wrapper"
	>
		<FileSelector
			v-if="hasVisibleFiles"
			class="selector"
			:active-index="activeFileIndex"
			:files="files"
			:theme="theme"
			@select="handleFileSelect"
		/>
	</div>
</template>

<script setup lang="ts">
import { defaultHighlightStyle } from '@codemirror/highlight';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, highlightSpecialChars, highlightActiveLine } from '@codemirror/view';
import { PropType, computed, onMounted, ref } from 'vue';

import { File, FileType } from '../utils/files';
import { SandpackTheme, getPredefinedTheme, getSyntaxHighlight, themeEditor } from '../utils/themes';

import FileSelector from './FileSelector.vue';

const props = defineProps({
	files: {
		type: Array as PropType<File[]>,
		required: true,
	},
	theme: {
		type: Object as PropType<SandpackTheme>,
		required: false,
		default: getPredefinedTheme('light'),
	},
});

const emit = defineEmits(['change']);

const language = new Compartment();

const wrapper = ref<HTMLElement | null>(null);

const activeFileIndex = ref(0);
const activeFile = computed(() => props.files[activeFileIndex.value]);

const hasVisibleFiles = computed(() => props.files.some((file) => file.visible));

let editor: EditorView | null = null;

function getLanguage(type: FileType) {
	switch (type) {
	case 'ts':
		return javascript({ typescript: true, jsx: false });
	case 'html':
		return html();
	case 'css':
		return css();
	default:
		return javascript();
	}
}

function handleFileSelect(index: number) {
	activeFileIndex.value = index;

	if (!editor) {
		return;
	}

	editor.dispatch({
		changes: {
			from: 0,
			to: editor.state.doc.length,
			insert: activeFile.value.value,
		},
	});
	editor.dispatch({
		effects: language.reconfigure(getLanguage(activeFile.value.type)),
	});
}

onMounted(() => {
	const extensions = [
		highlightSpecialChars(),
		highlightActiveLine(),
		defaultHighlightStyle.fallback,
		themeEditor(props.theme),
		getSyntaxHighlight(props.theme),

		EditorView.editable.of(activeFile.value.editable),
		language.of(getLanguage(activeFile.value.type)),
	];

	if (!wrapper.value) {
		return;
	}

	editor = new EditorView({
		state: EditorState.create({
			doc: activeFile.value.value,
			extensions,
		}),
		parent: wrapper.value,
		dispatch: (transaction): void => {
			if (!editor) {
				return;
			}
			editor.update([transaction]);

			if (transaction.docChanged) {
				const lines = transaction.newDoc.toJSON();
				const text = lines.join('\n');
				emit('change', activeFileIndex.value, text);
			}
		},
	});
});
</script>

<style scoped>
.wrapper {
	font-size: 14px;
}

.selector {
	height: 40px;
}
</style>
