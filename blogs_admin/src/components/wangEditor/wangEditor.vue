<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  watch,
  defineEmits,
  defineProps,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const emit = defineEmits(["wangEditor:content"]);
const props = defineProps({
  content: String,
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

// 模拟 ajax 异步获取内容
onMounted(() => {});
// 监听 props.content 的变化
watch(
  () => props.content,
  (newValue) => {
    valueHtml.value = newValue;
  }
);

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleChange = (editor) => {
  valueHtml.value = editor.getHtml();
  emit("wangEditor:content", valueHtml.value);
  //   console.log(valueHtml.value);
};

const mode = "default"; // 或 'simple'
</script>    