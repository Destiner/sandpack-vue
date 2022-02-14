<template>
  <h1>With multifile editor</h1>
  <div class="exercise">
    <Editor
      class="editor"
      :files="files"
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

import { Editor, File, Sandbox } from '../../../src';

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
<!-- Once hidden file is not active, it's impossible to open it. -->
<html>
<body>
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
