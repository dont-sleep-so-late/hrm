<template>
  <el-breadcrumb separator="/" class="bread">
    <el-breadcrumb-item
      :to="{ path: item.path }"
      v-for="item in breadCrumbList"
      :key="item.path"
      >{{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Breadcrumb",
  computed: {
    breadCrumbList() {
      return this.$route.matched;
    },
  },
};
</script>
