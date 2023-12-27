"use strict";(self["webpackChunkGDUOHRM"]=self["webpackChunkGDUOHRM"]||[]).push([[316,371,41],{1316:function(e,t,s){s.r(t),s.d(t,{default:function(){return b}});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"Banner"},[t("el-container",[t("el-aside",[t("Aside")],1),t("el-container",[t("el-header",[t("el-row",[t("el-col",{attrs:{span:1,type:"flex"}},[t("div",{staticClass:"toggle-button",on:{click:function(t){return e.changeCollapse()}}},[e.isCollapse?t("i",{staticClass:"el-icon-s-unfold"}):e._e(),e.isCollapse?e._e():t("i",{staticClass:"el-icon-s-fold"})])]),t("el-col",{attrs:{offset:7,span:5,align:"middle"}},[t("el-avatar",{staticStyle:{"margin-top":"10px",float:"left"},attrs:{shape:"circle",src:e.logo}}),t("p",{staticClass:"system-name"},[e._v("广东海洋大学人力资源管理系统")])],1),t("el-col",{staticStyle:{"min-width":"150px"},attrs:{offset:7,span:4}},[t("el-dropdown",{staticStyle:{float:"right",margin:"20px 10px"}},[t("span",{staticClass:"el-dropdown-link",staticStyle:{color:"#fff",cursor:"pointer"}},[e._v(" "+e._s(e.name)+"   "),t("i",{staticClass:"fa fa-caret-down fa-1x"})]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{nativeOn:{click:function(t){return e.logout()}}},[e._v("退出系统")])],1)],1)],1)],1)],1),t("el-main",[t("Breadcrumb"),t("router-view")],1),t("el-footer",[t("p",{staticClass:"footer"},[e._v("Copyright © Ouwen All Rights Reserved")])])],1)],1)],1)},r=[],l=(s(7658),s(5041)),i=s(5371),o=function(){var e=this,t=e._self._c;return t("el-breadcrumb",{staticClass:"bread",attrs:{separator:"/"}},e._l(e.breadCrumbList,(function(s){return t("el-breadcrumb-item",{key:s.path,attrs:{to:{path:s.path}}},[e._v(e._s(s.meta.title)+" ")])})),1)},n=[],c={name:"Breadcrumb",computed:{breadCrumbList(){return this.$route.matched}}},m=c,u=s(1001),d=(0,u.Z)(m,o,n,!1,null,null,null),g=d.exports,p=function(){var e=this,t=e._self._c;return t("el-row",{staticClass:"tac"},[t("el-col",{attrs:{span:12}},[t("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{router:"","default-active":"Banner/Home",collapse:e.isCollapse}},[t("div",{staticClass:"userInfo"},[t("div",{staticClass:"userHeader"},[t("div",{class:{userAvatar:!e.isCollapse}},[t("el-avatar",{staticStyle:{"margin-top":"10px","margin-left":"10px"},attrs:{size:50,shape:"circle",src:e.avatar}})],1),t("div",{class:{userName:e.isCollapse},staticStyle:{"white-space":"nowrap","text-align":"center"}},[e._v(" "+e._s(e.userName)+" ")])])]),t("el-menu-item",{attrs:{index:"Home"}},[t("i",{staticClass:"el-icon-menu"}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v("首页")])]),t("el-submenu",{attrs:{index:"1"}},[t("template",{slot:"title"},[t("i",{staticClass:"el-icon-setting"}),t("span",[e._v("系统设置")])]),t("el-menu-item",{attrs:{index:"RoleManage"}},[e._v("账号管理")]),t("el-menu-item",{attrs:{index:"OrganManage"}},[e._v("机构管理")]),t("el-menu-item",{attrs:{index:"ProfessionManage"}},[e._v("职位管理")])],2),t("el-submenu",{attrs:{index:"2"}},[t("template",{slot:"title"},[t("i",{staticClass:"el-icon-folder"}),t("span",[e._v("档案管理")])]),t("el-menu-item",{attrs:{index:"AddDocument"}},[e._v("档案登记")]),t("el-menu-item",{attrs:{index:"DocumentCheck"}},[e._v("档案复核")]),t("el-menu-item",{attrs:{index:"DocumentQuery"}},[e._v("档案查询")])],2),t("el-submenu",{attrs:{index:"3"}},[t("template",{slot:"title"},[t("i",{staticClass:"el-icon-money"}),t("span",[e._v("薪酬管理")])]),t("el-menu-item",{attrs:{index:"SalaryItem"}},[e._v("薪酬标准项目")]),t("el-menu-item",{attrs:{index:"AddSalary"}},[e._v("薪酬标准登记")]),t("el-menu-item",{attrs:{index:"SalaryCheck"}},[e._v("薪酬标准复核")]),t("el-menu-item",{attrs:{index:"SalaryQuery"}},[e._v("薪酬查询")]),t("el-menu-item",{attrs:{index:"PaySalary"}},[e._v("薪酬发放")]),t("el-menu-item",{attrs:{index:"PaySalaryDetail"}},[e._v("薪酬发放明细")])],2)],1)],1)],1)},h=[],f={name:"Aside",data(){return{avatar:s(9921),userName:window.localStorage.getItem("username")}},computed:{isCollapse(){return this.$store.state.isCollapse}}},v=f,w=(0,u.Z)(v,p,h,!1,null,"36193f98",null),_=w.exports,C={name:"Banner",components:{Aside:_,Home:l["default"],Login:i["default"],Breadcrumb:g},data(){return{logo:s(6949),name:window.localStorage.getItem("username")}},computed:{isCollapse(){return this.$store.state.isCollapse}},methods:{changeCollapse(){this.$store.commit("menuCollapse")},logout(){this.$confirm("确定要退出系统吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{sessionStorage.clear(),this.$router.push("/Login")})).catch((()=>!1))}}},F=C,x=(0,u.Z)(F,a,r,!1,null,"e1abbe1c",null),b=x.exports},5041:function(e,t,s){s.r(t),s.d(t,{default:function(){return c}});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"home"},[t("div",{staticClass:"content"},[t("div",{staticClass:"main-info"},[t("h2",{staticStyle:{"font-size":"50px","margin-top":"30vh"}},[e._v("欢迎"+e._s(e.admin)+"进入广东海洋大学人力资源管理系统")])])])])},r=[],l={name:"Home",data(){return{admin:window.localStorage.getItem("username")}}},i=l,o=s(1001),n=(0,o.Z)(i,a,r,!1,null,"714fc566",null),c=n.exports},5371:function(e,t,s){s.r(t),s.d(t,{default:function(){return c}});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"login"},[t("div",{staticClass:"container",class:{container_active:e.registerFlag}},[e._m(0),t("div",{staticClass:"right"},[t("div",{directives:[{name:"show",rawName:"v-show",value:!e.registerFlag,expression:"!registerFlag"}],staticClass:"form-items",class:{loginClassFlag:!e.registerFlag}},[t("el-form",{ref:"loginFormRef",attrs:{model:e.loginForm,rules:e.loginFormRules}},[t("div",{staticClass:"input_lable"},[t("h1",[e._v("用户名")]),t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{placeholder:"请输入账号"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1)],1),t("div",{staticClass:"input_lable"},[t("h1",[e._v("密码")]),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1)],1),t("div",{staticClass:"btn_lable"},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.login()}}},[e._v("登录")])],1),t("div",{staticClass:"remember_forget"},[t("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("记住密码")]),t("p",{on:{click:function(t){return e.reset()}}},[e._v("重置")])],1)])],1),t("div",{directives:[{name:"show",rawName:"v-show",value:e.registerFlag,expression:"registerFlag"}],staticClass:"form-items"},[t("el-form",{ref:"ReFormData",attrs:{model:e.ReFormData,rules:e.ReFormRules}},[t("div",{staticClass:"input_lable"},[t("h1",[e._v("用户名")]),t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{placeholder:"请输入账号"},model:{value:e.ReFormData.username,callback:function(t){e.$set(e.ReFormData,"username",t)},expression:"ReFormData.username"}})],1)],1),t("div",{staticClass:"input_lable"},[t("h1",[e._v("密码")]),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:e.ReFormData.password,callback:function(t){e.$set(e.ReFormData,"password",t)},expression:"ReFormData.password"}})],1)],1),t("div",{staticClass:"input_lable"},[t("h1",[e._v("角色选择")]),t("el-form-item",{attrs:{prop:"password"}},[t("el-select",{staticStyle:{width:"400px"},attrs:{placeholder:"请选择"},model:{value:e.selectedRoleId,callback:function(t){e.selectedRoleId=t},expression:"selectedRoleId"}},e._l(e.userInfo,(function(e){return t("el-option",{key:e.r_id,attrs:{label:e.role_name,value:e.r_id}})})),1)],1)],1),t("div",{staticClass:"btn_lable"},[t("el-button",{on:{click:function(t){e.registerFlag=!e.registerFlag}}},[e._v("返回")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.register()}}},[e._v("注册")])],1)])],1)])])])},r=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"left"},[t("div",{staticClass:"header_logo"},[t("div",{staticClass:"_logo"},[t("img",{attrs:{src:s(1468)}})]),t("div",{staticClass:"_title"},[t("h2",[e._v("人力资源管理系统")]),t("p",[e._v("GDOU-HRM")])])]),t("div",{staticClass:"big_logo"}),t("div",{staticClass:"foot_logo"},[t("div",{staticClass:"foot_title"},[t("h2",[e._v("广东海洋大学")]),t("p",[e._v("GDOU")])])])])}],l=(s(7658),{name:"Login",data(){return{checked:!1,registerFlag:!1,loginForm:{username:"",password:""},userInfo:[],loginFormRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"长度在 6 到 15 个字符",trigger:"blur"}]},ReFormData:{username:"",password:""},ReFormRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"长度在 6 到 15 个字符",trigger:"blur"}]},selectedRoleId:""}},created(){this.getUserInfo(),this.checkremberpassword()},methods:{checkremberpassword(){this.checked=window.localStorage.getItem("checked"),"true"==this.checked&&(this.checked=!0),1==this.checked?(this.loginForm.username=window.localStorage.getItem("username"),this.loginForm.password=window.localStorage.getItem("password")):window.localStorage.clear()},login(){this.$refs.loginFormRef.validate((async e=>{if(!e)return;const{data:t}=await this.$http.post(`/Sys/login?username=${this.loginForm.username}&password=${this.loginForm.password}`);if(!0!==t.ok)return this.$message.error("登录失败!");this.$message.success("登录成功！"),window.sessionStorage.setItem("token",t.data.token),window.sessionStorage.setItem("uid",t.data[0].u_id),window.localStorage.clear(),window.localStorage.setItem("checked",this.checked),window.localStorage.setItem("username",this.loginForm.username),window.localStorage.setItem("password",this.loginForm.password),this.$router.push("/Banner")}))},register(){this.loginForm.r_id=this.selectedRoleId,this.$refs.ReFormData.validate((async e=>{if(!e)return;const{data:t}=await this.$http.post(`/Sys/register/${this.ReFormData.username}/${this.ReFormData.password}/${this.selectedRoleId}`);console.log(t),this.$message.success("注册成功！"),this.$refs.ReFormData=[],this.registerFlag=!this.registerFlag}))},reset(){this.loginForm.username="",this.loginForm.password=""},async getUserInfo(){const{data:e}=await this.$http.post("Sys/register/queryAllRole");console.log(e),this.userInfo=e.data}}}),i=l,o=s(1001),n=(0,o.Z)(i,a,r,!1,null,"676ce2f7",null),c=n.exports},1468:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAApCAYAAABdnotGAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAHgSURBVFiF7VcxUsMwEFxlMkM6/ANc0sETUtJBS5U8gR/wlDwl/IDQ0UXpUjCT0EHBLI3tkc/yWTJyzDBsZZ1WuvXltFYAD0jOSa5JHkg+k3z08U4Ckkv6sR5L0LZFEEnOh84/EWLmAHKFfzukGEAI+g2QgjYAjgr/ZUAtfpB8aOmf7cnFCFFlcx9IrkhmowlyhOVjaxgdxh2QvAFw1cL9RLPhMwBnxfMbgC9nzhpjnsT+d8UaHxp8FJ+LVFjJjB37r4DmsU/ZuNYTy7v4UpC2IBbvnpi2/w5wBBXHOmWFNu4gwDZsTRDSVgdoHoDrEL4rKLXxWTEet0LGGFkhbf9jyZ86wQtlwR7AvYgtACxb+BtP7FzZ35YPrqBcWfDqMbmFwvfdGLQeqvihP5kvgca3npjWQxU/tKl7J3CQxwrSFuwiE/QyxUpQgClad9CTr6HilxXKOxbEHOEf8UtBwW8QyJfHPm2FjDFSUBc/6rPh8ktBmilKMX34minWqlkaY8ojnLH5t/tS4deqWQoKctFQQQDmyryEdQchTW09scFuliFNHWuKsaiZaHSFhr5ZTkgG3eQc5AnFNPafIL0pxqK2/7RIIJNW8Jiiy88AzMT8XoxnaL7EB4rKeEz0H//4W/gG6k1hGgB+GugAAAAASUVORK5CYII="},6949:function(e,t,s){e.exports=s.p+"img/logo.05723836.png"},9921:function(e,t,s){e.exports=s.p+"img/玛奇玛small.0f9b13eb.png"}}]);
//# sourceMappingURL=316.9cfca2e9.js.map