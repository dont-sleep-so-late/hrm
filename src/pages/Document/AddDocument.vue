<template>
    <div class="AddDocument">
        <el-card>
            <!-- 查询 -->
            <el-row type="flex" justify="space-between">
                <el-form size="small" class="demo-form-inline" inline>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="goAddpage()">添加档案
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <!-- 表格 -->
            <el-table ref="table" :data="userlist" border>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="name" label="姓名" show-overflow-tooltip />
                <el-table-column prop="o1Name" label="一级机构" show-overflow-tooltip />
                <el-table-column prop="o2Name" label="二级机构" show-overflow-tooltip />
                <el-table-column prop="o3Name" label="三级机构" show-overflow-tooltip />
                <el-table-column prop="profession" label="职位" show-overflow-tooltip />
                <el-table-column prop="sex" label="性别" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <!-- <el-button type="success" size="small"
                            @click="changeView('AddField', { id: scope.row.placeId })">编辑</el-button> -->
                        <el-button type="success" size="mini" @click="updateDocument(scope.row.fid)">编辑</el-button>

                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.fid
                        )"></el-button>

                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <!-- visible.sync为控制显示和隐藏 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
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
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 分配角色的对话框 -->
        <el-dialog title="分配角色" :visible.sync="setRolesDialogVisible" width="50%" @close="setRoleDialogClosed">
            <div>
                <p>当前的用户：{{ userInfo.username }}</p>
                <p>当前的角色：{{ userInfo.role_name }}</p>
                <p>分配新角色：
                    <!-- select中v-model的值是选择到的值，里面的label是要显示的值，value是实际选择的值 -->
                    <el-select v-model="selectedRoleId" placeholder="请选择">
                        <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
                        </el-option>
                    </el-select>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRolesDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: "AddDocument",
    data() {
        return {
            //获取用户列表的参数对象
            queryInfo: {
                //搜索关键字
                query: '',
                //当前的页数
                pagenum: 1,
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
                    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
                    { min: 3, max: 10, message: '用户名的长度在3~10个字符之间', trigger: 'blur' }
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
        goAddpage() {
            this.$router.push('Add')
        },
        //获取档案列表
        async getDocumentList() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/File/listFileApplication?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            console.log(res.data);
            this.userlist = res.data
            this.total = 4

        },
        async getUserListByName() {
            this.queryInfo.pagenum = this.queryInfo.pagenum - 1
            const { data: res } = await this.$http.post(`/Sys/user/queryUserByName/${this.queryInfo.query}/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            console.log(res.data);
            this.userlist = res.data
            this.total = 4

        },
        //监听pagesize改变的事件
        handleSizeChanged(newSize) {

            this.queryInfo.pagesize = newSize
            this.getDocumentList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage) {
            console.log(6);
            this.queryInfo.pagenum = newPage
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
                const { data: res } = await this.$http.post('users', this.addForm)

                if (res.meta.status !== 201) {
                    this.$message.error('添加用户失败！')
                }
                this.$message.success('添加用户成功!')
                //隐藏添加用户的对话框
                this.addDialogVisible = false
                //重新获取用户列表数据
                this.getDocumentList()
            })
        },
        updateDocument(id) {
            this.$router.push({
                path: '/Banner/Add',
                query: {
                    fid: id,
                }

            })
        },
        //展示编辑用户的对话框
        async showEditDialog(id) {
            this.editDialogVisible = true

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
                this.getDocumentList()
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
.AddDocument {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>