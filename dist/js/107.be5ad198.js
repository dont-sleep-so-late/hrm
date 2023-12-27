"use strict";(self["webpackChunkGDUOHRM"]=self["webpackChunkGDUOHRM"]||[]).push([[107],{3107:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"AddSalary"},[t("el-card",[t("el-row",{attrs:{type:"flex",justify:"space-between"}},[t("el-form",{staticClass:"demo-form-inline",attrs:{size:"small",inline:""}},[t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.addDialogVisible=!0}}},[e._v("添加薪酬 ")])],1)],1)],1),t("el-table",{ref:"table",attrs:{data:e.userlist,border:""}},[t("el-table-column",{attrs:{type:"index",label:"编号",width:"100","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"fname",label:"制定人姓名","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"o3Name",label:"薪资标准","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"pname",label:"职位名称","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"allmoney",label:"总薪资","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"username",label:"受理人","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"createTime",label:"创建时间","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"danger",content:"删除",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.removeUserById(a.row.sid)}}}),t("el-tooltip",{attrs:{effect:"dark",content:"查看详情",placement:"top",enterable:!1}},[t("el-button",{attrs:{type:"warning",icon:"el-icon-setting",size:"mini"},on:{click:function(t){return e.showEditDialog(a.row.sid)}}})],1),t("el-button",{attrs:{type:"primary",content:"重新提交",icon:"el-icon-refresh-left",size:"mini"},on:{click:function(t){return e.addSalaryAgain(a.row.sid)}}})]}}])})],1),t("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[5,10,20,50],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChanged,"current-change":e.handleCurrentChange}})],1),t("el-dialog",{attrs:{title:"薪酬标准登记",visible:e.addDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addDialogVisible=t}}},[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:8}}),t("el-form",{attrs:{model:e.editForm,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"制定人"}},[t("el-cascader",{attrs:{options:e.flist,props:e.flistProps},model:{value:e.editForm.fname,callback:function(t){e.$set(e.editForm,"fname",t)},expression:"editForm.fname"}})],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"薪酬标准名称"}},[t("el-cascader",{attrs:{options:e.salarylist,props:e.salaryProps},on:{change:function(t){return e.serachUser()}},model:{value:e.editForm.o3Id,callback:function(t){e.$set(e.editForm,"o3Id",t)},expression:"editForm.o3Id"}})],1),t("el-form-item",{attrs:{label:"薪酬标准编号"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.o3Id,callback:function(t){e.$set(e.editForm,"o3Id",t)},expression:"editForm.o3Id"}})],1),t("el-form-item",{attrs:{label:"登记人"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.uid,callback:function(t){e.$set(e.editForm,"uid",t)},expression:"editForm.uid"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"职位名称"}},[t("el-cascader",{attrs:{options:e.professionlist,props:e.professionProps},on:{change:function(t){return e.serachUser()}},model:{value:e.editForm.pid,callback:function(t){e.$set(e.editForm,"pid",t)},expression:"editForm.pid"}})],1),t("el-form-item",{attrs:{label:"薪酬总额"}},[t("el-input",{attrs:{disabled:""},model:{value:e.money,callback:function(t){e.money=t},expression:"money"}})],1),t("el-form-item",{attrs:{label:"基本工资"}},[t("el-input",{attrs:{type:"number"},model:{value:e.editForm.basic,callback:function(t){e.$set(e.editForm,"basic",t)},expression:"editForm.basic"}})],1)],1)],1),t("el-form",e._l(e.data,(function(a){return t("div",{key:a.id,staticStyle:{width:"60%",margin:"0 auto"}},[t("el-checkbox",{attrs:{label:a.name,border:""},model:{value:a.check,callback:function(t){e.$set(a,"check",t)},expression:"element.check"}}),t("el-input",{staticStyle:{width:"60%",float:"right"},attrs:{disabled:!a.check},model:{value:a.customize,callback:function(t){e.$set(a,"customize",t)},expression:"element.customize"}})],1)})),0)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addSalary}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"详情页面",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t}}},[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:8}}),t("el-form",{attrs:{model:e.detailForm,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"制定人"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detailForm.fname,callback:function(t){e.$set(e.detailForm,"fname",t)},expression:"detailForm.fname"}})],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"薪酬标准"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detailForm.o3Name,callback:function(t){e.$set(e.detailForm,"o3Name",t)},expression:"detailForm.o3Name"}})],1),t("el-form-item",{attrs:{label:"登记人编号"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detailForm.sid,callback:function(t){e.$set(e.detailForm,"sid",t)},expression:"detailForm.sid"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"薪酬总额"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detailForm.allmoney,callback:function(t){e.$set(e.detailForm,"allmoney",t)},expression:"detailForm.allmoney"}})],1),t("el-form-item",{attrs:{label:"登记时间"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detailForm.createTime,callback:function(t){e.$set(e.detailForm,"createTime",t)},expression:"detailForm.createTime"}})],1),t("el-form-item",{attrs:{label:"基本工资"}},[t("el-input",{attrs:{disabled:""},model:{value:e.detailForm.basic,callback:function(t){e.$set(e.detailForm,"basic",t)},expression:"detailForm.basic"}})],1)],1)],1),t("el-form",{attrs:{"label-width":"100px"}},e._l(e.detailForm.items,(function(a){return t("el-form-item",{key:a.id,attrs:{label:a.name}},[t("el-input",{attrs:{disabled:""},model:{value:a.value,callback:function(t){e.$set(a,"value",t)},expression:"item.value"}})],1)})),1)],1)],1)],1)},s=[],l=(a(7658),{name:"AddSalary",data(){return{data:[],item:[{id:"",customize:"",check:!1}],salarylist:[],salaryProps:{value:"o3_id",label:"o3_name",children:"children",expandTrigger:"hover"},professionlist:[],professionProps:{value:"p_id",label:"profession",children:"children",expandTrigger:"hover"},flist:[],flistProps:{value:"name",label:"name",children:"children",expandTrigger:"hover"},queryInfo:{query:"",pagenum:1,pagesize:5},editForm1:{time2:"",time3:"",time4:"",time5:"",time6:"",time7:"",time8:""},userlist:[],total:0,addDialogVisible:!1,addFormRules:{username:[{required:!0,message:"请输入用户邮箱",trigger:"blur"},{min:3,max:10,message:"用户名的长度在3~10个字符之间",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"用户名的长度在6~15个字符之间",trigger:"blur"}]},editDialogVisible:!1,money:"",editForm:{basic:"",uid:window.sessionStorage.getItem("uid"),sid:"",fname:"",o3Id:"",pid:"",items:[]},detailForm:[],userInfo:{},rolesList:[],selectedRoleId:""}},watch:{money(e,t){this.data.forEach((e=>{this.data.basic+=e.formula*e.value}))}},methods:{async generateData(){const{data:e}=await this.$http.get("http://elms.free.idcfengye.com/salitem/list?pageNum=0&pageSize=1000");this.data=e.data},async getSalaryList(){this.queryInfo.pagenum=0;const{data:e}=await this.$http.post(`/Sal/list?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`);this.userlist=e.data,this.total=4;const{data:t}=await this.$http.post("/Sal/add/queryXinZiBiaoZhun");this.salarylist=t.data;const{data:a}=await this.$http.post("/Sys/position/queryAllProfession/0/1000");this.professionlist=a.data},async serachUser(){const{data:e}=await this.$http.post(`/Sal/getFile?organ3id=${this.editForm.o3Id}&pid=${this.editForm.pid}`);this.flist=e.data,console.log(this.flist)},async getUserListByName(){this.queryInfo.pagenum=this.queryInfo.pagenum-1;const{data:e}=await this.$http.post(`/Sys/user/queryUserByName/${this.queryInfo.query}/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`);this.userlist=e.data,this.total=4},handleSizeChanged(e){this.queryInfo.pagesize=e,this.getSalaryList()},handleCurrentChange(e){this.queryInfo.pagenum=e,this.getSalaryList()},async userStateChanged(e){const{data:t}=await this.$http.put(`users/${e.id}/state/${e.mg_state}`);if(200!==t.meta.status)return e.mg_state=!e.mg_state,this.$message.error("更新用户状态失败！");this.$message.success("更新用户状态成功！")},async addSalary(){this.data.forEach((e=>{e.check&&this.editForm.items.push({id:e.id,customize:e.customize})})),this.editForm.o3Id=this.editForm.o3Id[0],this.editForm.pid=this.editForm.pid[0],this.editForm.fname=this.editForm.fname[0],delete this.editForm.fid;const{data:e}=await this.$http.post("/Sal/add",this.editForm);this.$message.success("添加薪酬成功!"),this.addDialogVisible=!1,this.getSalaryList(),this.editForm=[],this.item=[]},async addSalaryAgain(e){const{data:t}=await this.$http.post("/Sal/secondCheck/"+e);this.$message.success("重新申请添加薪酬成功!")},async showEditDialog(e){this.editDialogVisible=!0;const{data:t}=await this.$http.post("/Sal/showSalInfoBySid/"+e);this.detailForm=t.data},async removeUserById(e){const t=await this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((e=>e));if("confirm"!==t)return this.$message.info("已取消删除");const{data:a}=await this.$http.post(`/Sal/add/deleteInfoBySid/${e}`);this.$message.success("删除用户成功！"),this.getSalaryList()}},created(){this.getSalaryList(),this.generateData()}}),o=l,r=a(1001),n=(0,r.Z)(o,i,s,!1,null,"777fcbc2",null),d=n.exports}}]);
//# sourceMappingURL=107.be5ad198.js.map