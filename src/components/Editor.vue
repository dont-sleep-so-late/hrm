<template>
  <div class="Editor">
    <!-- 
            @save: 按下 ctrl + s 时触发
            @change: 当值发生改变时 触发
        -->
    <mavon-editor
      @save="saveDoc"
      @change="updateDoc"
      @imgAdd="$imgAdd"
      ref="editor"
      v-model="doc"
    >
    </mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "EditorComponent",
  components: { mavonEditor },
  data() {
    return {
      doc: "",
    };
  },
  methods: {
    updateDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      console.log("markdown内容: " + markdown);
      console.log("html内容:" + markdown);
    },
    saveDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      console.log("markdown内容:" + markdown);
      console.log("html内容:" + html);
    },
    $imgAdd(pos, file) {
      //只要放上去就上传到oss
      //单图上传
      // 第一步.将图片上传到服务器.
      let imgData = new FormData();
      imgData.append("file", file);
      this.$axios.post("/files/image/upload", imgData).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.mdedit.$img2Url(pos, res.data.data);
      });
    },
  },
};
</script>

<style scoped>
.Editor {
  padding: 20px 20px;
}
</style>
