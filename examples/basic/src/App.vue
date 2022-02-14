<template>
  <h1>Basic</h1>
  <button @click="update">
    Update
  </button>
  <Sandbox
    class="sandbox"
    :info="info"
    :options="options"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { Sandbox } from '../../../src';

const count = ref(0);

const info = computed(() => {
  return {
    files: {
      '/index.html': {
        code: `<!DOCTYPE html>
        <html>
        <body>
        <h1>Hello Sandpack ${count.value}!</h1>
        <div id="app"></div>
        <script src="src/index.ts" />
        </body>
        </html>`,
      },
      '/index.js': {
        code: `import { v4 as uuidv4 } from 'uuid';
        document.getElementById("app").innerHTML = \`
        <div>
        $\{uuidv4()}
        </div>\``,
      },
    },
    entry: '/index.js',
    dependencies: {
      uuid: 'latest',
    },
  };
});

const options = {
  showOpenInCodeSandbox: false,
  showErrorScreen: false,
  showLoadingScreen: false,
};

function update() {
  count.value = count.value + 1;
}
</script>

<style>
#app {
  margin-top: 60px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.sandbox {
  width: 800px;
  height: 400px;
  border: 1px solid #2c3e50;
  border-radius: 4px;
}
</style>
