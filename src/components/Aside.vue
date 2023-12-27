<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu router default-active="Banner/Home" class="el-menu-vertical-demo" :collapse="isCollapse">
        <div class="userInfo">
          <div class="userHeader">
            <div :class="{ userAvatar: !isCollapse }">
              <el-avatar :size="50" shape="circle" :src="avatar" style="margin-top: 10px;margin-left:10px"></el-avatar>
            </div>
            <div style="white-space: nowrap;text-align:center" :class="{ userName: isCollapse }">
              {{ userName }}
            </div>
          </div>
        </div>
        <el-menu-item index="Home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="RoleManage">账号管理</el-menu-item>
          <el-menu-item index="OrganManage">机构管理</el-menu-item>
          <el-menu-item index="ProfessionManage">职位管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span>档案管理</span>
          </template>
          <el-menu-item index="AddDocument">档案登记</el-menu-item>
          <el-menu-item index="DocumentCheck">档案复核</el-menu-item>
          <el-menu-item index="DocumentQuery">档案查询</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-money"></i>
            <span>薪酬管理</span>
          </template>
          <el-menu-item index="SalaryItem">薪酬标准项目</el-menu-item>
          <el-menu-item index="AddSalary">薪酬标准登记</el-menu-item>
          <el-menu-item index="SalaryCheck">薪酬标准复核</el-menu-item>
          <el-menu-item index="SalaryQuery">薪酬查询</el-menu-item>
          <el-menu-item index="PaySalary">薪酬发放</el-menu-item>
          <el-menu-item index="PaySalaryDetail">薪酬发放明细</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside",
  data() {
    return {
      avatar: require("@/assets/玛奇玛small.png"),
      userName: window.localStorage.getItem("username"),
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>

<style scoped>
.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
}

.userHeader {
  margin: 0 auto;
}

.userName {
  display: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-item.is-active {
  color: #fff !important;
  font-size: 15px;
  font-weight: bold;
  background-color: #2661ef !important;
  border-radius: 2px;
  line-height: 50px;
  box-sizing: border-box;
}


</style>