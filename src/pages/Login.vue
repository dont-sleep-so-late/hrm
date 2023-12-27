<template>
  <div class="login">
    <div class="container" :class="{ container_active: registerFlag }">
      <div class="left">
        <div class="header_logo">
          <div class="_logo"><img src="../assets/login_logo.png" /></div>
          <div class="_title">
            <h2>人力资源管理系统</h2>
            <p>GDOU-HRM</p>
          </div>
        </div>
        <div class="big_logo"></div>
        <div class="foot_logo">
          <div class="foot_title">
            <h2>广东海洋大学</h2>
            <p>GDOU</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="form-items" :class="{ loginClassFlag: !registerFlag }" v-show="!registerFlag">
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
            <div class="input_lable">
              <h1>用户名</h1>
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
              </el-form-item>
            </div>
            <div class="input_lable">
              <h1>密码</h1>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
              </el-form-item>
            </div>
            <div class="btn_lable">
              <el-button type="primary" @click="login()">登录</el-button>
              <!-- <el-button type="primary" @click="registerFlag = !registerFlag">注册</el-button> -->
            </div>
            <div class="remember_forget">
              <el-checkbox v-model="checked">记住密码</el-checkbox>
              <p @click="reset()">重置</p>
            </div>

          </el-form>

        </div>


        <div class="form-items" v-show="registerFlag">
          <el-form :model="ReFormData" :rules="ReFormRules" ref="ReFormData">
            <div class="input_lable">
              <h1>用户名</h1>
              <el-form-item prop="username">
                <el-input v-model="ReFormData.username" placeholder="请输入账号"></el-input>
              </el-form-item>
            </div>
            <div class="input_lable">
              <h1>密码</h1>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="ReFormData.password" show-password></el-input>
              </el-form-item>
            </div>
            <div class="input_lable">
              <h1>角色选择</h1>
              <el-form-item prop="password">
                <el-select style="width:400px" v-model="selectedRoleId" placeholder="请选择">
                  <el-option v-for="item in userInfo" :key="item.r_id" :label="item.role_name" :value="item.r_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="btn_lable">
              <el-button @click="registerFlag = !registerFlag">返回</el-button>
              <el-button type="primary" @click="register()">注册</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      checked: false,
      registerFlag: false,
      loginForm: {
        username: "",
        password: "",
      },
      userInfo: [],
      // loginFormRules为输入框合法校验的内容 
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
      },
      ReFormData: {
        username: "",
        password: "",
      },
      // loginFormRules为输入框合法校验的内容 
      ReFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
      },
      selectedRoleId: ''
    };
  },
  created() {
    this.getUserInfo()
    this.checkremberpassword()
  },

  methods: {
    checkremberpassword() {
      this.checked = window.localStorage.getItem("checked")
      if (this.checked == "true") this.checked = true
      if (this.checked == true) {
        this.loginForm.username = window.localStorage.getItem("username")
        this.loginForm.password = window.localStorage.getItem("password")
      } else {
        window.localStorage.clear()
      }
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(`/Sys/login?username=${this.loginForm.username}&password=${this.loginForm.password}`,
        );
        if (res.ok !== true) return this.$message.error("登录失败!");
        this.$message.success("登录成功！");
        //1.将登陆成功之后的token，保存到客户端的sessionStorage中
        //1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("uid", res.data[0].u_id);
        window.localStorage.clear();
        window.localStorage.setItem("checked", this.checked);
        window.localStorage.setItem("username", this.loginForm.username);
        window.localStorage.setItem("password", this.loginForm.password);
        //2.通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push("/Banner")
      })
    },
    register() {
      this.loginForm.r_id = this.selectedRoleId
      this.$refs.ReFormData.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(`/Sys/register/${this.ReFormData.username}/${this.ReFormData.password}/${this.selectedRoleId}`);
        console.log(res);
        // if(res.ok!==true){return}
        this.$message.success("注册成功！");
        //1.将登陆成功之后的token，保存到客户端的sessionStorage中
        //1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        //2.通过编程式导航跳转到后台主页，路由地址是 /home
        this.$refs.ReFormData = []
        this.registerFlag = !this.registerFlag
      })

    },
    reset() {
      this.loginForm.username = ""
      this.loginForm.password = ""
    },
    async getUserInfo() {
      const { data: res } = await this.$http.post("Sys/register/queryAllRole");
      console.log(res);
      this.userInfo = res.data
      //1.将登陆成功之后的token，保存到客户端的sessionStorage中
      //1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
      //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
      //2.通过编程式导航跳转到后台主页，路由地址是 /home

    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../assets/login_bg.png);
  background-size: 100% 100%;

  /* 居中 */
  display: flex;
  /* 主轴居中 */
  justify-content: center;
  /* 侧轴居中 */
  align-items: center;
}

.container {
  width: 1178px;
  height: 650px;
  /* 自动布局 */
  display: flex;
  flex-direction: row;
  transition: all 1s;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08),
    0px 2px 6px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 2px rgba(0, 0, 0, 0.04);
}

.container_active {
  flex-direction: row-reverse;

}

.left {
  width: 32%;
  height: 100%;
  background: url(../assets/login_left.png) no-repeat;
  display: flex;
  justify-content: center;
  position: relative;
}

.header_logo {
  display: flex;
}

._logo {
  padding: 20px 20px;
}

._title {
  padding-top: 20px;
  color: #fff;
}

._title p {
  color: rgb(230, 230, 230);
  text-indent: 2.5em;
}

.foot_logo {
  position: absolute;
  bottom: 2%;
  left: 0;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #fff;
}

.foot_logo p {
  color: rgb(230, 230, 230);
  text-indent: 3em;
}

.right {
  width: 800px;
  height: 100%;
  background-color: #fff;
}

.form-items {
  padding: 80px 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.loginClassFlag {
  padding: 150px 200px;
}

.input_lable {
  margin-top: 20px;
}

.form-items .el-button {
  margin-top: 2%;
  width: 180px;
  border-radius: 5px;
}

.btn_lable {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
.btn_lable .el-button {
  width: 100%;
  border-radius: 5px;
}
.remember_forget {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.remember_forget p {
  cursor: pointer;
  font-size: 14px;
  color: #409eff;
}

.remember_forget p:hover {
  color: #0481ff;
}
</style>