<template>
  <Sandbox
    class="sandbox"
    :info="info"
    :options="options"
  />
</template>

<script setup lang="ts">
import { Sandbox } from 'sandpack-vue';

const info = {
  files: {
    '/index.html': {
      code: `<!DOCTYPE html>
      <html>
      <body>
      <div id="app"></div>
      <script src="src/index.ts" />
      </body>
      </html>`,
    },
    '/index.js': {
      code: `import { v4 as uuidv4 } from 'uuid';

      document.getElementById("app").innerHTML = \`
      <h1>Hello Aboba!</h1>
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
const options = {
  showOpenInCodeSandbox: false,
  showErrorScreen: false,
  showLoadingScreen: false,
};
</script>

<style scoped>
.sandbox {
  width: 800px;
  height: 400px;
}
</style>
