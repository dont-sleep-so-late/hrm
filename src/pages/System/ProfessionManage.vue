<template>
    <div class="ProfessionManage">
        <el-card>
            <!-- 查询 -->
            <el-row type="flex" justify="space-between">
                <el-form size="small" class="demo-form-inline" inline>
                    <el-form-item>
                        <el-input v-model.trim="queryInfo.query" placeholder="请输入" /></el-form-item>
                    <el-form-item>
                        <el-button size="small" icon="el-icon-search" @click="getUserListByName()">查询</el-button>
                        <el-button type="primary" size="small" @click="addDialogVisible = true">添加职位</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <!-- 表格 -->
            <el-table ref="table" :data="userlist" border>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="profession" label="职位名称" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="showEditDialog(scope.row.p_id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeUserById(scope.row.p_id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

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
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form ref="editFormRef" :model="editForm" label-width="70px">
                <!-- prop是绑定验证规则的属性 -->
                <el-form-item label="职位名称">
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: "ProfessionManage",
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
        //获取用户列表
        async getProfessionList() {
            //    this.queryInfo.pagenum=0
            const { data: res } = await this.$http.post(`/Sys/position/queryAllProfession/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            this.userlist = res.data
            this.total = 0;

            const { data: total } = await this.$http.post(`/Sys/position/queryAllProfession/0/1000`)
            total.data.forEach(() => {
                this.total++;
            });

        },
        async getUserListByName() {
            if (this.queryInfo.query == '') this.getProfessionList()
            else {
                this.queryInfo.pagenum = 0
                const { data: res } = await this.$http.post(`/Sys/position/queryProfessionByProfession/${this.queryInfo.query}/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
                this.userlist = res.data
                this.total = 0;
                res.data.forEach(() => {
                    this.total++;
                });
            }
        },
        //监听pagesize改变的事件
        handleSizeChanged(newSize) {
            this.queryInfo.pagesize = newSize
            this.getProfessionList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage) {
            console.log(this.queryInfo.pagenum);
            this.queryInfo.pagenum = newPage
            this.getProfessionList()
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
                this.getProfessionList()
            })
        },
        //展示编辑用户的对话框
        async showEditDialog(id) {
            this.editDialogVisible = true
            window.sessionStorage.setItem("id", id)
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
                const { data: res } = await this.$http.post(`/Sys/position/updateProfessionByPid?profession=${this.editForm.username}&p_id=${window.sessionStorage.getItem('id')}`)

                //  if(res.meta.status!==200){
                //      return this.$message.error('更新用户信息失败！')
                //  }

                //关闭对话框
                this.editDialogVisible = false
                //刷新数据列表
                this.getProfessionList()
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
            this.getProfessionList()
        },



    },
    created() {
        this.getProfessionList()
    },
};
</script>

<style scoped>
.ProfessionManage {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>