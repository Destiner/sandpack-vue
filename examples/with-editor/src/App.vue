<template>
  <h1>With editor</h1>
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