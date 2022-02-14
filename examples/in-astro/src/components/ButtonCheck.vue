<template>
  <button @click="test">
    Check
  </button>
</template>

<script setup lang="ts">
import postcss from 'postcss';
import { File } from 'sandpack-vue';
import { PropType } from 'vue';

export interface Test {
  selector: string;
  prop: string;
  isValid: (value: string) => boolean;
}

const props = defineProps({
  files: {
    type: Array as PropType<File[]>,
    required: true,
  },
  tests: {
    type: Array as PropType<Test[]>,
    required: true,
  },
});

const emit = defineEmits(['run']);

async function test() {
  const isValid = await getTestRun(props.files, props.tests);
  emit('run', isValid);
}

async function getTestRun(files: File[], tests: Test[]) {
  const processor = postcss([]);
  const cssFile = files.find((file) => file.type === 'css');
  if (!cssFile) {
    console.error('Styles not found');
    return false;
  }
  const styles = await processor.process(cssFile.value, {
    from: undefined,
  });
  const isValid = tests.every((test) => {
    const ruleValue = getStyleRuleValue(styles.root, test.selector, test.prop);
    if (!ruleValue) {
      return false;
    }
    return test.isValid(ruleValue);
  });
  return isValid;
}

function getStyleRuleValue(
  root: any,
  selector: string,
  prop: string,
): string | null {
  if (!root) {
    return null;
  }
  const nodes = root.nodes;
  if (!nodes) {
    return null;
  }
  const node = nodes.find((node: any) => node.selector === selector);
  if (!node) {
    return null;
  }
  const nodeNodes = node.nodes;
  const rule = nodeNodes.find((node: any) => node.prop === prop);
  if (!rule) {
    return null;
  }
  return rule.value;
}
</script>

<style scoped>
button {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 120px;
  height: 36px;
  border: 1px solid #979797;
  border-radius: 4px;
  background: transparent;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>
