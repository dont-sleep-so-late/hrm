<template>
  <div class="Banner">
    <el-container>
      <el-aside>
        <Aside />
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <el-col :span="1" type="flex">
              <div class="toggle-button" @click="changeCollapse()">
                <i v-if="isCollapse" class="el-icon-s-unfold"></i>
                <i v-if="!isCollapse" class="el-icon-s-fold"></i>
              </div>
            </el-col>
            <el-col :offset="7" :span="5" align="middle">
              <el-avatar shape="circle" :src="logo" style="margin-top: 10px; float: left"></el-avatar>
              <p class="system-name">广东海洋大学人力资源管理系统</p>
            </el-col>
            <el-col :offset="7" :span="4" style="min-width: 150px">
              <el-dropdown style="float: right; margin: 20px 10px">
                <span class="el-dropdown-link" style="color: #fff; cursor: pointer">
                  {{ name }} &nbsp;&nbsp;<i class="fa fa-caret-down fa-1x"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item @click.native="editPasswordDialog = true">修改密码</el-dropdown-item> -->
                  <el-dropdown-item @click.native="logout()">退出系统</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <!-- 面包屑 -->
          <Breadcrumb />
          <!-- 主要内容 -->
          <router-view></router-view>
        </el-main>

        <el-footer>
          <p class="footer">Copyright © Ouwen All Rights Reserved</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Home from "../pages/Home";
import Login from "../pages/Login";
import Breadcrumb from "../components/Breadcrumb";
import Aside from "../components/Aside";

export default {
  name: "Banner",
  components: {
    Aside,
    Home,
    Login,
    Breadcrumb,
  },
  data() {
    return {
      logo: require("@/assets/logo.png"),
      name: window.localStorage.getItem("username")
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
  methods: {
    changeCollapse() {
      this.$store.commit("menuCollapse");
    },
    // 退出系统
    logout() {
      this.$confirm("确定要退出系统吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 清除缓存
          sessionStorage.clear();
          this.$router.push("/Login");
        })
        .catch(() => {
          return false;
        });
    },
  },
};
</script>

<style scoped>
.Banner {
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 100%;
  background: #f2f3f5;
}

.el-header {
  background: #2661ef;
  padding: 0 10px;
  overflow: hidden;
}

.system-name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  line-height: 56px;
  width: 350px;
}

.toggle-button {
  font-size: 18px;
  line-height: 56px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
  padding: 0 10px;
}

.el-aside {
  background: white;
  width: auto !important;
  height: 100vh;
}

.el-container {
  min-height: 400px;

}

.el-main {
  min-height: 400px;
}

.el-footer {
  color: #cccccc;
  text-align: center;
  line-height: 60px;
}

.el-footer:hover {
  color: #2661ef;
}

@media (max-width: 1024px) {
  .system-name {
    display: none;
  }
}
</style>