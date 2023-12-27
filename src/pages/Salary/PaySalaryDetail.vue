<template>
    <div class="PaySalaryDetail">
        <el-card>
            <!-- 查询 -->
            <el-row type="flex" justify="space-between">
                <el-form ref="queryInfo" :model="queryInfo" size="small" class="demo-form-inline" inline>
                    <div class="block">
                        <el-form-item>
                            <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始日期"
                                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" end-placeholder="结束日期"
                                :default-time="['00:00:00']">
                            </el-date-picker>
                            <el-button size="small" icon="el-icon-search" @click="getSalaryListByTime()">查询</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-row>
            <!-- 表格 -->
            <el-table :data="salaryDetailList" border stripe>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="f_name" label="制定人姓名" show-overflow-tooltip />
                <el-table-column prop="username" label="受理人姓名" show-overflow-tooltip />
                <el-table-column prop="o3_name" label="薪资标准" show-overflow-tooltip />
                <el-table-column prop="profession" label="职位名称" show-overflow-tooltip />
                <el-table-column prop="allmoney" label="总薪资" show-overflow-tooltip />
                <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip />
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "PaySalaryDetail",
    data() {
        return {
            //获取用户列表的参数对象
            queryInfo: {
                //搜索关键字
                query: '',
                //当前的页数
                pagenum: 0,
                //当前每页显示多少条数据
                pagesize: 10
            },
            salaryDetailList: [],
            total: 0,
            value1: '',
            //控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            //添加用户的表单数据
            addForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            //添加表单的验证规则对象
            addFormRules: {
                username: [
                    { required: true, message: '请输入职位名', trigger: 'blur' },
                    { min: 2, max: 10, message: '用户名的长度在2~10个字符之间', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '用户名的长度在6~15个字符之间', trigger: 'blur' }
                ],

            },
            //控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            //修改用户信息时查询到的用户信息对象
            editForm: {},
            //控制分配角色对话框的显示与隐藏
            setRolesDialogVisible: false,
            //需要被分配角色的用户信息
            userInfo: {},
            //所有角色的数据列表
            rolesList: [],
            //已选中的角色Id值
            selectedRoleId: ''
        }
    },
    methods: {
        //获取用户列表
        async getSalaryList() {
            //    this.queryInfo.pagenum=0
            const { data: res } = await this.$http.post(`/Sal/give/giveSalAllInfo/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            this.salaryDetailList = res.data
            this.total = 0;
            res.data.forEach(() => {
                this.total++;
            });

        },
        async getSalaryListByTime() {
            console.log(this.value1);
            if (this.value1 != null) {
                this.queryInfo.pagenum = 0
                const { data: res } = await this.$http.post(`/Sal/GiveAllInfoByTime?startTime=${this.value1[0]}&endTime=${this.value1[1]}&pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`)
                //   if(res.meta.status!==200){
                //       return this.$message.error('获取用户列表失败！')
                //   }
                this.salaryDetailList = res.data
                this.total = 0;
                res.data.forEach(() => {
                    this.total++;
                });
            } else this.getSalaryList()


        },
        //监听pagesize改变的事件
        handleSizeChanged(newSize) {
            this.queryInfo.pagesize = newSize
            this.getSalaryList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage) {
            console.log(this.queryInfo.pagenum);
            this.queryInfo.pagenum = newPage - 1
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
                const { data: res } = await this.$http.post(`/Sys/position/insertProfession?profession=${this.addForm.username}`)

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
            const { data: res } = await this.$http.get('users/' + id)

            if (res.meta.status !== 200) {
                return this.$message.error('查询用户信息失败！')
            }
            this.editForm = res.data
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        //修改用户信息并提交
        editUserInfo() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return
                //发起修改用户信息的数据请求
                const { data: res } = await this.$http.post(`/Sys/position/updateProfessionByPid?profession=${this.editForm.username}&pId=${window.sessionStorage.getItem('id')}`)

                //  if(res.meta.status!==200){
                //      return this.$message.error('更新用户信息失败！')
                //  }

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

            const { data: res } = await this.$http.post(`/Sys/position/deleteProfessionByPid?pId=${id}`)

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
        this.getSalaryList()
    },
};
</script>

<style scoped>
.PaySalaryDetail {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>