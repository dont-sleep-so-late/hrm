<template>
    <div class="DocumentCheck">
        <el-card>
            <!-- 表格 -->
            <el-table :data="userlist" border>
                <el-table-column type="index" label="编号" width="100"></el-table-column>
                <el-table-column prop="profession" label="职位" show-overflow-tooltip />
                <el-table-column prop="name" label="姓名" show-overflow-tooltip />
                <el-table-column prop="o1Name" label="一级机构" show-overflow-tooltip />
                <el-table-column prop="o2Name" label="二级机构" show-overflow-tooltip />
                <el-table-column prop="o3Name" label="三级机构" show-overflow-tooltip />
                <el-table-column prop="sex" label="性别" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="showEditDialog(scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeUserById(scope.row.fid)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 50]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>


            <!-- 添加用户的对话框 -->
            <!-- visible.sync为控制显示和隐藏 -->
            <el-dialog title="添加职位" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                    <el-form-item label="职位名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>

                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>

            <!--修改用户的对话框  -->
            <el-dialog title="档案复核" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="reject">驳 回</el-button>
                    <el-button type="primary" @click="editUserInfo">通 过</el-button>
                </span>
                <el-form ref="editFormRef" :model="editForm" label-width="100px">
                    <!-- prop是绑定验证规则的属性 -->

                    <el-image style="width: 180px; height: 180px; transform:translateX(140%)"
                        :src="editForm.image"></el-image>

                    <el-form-item label="职位名称">
                        <el-input v-model="editForm.profession" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="editForm.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所属一级机构">
                        <el-input v-model="editForm.o1Name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所属二级机构">
                        <el-input v-model="editForm.o2Name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所属三级机构">
                        <el-input v-model="editForm.o3Name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="editForm.sex" disabled></el-input>
                    </el-form-item>
                </el-form>

            </el-dialog>

        </el-card>
    </div>
</template>

<script>
export default {
    name: "DocumentCheck",
    data() {
        return {
            //获取用户列表的参数对象
            queryInfo: {
                //搜索关键字
                query: '',
                //当前的页数
                pagenum: 0,
                //当前每页显示多少条数据
                pagesize: 5
            },
            userlist: [],
            total: 0,
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
        //获取档案列表
        async getDocumentList() {
            //    this.queryInfo.pagenum=0
            const { data: res } = await this.$http.post(`/File/listFileRechecked?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            console.log(res.data);
            this.userlist = res.data
            this.total = 1

        },
        async getUserListByName() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/Sys/position/queryProfessionByProfession/${this.queryInfo.query}/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            console.log(res.data);
            this.userlist = res.data
            this.total = 1

        },
        //监听pagesize改变的事件
        handleSizeChanged(newSize) {

            this.queryInfo.pagesize = newSize
            this.getDocumentList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage) {
            console.log(this.queryInfo.pagenum);
            this.queryInfo.pagenum = newPage - 1
            this.getDocumentList()
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
                this.getDocumentList()
            })
        },
        //展示编辑用户的对话框
        async showEditDialog(data) {
            this.editDialogVisible = true
            window.sessionStorage.setItem("fid", data.fid)
            this.editForm = data
            if (this.editForm.image == '') {
                this.editForm.image = 'https://avatars.githubusercontent.com/u/47170023?v=4'
            }
            this.editDialogVisible = true
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        async reject() {
            const { data: res } = await this.$http.post(`/File/check/updateCheckFalseInfoByFid/${window.sessionStorage.getItem('id')}`)

            this.editDialogVisible = false
        },
        //修改用户信息并提交
        editUserInfo() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return
                //发起修改用户信息的数据请求
                const { data: res } = await this.$http.post(`/File/check/updateCheckInfoByFid/${window.sessionStorage.getItem('fid')}`)

                //  if(res.meta.status!==200){
                //      return this.$message.error('更新用户信息失败！')
                //  }

                //关闭对话框
                this.editDialogVisible = false
                //刷新数据列表
                this.getDocumentList()
                //提示用户
                this.$message.success('审核成功！')
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

            const { data: res } = await this.$http.post(`/File/add/deleteInfoByFid/${id}`)

            // if(res.meta.status!==200){
            //     return this.$message.error('删除用户失败！')
            // }
            this.$message.success('删除用户成功！')
            this.getDocumentList()
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
            this.getDocumentList()
            this.setRolesDialogVisible = false
        },
        //监听分配角色对话框的关闭事件
        setRoleDialogClosed() {
            this.selectedRoleId = ''
            this.userInfo = {}
        }
    },
    created() {
        this.getDocumentList()
    },
};
</script>

<style scoped>
.DocumentCheck {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>