<template>
    <div class="AddSalary">
        <el-card>
            <!-- 查询 -->
            <el-row type="flex" justify="space-between">
                <el-form size="small" class="demo-form-inline" inline>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="addDialogVisible = true">添加薪酬
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <!-- 表格 -->
            <el-table ref="table" :data="userlist" border>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="fname" label="制定人姓名" show-overflow-tooltip />
                <el-table-column prop="o3Name" label="薪资标准" show-overflow-tooltip />
                <el-table-column prop="pname" label="职位名称" show-overflow-tooltip />
                <el-table-column prop="allmoney" label="总薪资" show-overflow-tooltip />
                <el-table-column prop="username" label="受理人" show-overflow-tooltip />
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.s_id)"></el-button> -->
                        <!-- 删除按钮 -->
                        <el-button type="danger" content="删除" icon="el-icon-delete" size="mini"
                            @click="removeUserById(scope.row.sid)"></el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip effect="dark" content="查看详情" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"
                                @click="showEditDialog(scope.row.sid)"></el-button>
                        </el-tooltip>
                        <el-button type="primary" content="重新提交" icon="el-icon-refresh-left" size="mini"
                            @click="addSalaryAgain(scope.row.sid)"></el-button>

                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 50]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <!-- visible.sync为控制显示和隐藏 -->
        <el-dialog title="薪酬标准登记" :visible.sync="addDialogVisible" width="50%">
            <!-- 内容主体区域 -->
            <el-row :gutter="20">

                <!-- clearable添加了为可清空的文本框 -->
                <!-- <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.query" clearable @clear="getSalaryList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserListByName"></el-button>
                 </el-input> -->
                <el-col :span="8">

                </el-col>
                <el-form :model="editForm" label-width="100px">
                    <!-- prop是绑定验证规则的属性 -->

                    <el-form-item label="制定人">
                        <el-cascader v-model="editForm.fname" :options="flist" :props="flistProps">
                        </el-cascader>
                    </el-form-item>


                    <el-col :span="12">
                        <el-form-item label="薪酬标准名称">
                            <el-cascader v-model="editForm.o3Id" :options="salarylist" :props="salaryProps"
                                @change="serachUser()">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="薪酬标准编号">
                            <el-input v-model="editForm.o3Id" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="登记人">
                            <el-input v-model="editForm.uid" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位名称">
                            <el-cascader v-model="editForm.pid" :options="professionlist" :props="professionProps"
                                @change="serachUser()">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="薪酬总额">
                            <el-input v-model="money" disabled></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="登记时间">
                            <el-input v-model="editForm.time" disabled></el-input>
                        </el-form-item> -->
                        <el-form-item label="基本工资">
                            <el-input type="number" v-model="editForm.basic"></el-input>
                        </el-form-item>
                    </el-col>

                </el-form>

                <el-form>
                    <div style="width:60%;margin:0 auto;" v-for="element in data" :key="element.id">
                        <el-checkbox v-model="element.check" :label="element.name" border></el-checkbox>
                        <el-input style="width: 60%; float:right;" :disabled="!element.check"
                            v-model="element.customize"></el-input>
                    </div>
                </el-form>


            </el-row>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSalary">确 定</el-button>
            </span>
        </el-dialog>

        <!--修改用户的对话框  -->
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
                        <el-form-item label="薪酬标准">
                            <el-input v-model="detailForm.o3Name" disabled></el-input>
                        </el-form-item>

                        <el-form-item label="登记人编号">
                            <el-input v-model="detailForm.sid" disabled></el-input>
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


    </div>
</template>

<script>
export default {
    name: "AddSalary",
    data() {
        //eslint-disable-next-line no-unused-vars
        return {
            data: [],
            item: [
                {
                    id: '',
                    customize: '',
                    check: false
                }
            ],
            salarylist: [],
            //级联选择器的配置对象
            salaryProps: {
                value: 'o3_id',
                label: 'o3_name',
                children: 'children',
                expandTrigger: 'hover',
            },
            professionlist: [],
            //级联选择器的配置对象
            professionProps: {
                value: 'p_id',
                label: 'profession',
                children: 'children',
                expandTrigger: 'hover',
            },
            flist: [],
            //级联选择器的配置对象
            flistProps: {
                value: 'name',
                label: 'name',
                children: 'children',
                expandTrigger: 'hover',
            },
            //获取用户列表的参数对象
            queryInfo: {
                //搜索关键字
                query: '',
                //当前的页数
                pagenum: 1,
                //当前每页显示多少条数据
                pagesize: 5
            },
            editForm1: {
                time2: '',
                time3: '',
                time4: '',
                time5: '',
                time6: '',
                time7: '',
                time8: '',
            },
            userlist: [],
            total: 0,
            //控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            //添加用户的表单数据
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
            money: '',

            //修改用户信息时查询到的用户信息对象
            editForm: {
                basic: '',
                uid: window.sessionStorage.getItem("uid"),
                sid: '',
                fname: '',
                o3Id: '',
                pid: '',
                items: []
            },
            detailForm: [],
            //需要被分配角色的用户信息
            userInfo: {},
            //所有角色的数据列表
            rolesList: [],
            //已选中的角色Id值
            selectedRoleId: ''
        }
    },
    watch: {
        money(newVal, oldVal) {
            this.data.forEach(element => {
                this.data.basic += (element.formula * element.value)

            });
        }

    },
    methods: {
        async generateData() {
            const { data: res } = await this.$http.get("http://elms.free.idcfengye.com/salitem/list?pageNum=0&pageSize=1000")
            this.data = res.data

            // data.forEach(element => {
            //     this.data.push({
            //         key: element.id,
            //         label: element.name,
            //     });
            // });
        },
        //获取用户列表
        async getSalaryList() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/Sal/list?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            this.userlist = res.data
            this.total = 4
            const { data: res1 } = await this.$http.post('/Sal/add/queryXinZiBiaoZhun')
            this.salarylist = res1.data

            const { data: res2 } = await this.$http.post('/Sys/position/queryAllProfession/0/1000')
            this.professionlist = res2.data



        },
        async serachUser() {
            const { data: res } = await this.$http.post(`/Sal/getFile?organ3id=${this.editForm.o3Id}&pid=${this.editForm.pid}`)
            this.flist = res.data
            console.log(this.flist);
        },
        async getUserListByName() {
            this.queryInfo.pagenum = this.queryInfo.pagenum - 1
            const { data: res } = await this.$http.post(`/Sys/user/queryUserByName/${this.queryInfo.query}/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            this.userlist = res.data
            this.total = 4

        },
        //监听pagesize改变的事件
        handleSizeChanged(newSize) {

            this.queryInfo.pagesize = newSize
            this.getSalaryList()
        },
        //监听页码值改变的事件
        handleCurrentChange(newPage) {
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

        //点击按钮 添加新用户
        async addSalary() {
            this.data.forEach(element => {
                if (element.check) {
                    this.editForm.items.push({
                        id: element.id,
                        customize: element.customize,
                    })
                }
            });
            //可以发起添加用户的网络请求
            this.editForm.o3Id = this.editForm.o3Id[0]
            this.editForm.pid = this.editForm.pid[0]
            this.editForm.fname = this.editForm.fname[0]
            delete this.editForm.fid

            const { data: res } = await this.$http.post("/Sal/add", this.editForm)

            //  if(res.meta.status!==201){
            //      this.$message.error('添加用户失败！')
            //  }
            this.$message.success('添加薪酬成功!')
            //隐藏添加用户的对话框
            this.addDialogVisible = false
            //重新获取用户列表数据
            this.getSalaryList()
            this.editForm = []
            this.item = []
        },
        async addSalaryAgain(id) {
            const { data: res } = await this.$http.post('/Sal/secondCheck/' + id)
            this.$message.success('重新申请添加薪酬成功!')

        },
        //展示编辑用户的对话框
        async showEditDialog(id) {
            this.editDialogVisible = true

            const { data: res } = await this.$http.post('/Sal/showSalInfoBySid/' + id)
            this.detailForm = res.data
            // this.editForm.name = res.data[0].fname
            // this.editForm.professionId = res.data[0].o3id
            // this.editForm.admin = res.data[0].username
            // this.money = res.data[0].basic
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

            const { data: res } = await this.$http.post(`/Sal/add/deleteInfoBySid/${id}`)

            // if(res.meta.status!==200){
            //     return this.$message.error('删除用户失败！')
            // }
            this.$message.success('删除用户成功！')
            this.getSalaryList()
        },

    },
    created() {
        this.getSalaryList()
        this.generateData()
    },

};
</script>

<style scoped>
.AddSalary {
    height: 100%;
    margin: 20px 0px;
}

.el-transfer {
    margin-left: 20%;
}

.el-table {
    margin: 20px 0px;
}
</style>