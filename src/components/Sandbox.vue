<template>
  <div>
    <iframe ref="editor" />
  </div>
</template>

<script setup lang="ts">
import { ClientOptions, SandpackClient, SandboxInfo } from '@codesandbox/sandpack-client';
import { ref, onMounted, watch, PropType } from 'vue';

const props = defineProps({
  info: {
    type: Object as PropType<SandboxInfo>,
    required: true,
  },
  options: {
    type: Object as PropType<ClientOptions>,
    required: false,
    default: () => {
      return {};
    },
  },
});

const editor = ref<HTMLIFrameElement | null>(null);
let client: SandpackClient | null = null;

onMounted(() => {
  if (!editor.value) {
    return;
  }
  client = new SandpackClient(editor.value, props.info, props.options);
});

watch(() => props.info, (info) => {
  if (!client) {
    return;
  }
  client.updatePreview(info);
});
</script>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
