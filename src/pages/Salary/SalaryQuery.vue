<template>
    <div class="SalaryQuery">
        <el-card>
            <!-- 查询 -->
            <el-row type="flex" justify="space-between">
                <el-form size="small" class="demo-form-inline" inline>
                    <el-form-item label="薪资标准:">
                        <el-input v-model.trim="queryInfo.query1" clearable placeholder="请输入薪资标准">
                            <el-button slot="append" icon="el-icon-search" @click="getUserListByName1"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="登记人查询:">
                        <el-input v-model.trim="queryInfo.query3" clearable placeholder="请输入登记人查询">
                            <el-button slot="append" icon="el-icon-search" @click="getUserListByName3"></el-button>
                        </el-input>
                    </el-form-item>

                </el-form>
            </el-row>
            <!-- 表格 -->
            <el-table :data="detailForm" border>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="o3Name" label="薪资标准" show-overflow-tooltip />
                <el-table-column prop="pname" label="职位名称" show-overflow-tooltip />
                <el-table-column prop="fname" label="姓名" show-overflow-tooltip />
                <el-table-column prop="username" label="登记人" show-overflow-tooltip />
                <el-table-column prop="allmoney" label="总薪资" show-overflow-tooltip />
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-zoom-in" size="mini"
                            @click="showEditDialog(scope.row.sid)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 50]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

            <!--用户的对话框  -->
            <el-dialog title="详情页面" :visible.sync="editDialogVisible" width="50%">
                <el-row :gutter="20">

                    <!-- clearable添加了为可清空的文本框 -->
                    <!-- <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.query" clearable @clear="getSalaryList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserListByName"></el-button>
                 </el-input> -->
                    <el-col :span="8">

                    </el-col>
                    <el-form :model="detailForm" label-width="100px">
                        <!-- prop是绑定验证规则的属性 -->

                        <el-form-item label="制定人">
                            <el-input v-model="detailForm.fname" disabled></el-input>
                        </el-form-item>

                        <el-col :span="12">
                            <el-form-item label="薪酬标准名称">
                                <el-input v-model="detailForm.o3Name" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="薪酬标准编号">
                                <el-input v-model="detailForm.sid" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="登记人">
                                <el-input v-model="detailForm.username" disabled></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="薪酬总额">
                                <el-input v-model="detailForm.allmoney" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="登记时间">
                                <el-input v-model="detailForm.createTime" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="基本工资">
                                <el-input v-model="detailForm.basic" disabled></el-input>
                            </el-form-item>
                        </el-col>

                    </el-form>
                    <el-form label-width="100px">

                        <el-form-item v-for="item in detailForm.items" :key="item.id" :label="item.name">
                            <el-input v-model="item.value" disabled></el-input>
                        </el-form-item>
                    </el-form>


                </el-row>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
export default {
    name: "SalaryQuery",
    data() {
        return {
            catelist: [],
            //级联选择器的配置对象
            cateProps: {
                value: 'o3_id',
                label: 'o3_name',
                children: 'children',
                expandTrigger: 'hover',
            },

            //获取用户列表的参数对象
            queryInfo: {
                //搜索关键字
                query1: '',
                query2: '',
                query3: '',
                query4: '',
                //当前的页数
                pagenum: 1,
                //当前每页显示多少条数据
                pagesize: 10
            },
            total: 0,
            //控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            //添加用户的表单数据
            detailForm: [],

            //控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            addCateDialogVisiblethree: false,
            addCateDialogVisibletwo: false,
            //修改用户信息时查询到的用户信息对象
            //   editForm:{},
            //控制分配角色对话框的显示与隐藏
            setRolesDialogVisible: false,
            //需要被分配角色的用户信息
            userInfo: {},
            //所有角色的数据列表
            rolesList: [],
            //已选中的角色Id值
            selectedRoleId: '',
            //父级分类的列表
            parentCateList: [],
            //指定级联选择器的配置对象
            cascaderProps: {
                value: 'o1_id',
                label: 'o1_name',
                children: 'children',
                expandTrigger: 'hover'
            },
            //选中的父级分类的id数组
            selectedKeys: '',
            parentCateListthree: [],
            //指定级联选择器的配置对象
            cascaderPropsthree: {
                value: 'o2_id',
                label: 'o2_name',
                children: 'children',
                expandTrigger: 'hover'
            },
            //选中的父级分类的id数组
            selectedKeysthree: '',
            time1: ''
        }
    },
    watch: {
        time1(newVal, oldVal) {
            this.editForm1.time2 = newVal * 0.1
            this.editForm1.time3 = newVal * 0.1
            this.editForm1.time4 = newVal * 0.1
            this.editForm1.time5 = newVal * 0.08
            this.editForm1.time6 = newVal * 0.005
            this.editForm1.time7 = newVal * 0.02 + 3
            this.editForm1.time8 = newVal * 0.08
            this.editForm.money = this.editForm1.time2 + this.editForm1.time3 + this.editForm1.time4 + this.editForm1.time5 + this.editForm1.time6 + this.editForm1.time7 + this.editForm1.time8 + (this.time1 - 0)
        }

    },
    methods: {
        async parentCateChangedtwo() {
            console.log(555);
            const { data: res2 } = await this.$http.post(`/Sys/organ/queryOrgan2/${this.selectedKeys}`)
            this.parentCateListthree = res2.data
        },

        //获取用户列表
        async getSalaryList() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/Sal/listSelect?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }


            this.detailForm = res.data
            this.total = 0;
            res.data.forEach(() => {
                this.total++;
            });

            const { data: res1 } = await this.$http.post('/Sys/organ/queryOrgan1')
            //  const {data:res2}=await this.$http.post('/Sys/organ/queryOrgan2')

            //  if(res.meta.status!==200){
            //     return this.$message.error('获取父级分类数据失败!')
            //  }

            this.parentCateList = res1.data



        },
        addCate() {
            this.$refs.addCateFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.post(`/Sys/organ/insertOrgan2?o1Id=${this.selectedKeys}&o2Name=${this.addCateForm.cat_name}`)

                //  if(res.meta.status!==201){
                //      return this.$message.error('添加分类失败！')
                //  }

                this.$message.success('添加分类成功！')
                //  this.getCateList()
                this.addCateDialogVisibletwo = false
            })
        },
        addCatethree() {
            this.$refs.addCateFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.post(`/Sys/organ/insertOrgan3?o2Id=${this.selectedKeysthree}&o3Name=${this.addCateFormthree.cat_name}`)

                //  if(res.meta.status!==201){
                //      return this.$message.error('添加分类失败！')
                //  }

                this.$message.success('添加分类成功！')
                //  this.getCateList()
                this.addCateDialogVisiblethree = false
            })
        },
        //获取一级权限分类列表
        async getParentCateList() {
            const { data: res1 } = await this.$http.post('/Sys/organ/queryOrgan1')
            //  const {data:res2}=await this.$http.post('/Sys/organ/queryOrgan2')

            //  if(res.meta.status!==200){
            //     return this.$message.error('获取父级分类数据失败!')
            //  }

            this.parentCateList = res1.data
            this.parentCateListthree = res2.data
        },
        async getUserListByName1() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/Sal/listBy03Name?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}&o3name=${this.queryInfo.query1}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            this.total = 0;
            if (res.data) {
                this.detailForm = res.data
                res.data.forEach(() => {
                    this.total++;
                });
            } else {
                this.detailForm = []
            }
            if (this.queryInfo.query1 == '') this.getSalaryList()


        },
        async getUserListByName2() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/File/query/showFileSelectByOrgan2/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}/${this.queryInfo.query2}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            console.log(res.data);
            this.detailForm = res.data
            this.total = 0;
            res.data.forEach(() => {
                this.total++;
            });

        },
        async getUserListByName3() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/Sal/listByUser?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}&username=${this.queryInfo.query3}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   } 
            this.total = 0;
            if (res.data) {
                this.detailForm = res.data
                res.data.forEach(() => {
                    this.total++;
                });
            } else {
                this.detailForm = []
            }
            if (this.queryInfo.query3 == '') this.getSalaryList()

        },
        async getUserListByName4() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/File/query/showFileSelectByProfession/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}/${this.queryInfo.query4}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            console.log(res.data);
            this.detailForm = res.data
            this.total = 8

        },
        //监听pagesize改变的事件
        handleSizeChanged(newSize) {

            this.queryInfo.pagesize = newSize
            this.getSalaryList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage) {
            console.log(6);
            this.queryInfo.pagenum = newPage
            this.getSalaryList()
        },
        //监听switch开关状态的改变
        async userStateChanged(userinfo) {
            const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
            if (res.meta.status !== 200) {
                userinfo.mg_state = !userinfo.mg_state
                return this.$message.error('更新用户状态失败！')
            }
            this.$message.success('更新用户状态成功！')
        },
        //监听添加用户对话框的关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        //点击按钮 添加新用户
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return
                //可以发起添加用户的网络请求
                const { data: res } = await this.$http.post(`/Sys/organ/insertOrgan1?o1Name=${this.addForm.username}`)

                //  if(res.meta.status!==201){
                //      this.$message.error('添加用户失败！')
                //  }
                this.$message.success('添加用户成功!')
                //隐藏添加用户的对话框
                this.addDialogVisible = false
                //重新获取用户列表数据
                this.getSalaryList()


            })
        },
        //展示编辑用户的对话框
        async showEditDialog(id) {
            this.editDialogVisible = true
            window.sessionStorage.setItem("id", id)
            const { data: res } = await this.$http.post('/Sal/showSalInfoBySid/' + id)
            this.detailForm = res.data

            if (this.editForm.image == '') {
                this.editForm.image = 'http://rluc5ispc.hn-bkt.clouddn.com/2022/12/18/9d51d40e5e2740b9b285c4b22d1af6af.jpg'
            }
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.editDialogVisible = false
            //  this.$refs.editFormRef.resetFields()
        },
        //修改用户信息并提交
        editUserInfo() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return
                //发起修改用户信息的数据请求
                const { data: res } = await this.$http.put('users/' + this.editForm.id, {
                    email: this.editForm.email,
                    mobile: this.editForm.mobile
                })

                if (res.meta.status !== 200) {
                    return this.$message.error('更新用户信息失败！')
                }

                //关闭对话框
                this.editDialogVisible = false
                //刷新数据列表
                this.getSalaryList()
                //提示用户
                this.$message.success('更新用户信息成功！')
            })
        },
        //根据Id删除对应的用户信息
        async removeUserById(id) {
            //弹框询问用户是否删除数据
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)

            //如果用户确认删除，则返回值为字符串confirm
            //如果用户取消了删除，则返回值为字符串 cancel
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }

            const { data: res } = await this.$http.post(`/Sys/organ/deleteOrgan3/${id}`)

            // if(res.meta.status!==200){
            //     return this.$message.error('删除用户失败！')
            // }
            this.$message.success('删除用户成功！')
            this.getSalaryList()
        },
        //展示分配角色的对话框
        async setRole(userInfo) {
            this.userInfo = userInfo

            //在展示对话框之前，获取所有角色的列表
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败！')
            }

            this.rolesList = res.data

            this.setRolesDialogVisible = true
        },
        //点击按钮，分配角色
        async saveRoleInfo() {
            if (!this.selectedRoleId) {
                return this.$message.error('请选择要分配的角色!')
            }

            const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, {
                rid: this.selectedRoleId
            })

            if (res.meta.status !== 200) {
                return this.$message.error('更新角色失败！')
            }

            this.$message.success('更新角色成功！')
            this.getSalaryList()
            this.setRolesDialogVisible = false
        },
        //监听分配角色对话框的关闭事件
        setRoleDialogClosed() {
            this.selectedRoleId = ''
            this.userInfo = {}
        }
    },
    created() {
    },
    mounted() {
        this.getSalaryList()



    }
};
</script>

<style scoped>
.SalaryQuery {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>