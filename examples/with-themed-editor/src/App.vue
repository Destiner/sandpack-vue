<template>
  <h1>With themed editor</h1>
  <div class="exercise">
    <Editor
      class="editor"
      :files="files"
      :theme="customTheme"
      @change="handleCodeChange"
    />
    <Sandbox
      class="sandbox"
      :info="info"
      :options="options"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import { Editor, File, Sandbox, SandpackTheme } from '../../../src';
// import { getPredefinedTheme } from '../../../src';

const code = ref(`<!DOCTYPE html>
<html>
<body>
  <h1>Hello Sandpack!</h1>
</body>
</html>`);

function handleCodeChange(_index: number, value: string) {
  code.value = value;
}

const files = computed<File[]>(() => [
  {
    value: code.value,
    name: 'index.html',
    type: 'html',
    editable: true,
    visible: true,
  },
]);

// const sandpackTheme = getPredefinedTheme('sandpack-dark');

const customTheme: SandpackTheme = {
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

const info = computed(() => {
  return {
    files: {
      '/index.html': {
        code: code.value,
      },
    },
    entry: '/index.html',
    dependencies: {},
  };
});

const options = {
  showOpenInCodeSandbox: false,
  showErrorScreen: false,
  showLoadingScreen: false,
};
</script>

<style>
#app {
  margin-top: 60px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.exercise {
  display: flex;
}

.editor {
  width: 600px;
  height: 400px;
}

.sandbox {
  width: 600px;
  height: 400px;
}
</style>