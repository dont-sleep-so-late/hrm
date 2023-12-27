"use strict";(self["webpackChunkGDUOHRM"]=self["webpackChunkGDUOHRM"]||[]).push([[997],{6997:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"DocumentQuery"},[t("el-card",[t("el-row",{attrs:{type:"flex",justify:"space-between"}},[t("el-col",{attrs:{span:5}},[t("el-cascader",{attrs:{placeholder:"搜索一级机构",options:e.parentCateList,props:e.cascaderProps,clearable:"","change-on-select":""},on:{change:e.parentCateChangedtwo},model:{value:e.selectedKeys,callback:function(t){e.selectedKeys=t},expression:"selectedKeys"}})],1),t("el-col",{attrs:{span:5}},[t("el-cascader",{attrs:{placeholder:"搜索二级机构",options:e.parentCateListthree,props:e.cascaderPropsthree,clearable:"","change-on-select":""},on:{change:e.parentCateChangedthree},model:{value:e.selectedKeysthree,callback:function(t){e.selectedKeysthree=t},expression:"selectedKeysthree"}})],1),t("el-col",{attrs:{span:4}},[t("el-cascader",{attrs:{placeholder:"搜索三级机构",options:e.parentCateListfour,props:e.parentCatePropsfour},model:{value:e.documentList.organizionId,callback:function(t){e.$set(e.documentList,"organizionId",t)},expression:"documentList.organizionId"}})],1),t("el-col",{attrs:{span:5}},[t("el-button",{attrs:{icon:"el-icon-search"},on:{click:e.getUserListByOrgan}},[e._v("搜索")])],1),t("el-col",{attrs:{span:3}},[t("el-cascader",{attrs:{placeholder:"职位名称",options:e.catelist,props:e.cateProps},model:{value:e.queryInfo.query4,callback:function(t){e.$set(e.queryInfo,"query4",t)},expression:"queryInfo.query4"}})],1),t("el-col",{attrs:{span:3}},[t("el-button",{attrs:{icon:"el-icon-search"},on:{click:e.getUserListByName4}},[e._v("搜索")])],1),t("el-col",{attrs:{span:2}},[t("el-button",{attrs:{icon:"el-icon-refresh-right"},on:{click:e.resetList}},[e._v("重置")])],1)],1),t("el-table",{attrs:{data:e.documentList,border:""}},[t("el-table-column",{attrs:{type:"index",label:"编号",width:"100","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"profession",label:"职位"}}),t("el-table-column",{attrs:{prop:"name",label:"姓名","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"o1Name",label:"一级机构","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"o2Name",label:"二级机构","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"o3Name",label:"三级机构","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{prop:"sex",label:"性别","show-overflow-tooltip":""}}),t("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"success",icon:"el-icon-zoom-in",size:"mini"},on:{click:function(t){return e.showEditDialog(a.row)}}})]}}])})],1),t("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[5,10,20,50],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChanged,"current-change":e.handleCurrentChange}}),t("el-dialog",{attrs:{title:"添加一级机构",visible:e.addDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.addDialogClosed}},[t("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"110px"}},[t("el-form-item",{attrs:{label:"一级机构名称",prop:"username"}},[t("el-input",{model:{value:e.addForm.username,callback:function(t){e.$set(e.addForm,"username",t)},expression:"addForm.username"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"档案复核",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.editDialogClosed}},[t("el-form",{ref:"editFormRef",attrs:{model:e.editForm,"label-width":"100px"}},[t("el-image",{staticStyle:{width:"140px",height:"180px",transform:"translateX(200%)"},attrs:{src:e.editForm.image}}),t("el-form-item",{attrs:{label:"职位名称"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.profession,callback:function(t){e.$set(e.editForm,"profession",t)},expression:"editForm.profession"}})],1),t("el-form-item",{attrs:{label:"姓名"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),t("el-form-item",{attrs:{label:"手机号"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.phone,callback:function(t){e.$set(e.editForm,"phone",t)},expression:"editForm.phone"}})],1),t("el-form-item",{attrs:{label:"邮箱"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1),t("el-form-item",{attrs:{label:"地址 "}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.address,callback:function(t){e.$set(e.editForm,"address",t)},expression:"editForm.address"}})],1),t("el-form-item",{attrs:{label:"学历 "}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.academic,callback:function(t){e.$set(e.editForm,"academic",t)},expression:"editForm.academic"}})],1),t("el-form-item",{attrs:{label:"所属一级机构"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.o1Name,callback:function(t){e.$set(e.editForm,"o1Name",t)},expression:"editForm.o1Name"}})],1),t("el-form-item",{attrs:{label:"所属二级机构"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.o2Name,callback:function(t){e.$set(e.editForm,"o2Name",t)},expression:"editForm.o2Name"}})],1),t("el-form-item",{attrs:{label:"所属三级机构"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.o3Name,callback:function(t){e.$set(e.editForm,"o3Name",t)},expression:"editForm.o3Name"}})],1),t("el-form-item",{attrs:{label:"性别"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.sex,callback:function(t){e.$set(e.editForm,"sex",t)},expression:"editForm.sex"}})],1),t("el-form-item",{attrs:{label:"创建时间"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.createTime,callback:function(t){e.$set(e.editForm,"createTime",t)},expression:"editForm.createTime"}})],1),t("el-form-item",{attrs:{label:"民族"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.nation,callback:function(t){e.$set(e.editForm,"nation",t)},expression:"editForm.nation"}})],1),t("el-form-item",{attrs:{label:"信仰宗教"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.religion,callback:function(t){e.$set(e.editForm,"religion",t)},expression:"editForm.religion"}})],1)],1)],1)],1)],1)},i=[],o={name:"AddDocument",data(){return{addCateForm:{cat_name:"",cat_pid:0,cat_level:0},addCateFormthree:{cat_name:"",cat_pid:0,cat_level:0},addCateFormRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},queryInfo:{query1:"",query2:"",query3:"",query4:"",pagenum:1,pagesize:10},documentList:[],total:0,addDialogVisible:!1,addForm:{username:"",password:"",email:"",mobile:""},catelist:[],cateProps:{value:"p_id",label:"profession",children:"children",expandTrigger:"hover"},addFormRules:{username:[{required:!0,message:"请输入一级机构名称",trigger:"blur"},{min:3,max:10,message:"用户名的长度在3~10个字符之间",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"用户名的长度在6~15个字符之间",trigger:"blur"}]},editDialogVisible:!1,addCateDialogVisiblethree:!1,addCateDialogVisibletwo:!1,editForm:{},setRolesDialogVisible:!1,userInfo:{},rolesList:[],selectedRoleId:"",parentCateList:[],parentCateListfour:[],cascaderProps:{value:"o1_id",label:"o1_name",children:"children",expandTrigger:"hover"},selectedKeys:"",parentCateListthree:[],cascaderPropsthree:{value:"o2_id",label:"o2_name",children:"children",expandTrigger:"hover"},parentCatePropsfour:{value:"o3_id",label:"o3_name",children:"children",expandTrigger:"hover"},selectedKeysthree:""}},methods:{async getDocumentList(){this.queryInfo.pagenum=0;const{data:e}=await this.$http.post(`/File/listFileSelect?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`);this.documentList=e.data,this.total=0,e.data.forEach((()=>{this.total++}));const{data:t}=await this.$http.post("/Sys/organ/queryOrgan1"),{data:a}=await this.$http.post("/File/add/queryProfession");this.catelist=a.data,this.parentCateList=t.data},async getParentCateList(){const{data:e}=await this.$http.post("/Sys/organ/queryOrgan1");this.parentCateList=e.data},async parentCateChangedtwo(){const{data:e}=await this.$http.post(`/Sys/organ/queryOrgan2/${this.selectedKeys}`);this.parentCateListthree=e.data},async parentCateChangedthree(){const{data:e}=await this.$http.post(`/Sys/organ/queryOrgan3/${this.selectedKeysthree}`);this.parentCateListfour=e.data},async getUserListByOrgan(){if(this.documentList[0]==[])this.getDocumentList();else{this.queryInfo.pagenum=0;const{data:e}=await this.$http.post(`/File/listFileSelectByOrgan?pageSize=${this.queryInfo.pagesize}&pageNum=${this.queryInfo.pagenum}&organ1Name=${this.selectedKeys[0]}&organ2Name=${this.selectedKeysthree[0]}&organ3Name=${this.documentList.organizionId[0]}`);this.documentList=e.data,this.total=0,e.data.forEach((()=>{this.total++}))}},async getUserListByName4(){if(""==this.queryInfo.query4)this.getDocumentList();else{this.queryInfo.pagenum=0;const{data:e}=await this.$http.post(`/File/listFileSelectByProfession?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}&Profession=${this.queryInfo.query4}`);console.log(e.data),this.documentList=e.data,this.total=0,e.data.forEach((()=>{this.total++}))}},handleSizeChanged(e){this.queryInfo.pagesize=e,this.getDocumentList()},handleCurrentChange(e){console.log(6),this.queryInfo.pagenum=e,this.getDocumentList()},async userStateChanged(e){const{data:t}=await this.$http.put(`users/${e.id}/state/${e.mg_state}`);if(200!==t.meta.status)return e.mg_state=!e.mg_state,this.$message.error("更新用户状态失败！");this.$message.success("更新用户状态成功！")},addDialogClosed(){this.$refs.addFormRef.resetFields()},addUser(){this.$refs.addFormRef.validate((async e=>{if(!e)return;const{data:t}=await this.$http.post(`/Sys/organ/insertOrgan1?o1Name=${this.addForm.username}`);this.$message.success("添加用户成功!"),this.addDialogVisible=!1,this.getDocumentList()}))},async showEditDialog(e){this.editForm=e,this.editDialogVisible=!0},editDialogClosed(){this.$refs.editFormRef.resetFields()},resetList(){this.queryInfo.query1="",this.queryInfo.query4=""}},created(){},mounted(){this.getDocumentList()}},r=o,l=a(1001),n=(0,l.Z)(r,s,i,!1,null,"e0da4176",null),d=n.exports}}]);
//# sourceMappingURL=997.ee2edb57.js.map