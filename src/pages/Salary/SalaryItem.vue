<template>
    <div class="SalaryItem">
        <el-card>
            <!-- 查询 -->
            <el-row type="flex" justify="space-between">
                <el-form class="demo-form-inline" inline>
                    <el-form-item>
                        <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <!-- 表格 -->
            <el-table ref="table" :data="tableData" border>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="name" label="薪酬" show-overflow-tooltip />
                <el-table-column prop="createdTime" label="创建时间" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" @click="showUpdateDialog({ data: scope.row })">编辑</el-button>
                        <el-button type="danger" size="small" @click="deletecourse(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 50]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

            <!-- 添加用户的对话框 -->
            <!-- visible.sync为控制显示和隐藏 -->
            <el-dialog title="添加薪酬标准" :visible.sync="addDialogVisible" width="50%">
                <!-- 内容主体区域 -->
                <el-row :gutter="20">
                    <el-form ref="editFormRef" label-width="110px">
                        <el-form-item label="薪酬项目">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="公式">
                            <el-input v-model="addForm.formula"></el-input>
                        </el-form-item><el-form-item label="追加">
                            <el-input v-model="addForm.supplement"></el-input>
                        </el-form-item><el-form-item label="制定人">
                            <el-input v-model="addForm.createdBy" disabled></el-input>
                        </el-form-item><el-form-item label="创造时间">
                            <el-input v-model="addForm.createdTime" disabled></el-input>
                        </el-form-item>
                    </el-form>

                </el-row>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSalary">确 定</el-button>
                </span>
            </el-dialog>


            <!-- 修改薪酬标准的对话框 -->
            <!-- visible.sync为控制显示和隐藏 -->
            <el-dialog title="修改薪酬标准" :visible.sync="updateDialogVisible" width="50%">
                <!-- 内容主体区域 -->
                <el-row :gutter="20">
                    <el-form ref="editFormRef" label-width="110px">
                        <el-form-item label="薪酬项目">
                            <el-input v-model="editForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="公式">
                            <el-input v-model="editForm.formula"></el-input>
                        </el-form-item><el-form-item label="追加">
                            <el-input v-model="editForm.supplement"></el-input>
                        </el-form-item><el-form-item label="制定人">
                            <el-input v-model="editForm.createdBy" disabled></el-input>
                        </el-form-item><el-form-item label="创造时间">
                            <el-input v-model="editForm.createdTime" disabled></el-input>
                        </el-form-item>
                    </el-form>

                </el-row>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="updateDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateSalary">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "SalaryItem",
    data() {
        return {
            tableData: [],
            //获取用户列表的参数对象
            queryInfo: {
                //搜索关键字
                query: '',
                //当前的页数
                pagenum: 0,
                //当前每页显示多少条数据
                pagesize: 5
            },
            //控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            updateDialogVisible: false,
            userlist: [],
            //修改用户信息时查询到的用户信息对象
            addForm: {
                id: '',
                name: '',
                formula: '',
                supplement: '',
                createdBy: window.localStorage.getItem("username"),
                createdTime: new Date().toLocaleDateString(),
                updateBy: '',
                deleteFlag: '',
                updateTime: '',
            },
            editForm: {
                id: '',
                name: '',
                formula: '',
                supplement: '',
                createdBy: '',
                createdTime: '',
                updateBy: window.localStorage.getItem("username"),
                deleteFlag: '',
                updateTime: '',
            },
            total: 0, // 初始化应为 0，这里只做演示效果使用
        };
    },
    created() {
        // 初始化表格数据
        this.getPageList();
    },
    methods: {
        async getPageList() {
            var that = this;
            await this.$http.get(`salitem/list?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`).then(function (res) {
                that.tableData = res.data.data;
            });
            this.total = 0
            that.tableData.forEach(() => {
                this.total++;
            });
        },

        async addSalary() {
            //点击按钮 添加新用户
            this.addForm.createdTime = ''
            //可以发起添加用户的网络请求
            const { data: res } = await this.$http.post("/salitem/add", this.addForm)
            if (res.mess == "false") {
                this.$message.error('添加薪酬标准失败！')
            }
            else {
                this.$message.success('添加薪酬标准成功!')

                //重新获取用户列表数据
                this.getPageList()
            }
            //隐藏添加用户的对话框
            this.addDialogVisible = false

        },
        // 删除
        deletecourse(id) {
            this.$confirm("确认要删除该薪酬标准吗, 是否继续?", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: "warning",
            })
                .then(() => {
                    this.deleteSalary(id);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        async deleteSalary(id) {
            // 删除逻辑
            await this.$http
                .post(`/salitem/delete?id=${id}`)
                .then((res) => {
                    if (res.data.mess == "false") {
                        this.$message.error(res.data.mess);

                    } else {
                        this.$message.success("删除成功！");
                    }
                });
            this.getPageList()
        },
        showUpdateDialog(data) {
            this.editForm = data.data
            this.updateDialogVisible = true;
        },

        async updateSalary() {
            //点击按钮 添加新用户
            delete this.editForm.customize

            //可以发起添加用户的网络请求
            const { data: res } = await this.$http.post("/salitem/update", this.editForm)
            if (res.mess == "false") {
                this.$message.error('修改失败！')
            }
            else {
                this.$message.success('修改薪酬成功!')
                //重新获取用户列表数据
                this.getPageList()
            }
            //隐藏添加用户的对话框
            this.updateDialogVisible = false
        },

    },
};
</script>

<style scoped>
.SalaryItem {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>