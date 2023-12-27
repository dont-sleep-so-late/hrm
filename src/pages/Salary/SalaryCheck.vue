<template>
    <div class="SalaryCheck">
        <el-card>
            <!-- 查询 -->
            <!-- <el-row type="flex" justify="space-between">
                <el-form ref="searchForm" :model="searchForm" size="small" class="demo-form-inline" inline>
                    <el-form-item label="编号:" prop="placeId">
                        <el-input v-model.trim="searchForm.placeId" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" icon="el-icon-search" @click="handleClear()">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-row> -->
            <!-- 表格 -->
            <el-table :data="detailForm" border stripe>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="fname" label="制定人姓名" show-overflow-tooltip />
                <el-table-column prop="o3Name" label="薪资标准" show-overflow-tooltip />
                <el-table-column prop="pname" label="职位名称" show-overflow-tooltip />
                <el-table-column prop="allmoney" label="总薪资" show-overflow-tooltip />
                <el-table-column prop="username" label="受理人" show-overflow-tooltip />
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="查看详情" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"
                                @click="showEditDialog(scope.row.sid)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 50]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>


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

            <span slot="footer" class="dialog-footer">
                <el-button @click="reject">驳 回</el-button>
                <el-button type="primary" @click="comfirm">通 过</el-button>
            </span>

        </el-dialog>

    </div>
</template>

<script>
export default {
    name: "SalaryCheck",
    data() {
        return {
            data: [],
            //获取用户列表的参数对象
            queryInfo: {
                //搜索关键字
                query: '',
                //当前的页数
                pagenum: 1,
                //当前每页显示多少条数据
                pagesize: 5
            },
            detailForm: [],
            total: 0,
            //控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            //控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            //控制分配角色对话框的显示与隐藏
            setRolesDialogVisible: false,
        }
    },
    methods: {
        async reject() {
            const { data: res } = await this.$http.post(`/Sal/check/updateCheckFalseInfoBySid/${window.sessionStorage.getItem('id')}`)

            this.editDialogVisible = false
            this.$message.success('已驳回！')

            this.getSalaryList()
        },
        async comfirm() {

            //发起修改用户信息的数据请求
            const { data: res } = await this.$http.post(`/Sal/check/updateCheckInfoBySid/${window.sessionStorage.getItem('id')}`)

            //  if(res.meta.status!==200){
            //      return this.$message.error('更新用户信息失败！')
            //  }

            //关闭对话框
            this.editDialogVisible = false
            //刷新数据列表
            this.getSalaryList()
            //提示用户
            this.$message.success('审核成功！')

        },
        //获取薪酬列表
        async getSalaryList() {
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/Sal/showRechecked?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            this.detailForm = res.data
            this.total = 0;
            res.data.forEach(() => {
                this.total++;
            });
            console.log(res.data[0]);

            const { data: res1 } = await this.$http.post('/Sal/add/queryXinZiBiaoZhun')
            this.catelist = res1.data

        },
        async getUserListByName() {
            this.queryInfo.pagenum = this.queryInfo.pagenum - 1
            const { data: res } = await this.$http.post(`/Sys/user/queryUserByName/${this.queryInfo.query}/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
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

        //监听添加用户对话框的关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        //展示编辑用户的对话框
        async showEditDialog(id) {
            this.editDialogVisible = true
            window.sessionStorage.setItem("id", id)
            const { data: res } = await this.$http.post('/Sal/showSalInfoBySid/' + id)
            this.detailForm = res.data
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
    },
};
</script>

<style scoped>
.SalaryCheck {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>