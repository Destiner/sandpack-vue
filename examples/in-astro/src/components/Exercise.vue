<template>
  <div
    ref="el"
    class="exercise"
  >
    <Editor
      class="editor"
      :files="files"
      :theme="theme"
      @change="handleCodeChange"
    />
    <div class="sandbox-wrapper">
      <Sandbox
        class="sandbox"
        :info="info"
        :options="options"
      />
      <ButtonCheck
        :files="files"
        :tests="tests"
        @run="handleTestRun"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Editor, File, Sandbox, SandpackTheme } from 'sandpack-vue';
// eslint-disable-next-line import/no-unresolved
import 'sandpack-vue/style.css';
import { computed, ref } from 'vue';

import ButtonCheck, { Test } from './ButtonCheck.vue';

function handleCodeChange(index: number, value: string) {
  files.value[index].value = value;
}

const files = ref<File[]>([
  {
    value: `<!DOCTYPE html>
<!-- First file will always be active, even if it's hidden. -->
<html>
<body>
  <h1>Hello from Sandpack!</h1>
  <p>This file is hidden</p>
</body>
</html>`,
    name: 'hidden.html',
    type: 'html',
    editable: true,
    visible: false,
  },
  {
    value: `<!DOCTYPE html>
<!-- Once hidden file is closed, -->
<!-- there is no way to access it from UI. -->
<html>
<head>
  <link rel="stylesheet" type="text/css" href="styles.css">
  <style>
    body {
      background: #202020;
      color: white;
      font-family: sans-serif;
    }
  </style>
</head>
<body >
  <h1>Hello Sandpack!</h1>
  <p>This file is visible</p>
</body>
</html>`,
    name: 'index.html',
    type: 'html',
    editable: true,
    visible: true,
  },
  {
    value: `import "./styles.css";

function sum(a, b) {
  return a + b;
}

function pow(a, b) => a ** b;

console.log(sum(3, pow(2, 3)));`,
    name: 'index.js',
    type: 'ts',
    editable: true,
    visible: true,
  },
  {
    value: `body {
  font-family: sans-serif;
}`,
    name: 'styles.css',
    type: 'css',
    editable: false,
    visible: true,
  },
]);

const theme: SandpackTheme = {
  palette: {
    activeText: '#de904d',
    defaultText: '#bababa',
    inactiveText: '#979797',
    activeBackground: '#2a2a2a',
    defaultBackground: '#343434',
    inputBackground: '#2e2e2e',
    accent: '#de904d',
    errorBackground: '#dac1fb',
    errorForeground: '#b08df8',
  },
  syntax: {
    plain: '#f0fdaf',
    comment: {
      color: '#757575',
      fontStyle: 'italic',
    },
    keyword: '#e5fd78',
    tag: '#f0fdaf',
    punctuation: '#ffffff',
    definition: '#eeeeee',
    property: '#e0a571',
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

const info = computed(() => {
  return {
    files: Object.fromEntries(
      files.value.map((file) => ['/' + file.name, { code: file.value }]),
    ),
    entry: '/index.html',
    dependencies: {},
  };
});

const options = {
  showOpenInCodeSandbox: false,
  showErrorScreen: false,
  showLoadingScreen: false,
};

const el = ref<HTMLElement | null>(null);

const tests: Test[] = [
  {
    selector: 'p',
    prop: 'font-family',
    isValid: (value: string) => {
      const font = value.replace(/['"]+/g, '');
      const validFonts = ['Roboto', 'Inter', 'Open Sans'];
      return validFonts.includes(font);
    },
  },
];

function handleTestRun(status: boolean) {
  console.log('[Exercise] run', status);
}
</script>

<style scoped>
.exercise {
  display: inline-flex;
  overflow: hidden;
  border: 1px solid #979797;
  border-radius: 16px;
}

.editor {
  width: 600px;
  height: 400px;
}

.sandbox-wrapper {
  position: relative;
}

.sandbox {
  width: 600px;
  height: 400px;
}
</style>
