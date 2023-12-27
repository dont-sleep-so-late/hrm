<template>
    <div class="PaySalary">
        <el-card>
            <!-- 表格 -->
            <el-table :data="salarylist" border>
                <el-table-column type="index" label="编号" width="100" show-overflow-tooltip />
                <el-table-column prop="o3Name" label="薪资标准" show-overflow-tooltip />
                <el-table-column prop="pname" label="职位名称" show-overflow-tooltip />
                <el-table-column prop="o1Name" label="所属一级机构" show-overflow-tooltip />
                <el-table-column prop="o2Name" label="所属二级机构" show-overflow-tooltip />
                <el-table-column prop="basic" label="基础薪资" show-overflow-tooltip />
                <el-table-column prop="total" label="薪酬总额" show-overflow-tooltip />
                <el-table-column prop="count" label="标准审批数量" show-overflow-tooltip />
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" @click="passSalary(scope.row)">通过</el-button>
                        <!-- <el-button type="danger" size="small" @click="deletecourse(scope.row.placeId)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChanged" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 50]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>


        </el-card>
    </div>
</template>

<script>
export default {
    name: "PaySalary",
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
                query: '',
                //当前的页数
                pagenum: 1,
                //当前每页显示多少条数据
                pagesize: 5
            },
            salarylist: [],
            total: 0,
            //控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            //控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            time1: '',
            //修改用户信息时查询到的用户信息对象
            editForm: {
                username: 100000000001,
                name: '小明',
                professionId: '',
                money: '',
                time: new Date().toLocaleDateString(),
                admin: window.sessionStorage.getItem("username")
            },
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
            this.queryInfo.pagenum = 0
            const { data: res } = await this.$http.post(`/Sal/showGiveSalInfo?pageNum=${this.queryInfo.pagenum}&pageSize=${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            this.salarylist = res.data
            this.total = 0
            this.salarylist.forEach(() => {
                this.total++
            });
            const { data: res1 } = await this.$http.post('/Sal/add/queryXinZiBiaoZhun')
            this.catelist = res1.data


        },
        async getUserListByName() {
            this.queryInfo.pagenum = this.queryInfo.pagenum - 1
            const { data: res } = await this.$http.post(`/Sys/user/queryUserByName/${this.queryInfo.query}/${this.queryInfo.pagenum}/${this.queryInfo.pagesize}`)
            //   if(res.meta.status!==200){
            //       return this.$message.error('获取用户列表失败！')
            //   }
            this.salarylist = res.data
            this.total = 0
            this.salarylist.forEach(() => {
                this.total++
            });

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

        //展示编辑用户的对话框
        async passSalary(data) {
            //   this.editDialogVisible=true
            // window.sessionStorage.setItem('id',id)
            // this.$router.push('/sal/giveList')
            console.log(data);
            const { data: res } = await this.$http.post('/Sal/give/updateSalGiveInfoByo3id/' + data.o3id + "/" + data.pid)

            this.$message.success('提交成功!')
            this.getSalaryList()

            // this.editForm.name=res.data[0].f_name
            // this.editForm.professionId=res.data[0].o3_id
            // this.editForm.admin=res.data[0].username
            // this.time1=res.data[0].basic
        },




    },
    created() {
        this.getSalaryList()
    },
};
</script>

<style scoped>
.PaySalary {
    height: 100%;
    margin: 20px 0px;
}

.el-table {
    margin: 20px 0px;
}
</style>