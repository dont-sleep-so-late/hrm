<template>
    <div class="RoleManage">
        <el-card>
            <!-- 查询 -->
            <el-row type="flex" justify="space-between">
                <el-form size="small" class="demo-form-inline" inline>
                    <el-form-item label="" prop="placeId">
                        <el-input v-model.trim="queryInfo.query" clearable placeholder="请输入" />
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" icon="el-icon-search" @click="getUserListByName()">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <!-- 表格 -->
            <el-table ref="table" :data="userlist" border stripe>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="username" label="账号" show-overflow-tooltip />
                <el-table-column prop="role_name" label="角色" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="showEditDialog(scope.row.u_id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeUserById(scope.row.u_id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 50]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <!--修改用户的对话框  -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form ref="editFormRef" :model="editForm" label-width="70px">
                <!-- prop是绑定验证规则的属性 -->
                <el-form-item label="身份">
                    <el-select v-model="selectedRoleId" placeholder="请选择">
                        <el-option v-for="item in userInfo1" :key="item.r_id" :label="item.role_name" :value="item.r_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item> -->
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
    name: "RoleManage",
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
            selectedRoleId1: '',
            //控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            //修改用户信息时查询到的用户信息对象
            editForm: {},
            //修改表单的验证规则对象
            //控制分配角色对话框的显示与隐藏
            setRolesDialogVisible: false,
            //需要被分配角色的用户信息
            userInfo: {},
            //所有角色的数据列表
            rolesList: [],
            //已选中的角色Id值
            selectedRoleId: '',
            userInfo1: []
        };
    },
    created() {
        this.getUserList()
    },
    methods: {
        //获取用户列表
        async getUserList() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/Sys/user/showAllUser/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            console.log(res.data);
            this.userlist = res.data
            this.total = 0;
            res.data.forEach(() => {
                this.total++;
            });
            const { data: res1 } = await this.$http.post("Sys/register/queryAllRole");
            console.log(res);
            this.userInfo1 = res1.data
        },
        async getUserInfo() {

            const { data: res } = await this.$http.post("Sys/register/queryAllRole");
            console.log(res);
            this.userInfo1 = res.data

            //1.将登陆成功之后的token，保存到客户端的sessionStorage中
            //1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
            //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
            //2.通过编程式导航跳转到后台主页，路由地址是 /home



        },
        async getUserListByName() {
            if (this.queryInfo.query != '') {
                this.queryInfo.pagenum = 0
                const { data: res } = await this.$http.post(`/Sys/user/queryUserByName/${this.queryInfo.query}/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
                //   if(res.meta.status!==200){
                //       return this.$message.error('获取用户列表失败！')
                //   }
                this.userlist = res.data
                this.total = 0;
                res.data.forEach(() => {
                    this.total++;
                });
            }
            else this.getUserList()


        },
        //监听pagesize改变的事件
        handleSizeChanged(newSize) {

            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage) {
            console.log(6);
            this.queryInfo.pagenum = newPage
            this.getUserList()
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
                this.getUserList()
            })
        },
        //展示编辑用户的对话框
        async showEditDialog(id) {
            window.sessionStorage.setItem('id', id)
            this.editDialogVisible = true
            // const {data:res}= await this.$http.get('users/'+id)

            // if(res.meta.status!==200){
            //     return this.$message.error('查询用户信息失败！')
            // }
            // this.editForm=res.data
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        //修改用户信息并提交
        async editUserInfo() {
            const id = window.sessionStorage.getItem('id')

            //  if(!valid) return
            //发起修改用户信息的数据请求
            const { data: res } = await this.$http.post(`/Sys/user/updateUserRoleByUid?uId=${id}&rId=${this.selectedRoleId}`)

            if (res.ok !== true) {
                return this.$message.error('更新用户信息失败！')
            }

            //关闭对话框
            this.editDialogVisible = false
            //刷新数据列表
            this.getUserList()
            //提示用户
            this.$message.success('更新用户信息成功！')

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

            const { data: res } = await this.$http.post(`/Sys/user/deleteUserByUid/${id}`)

            // if(res.meta.status!==200){
            //     return this.$message.error('删除用户失败！')
            // }
            this.$message.success('删除用户成功！')
            this.getUserList()
        },


    },
};
</script>

<style scoped>
.RoleManage {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>