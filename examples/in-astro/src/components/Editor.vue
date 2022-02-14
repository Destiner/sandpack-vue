<template>
  <Editor
    class="editor"
    :files="files"
    @change="handleCodeChange"
  />
</template>

<script setup lang="ts">
import { Editor, File } from 'sandpack-vue';
// eslint-disable-next-line import/no-unresolved
import 'sandpack-vue/style.css';
import { computed, ref } from 'vue';

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
</script>

<style scoped>
.editor {
  width: 800px;
  height: 400px;
}
</style>
