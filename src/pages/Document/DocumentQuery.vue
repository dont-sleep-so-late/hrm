<template>
    <div class="DocumentQuery">
        <el-card>
            <!-- 查询 -->
            <el-row type="flex" justify="space-between">
                <el-col :span="5">
                    <!-- clearable添加了为可清空的文本框 -->
                    <el-cascader placeholder="搜索一级机构" v-model="selectedKeys" :options="parentCateList"
                        :props="cascaderProps" @change="parentCateChangedtwo" clearable change-on-select>
                    </el-cascader>
                </el-col>

                <el-col :span="5">
                    <el-cascader placeholder="搜索二级机构" v-model="selectedKeysthree" :options="parentCateListthree"
                        :props="cascaderPropsthree" @change="parentCateChangedthree" clearable change-on-select>
                    </el-cascader>
                </el-col>

                <el-col :span="4">
                    <el-cascader placeholder="搜索三级机构" v-model="documentList.organizionId" :options="parentCateListfour"
                        :props="parentCatePropsfour">
                    </el-cascader>
                </el-col>
                <el-col :span="5">
                    <el-button icon="el-icon-search" @click="getUserListByOrgan">搜索</el-button>
                </el-col>
                <el-col :span="3">
                    <el-cascader placeholder="职位名称" v-model="queryInfo.query4" :options="catelist" :props="cateProps">
                    </el-cascader>
                </el-col>
                <el-col :span="3">
                    <el-button icon="el-icon-search" @click="getUserListByName4">搜索</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button icon="el-icon-refresh-right" @click="resetList">重置</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table :data="documentList" border>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="profession" label="职位"></el-table-column>
                <el-table-column prop="name" label="姓名" show-overflow-tooltip />
                <el-table-column prop="o1Name" label="一级机构" show-overflow-tooltip />
                <el-table-column prop="o2Name" label="二级机构" show-overflow-tooltip />
                <el-table-column prop="o3Name" label="三级机构" show-overflow-tooltip />
                <el-table-column prop="sex" label="性别" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-zoom-in" size="mini"
                            @click="showEditDialog(scope.row)"></el-button>
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
            <el-dialog title="添加一级机构" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="110px">
                    <el-form-item label="一级机构名称" prop="username">
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

                <el-form ref="editFormRef" :model="editForm" label-width="100px">
                    <!-- prop是绑定验证规则的属性 -->

                    <el-image style="width: 140px; height: 180px; transform:translateX(200%)"
                        :src="editForm.image">
                    </el-image>

                    <el-form-item label="职位名称">
                        <el-input v-model="editForm.profession" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="editForm.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="editForm.phone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="editForm.email" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="地址 ">
                        <el-input v-model="editForm.address" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="学历 ">
                        <el-input v-model="editForm.academic" disabled></el-input>
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
                    <el-form-item label="创建时间">
                        <el-input v-model="editForm.createTime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="民族">
                        <el-input v-model="editForm.nation" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="信仰宗教">
                        <el-input v-model="editForm.religion" disabled></el-input>
                    </el-form-item>


                </el-form>

            </el-dialog>


        </el-card>
    </div>
</template>

<script>
export default {
    name: "AddDocument",
    data() {
        return {
            addCateForm: {
                //将要添加的分类的名称
                cat_name: '',
                //父级分类的id
                cat_pid: 0,
                //分类的等级，默认要添加的是1级分类(0为1级分类，1为2级分类，2为3级分类)
                cat_level: 0
            },
            addCateFormthree: {
                //将要添加的分类的名称
                cat_name: '',
                //父级分类的id
                cat_pid: 0,
                //分类的等级，默认要添加的是1级分类(0为1级分类，1为2级分类，2为3级分类)
                cat_level: 0
            },
            //添加分类表单的验证规则对象
            addCateFormRules: {
                cat_name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
                ]
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
            documentList: [],
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
            catelist: [],
            //级联选择器的配置对象
            cateProps: {
                value: 'p_id',
                label: 'profession',
                children: 'children',
                expandTrigger: 'hover',
            },
            //添加表单的验证规则对象
            addFormRules: {
                username: [
                    { required: true, message: '请输入一级机构名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '用户名的长度在3~10个字符之间', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '用户名的长度在6~15个字符之间', trigger: 'blur' }
                ],
            },
            //控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            addCateDialogVisiblethree: false,
            addCateDialogVisibletwo: false,
            //修改用户信息时查询到的用户信息对象
            editForm: {},

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
            parentCateListfour: [],
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
            parentCatePropsfour: {
                value: 'o3_id',
                label: 'o3_name',
                children: 'children',
                expandTrigger: 'hover'
            },
            //选中的父级分类的id数组
            selectedKeysthree: ''
        }
    },
    methods: {
        //获取用户列表
        async getDocumentList() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/File/listFileSelect?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }


            this.documentList = res.data
            this.total = 0;
            res.data.forEach(() => {
                this.total++;
            });
            const { data: res1 } = await this.$http.post('/Sys/organ/queryOrgan1')
            //  const {data:res2}=await this.$http.post('/Sys/organ/queryOrgan2')
            const { data: res2 } = await this.$http.post('/File/add/queryProfession')
            this.catelist = res2.data

            //  if(res.meta.status!==200){
            //     return this.$message.error('获取父级分类数据失败!')
            //  }

            this.parentCateList = res1.data



        },
        //获取一级权限分类列表
        async getParentCateList() {
            const { data: res1 } = await this.$http.post('/Sys/organ/queryOrgan1')
            //  const {data:res2}=await this.$http.post('/Sys/organ/queryOrgan2')

            //  if(res.meta.status!==200){
            //     return this.$message.error('获取父级分类数据失败!')
            //  }

            this.parentCateList = res1.data
        },
        async parentCateChangedtwo() {
            const { data: res2 } = await this.$http.post(`/Sys/organ/queryOrgan2/${this.selectedKeys}`)
            this.parentCateListthree = res2.data
        },
        async parentCateChangedthree() {
            const { data: res2 } = await this.$http.post(`/Sys/organ/queryOrgan3/${this.selectedKeysthree}`)
            this.parentCateListfour = res2.data
        },
        async getUserListByOrgan() {
            if (this.documentList[0] == []) {
                this.getDocumentList()
            } else {
                this.queryInfo.pagenum = 0
                const { data: res } = await this.$http.post(`/File/listFileSelectByOrgan?pageSize=${this.queryInfo.pagesize}&pageNum=${this.queryInfo.pagenum}&organ1Name=${this.selectedKeys[0]}&organ2Name=${this.selectedKeysthree[0]}&organ3Name=${this.documentList.organizionId[0]}`)
                this.documentList = res.data
                this.total = 0;
                res.data.forEach(() => {
                    this.total++;
                });
            }


        },
        async getUserListByName4() {
            if (this.queryInfo.query4 == '') {
                this.getDocumentList()
            }
            else {
                this.queryInfo.pagenum = 0
                const { data: res } = await this.$http.post(`/File/listFileSelectByProfession?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}&Profession=${this.queryInfo.query4}`)
                //   if(res.meta.status!==200){
                //       return this.$message.error('获取用户列表失败！')
                //   }
                console.log(res.data);
                this.documentList = res.data
                this.total = 0;
                res.data.forEach(() => {
                    this.total++;
                });
            }

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
                const { data: res } = await this.$http.post(`/Sys/organ/insertOrgan1?o1Name=${this.addForm.username}`)

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

            this.editForm = data

            this.editDialogVisible = true
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        resetList() {
            this.queryInfo.query1 = ''


            this.queryInfo.query4 = ''
        }

    },
    created() {
    },
    mounted() {
        this.getDocumentList()

    }
};
</script>

<style scoped>
.DocumentQuery {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}

.el-form-item {
    margin-right: 50px;
}
</style>