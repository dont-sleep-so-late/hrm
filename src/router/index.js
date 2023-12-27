//引入VueRouter
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//创建并暴露一个 Router
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: 'Banner',
        },
        {
            path: '/Login',
            name: 'Login',
            component: () => import('@/pages/Login.vue')
        },
        {
            path: '/Banner',
            component: () => import('@/components/Banner.vue'),
            redirect: 'Banner/Home',
            meta: {
                title: '首页',
            },
            children: [
                {
                    path: 'Home',
                    component: () => import('@/pages/Home.vue'),

                },
            ]
        },
        {
            path: '/Banner',
            component: () => import('@/components/Banner.vue'),
            meta: {
                title: '系统管理',
            },
            children: [
                {
                    path: 'RoleManage',
                    component: () => import('@/pages/System/RoleManage.vue'),
                    meta: {
                        title: '账号管理',
                    },
                },
                {
                    path: 'OrganManage',
                    component: () => import('@/pages/System/OrganManage.vue'),
                    meta: {
                        title: '机构管理',
                    },
                },
                {
                    path: 'ProfessionManage',
                    component: () => import('@/pages/System/ProfessionManage.vue'),
                    meta: {
                        title: '职位管理',
                    },
                },
            ]
        },
        {
            path: '/Banner',
            component: () => import('@/components/Banner.vue'),
            meta: {
                title: '档案管理',
            },
            children: [
                {
                    path: 'AddDocument',
                    component: () => import('@/pages/Document/AddDocument.vue'),
                    meta: {
                        title: '档案登记',
                    },
                },
                {
                    path: 'Add',
                    component: () => import('@/pages/Document/Add.vue'),
                    meta: {
                        title: '添加档案',
                    },
                },
                {
                    path: 'DocumentCheck',
                    component: () => import('@/pages/Document/DocumentCheck.vue'),
                    meta: {
                        title: '档案复核',
                    },
                },
                {
                    path: 'DocumentQuery',
                    component: () => import('@/pages/Document/DocumentQuery.vue'),
                    meta: {
                        title: '档案查询',
                    },
                },
            ]
        },
        {
            path: '/Banner',
            component: () => import('@/components/Banner.vue'),
            meta: {
                title: '薪酬管理',
            },
            children: [
                {
                    path: 'SalaryItem',
                    component: () => import('@/pages/Salary/SalaryItem.vue'),
                    meta: {
                        title: '薪酬标准项目',
                    },
                },
                {
                    path: 'AddSalary',
                    component: () => import('@/pages/Salary/AddSalary.vue'),
                    meta: {
                        title: '薪酬标准登记',
                    },

                },
                {
                    path: 'SalaryCheck',
                    component: () => import('@/pages/Salary/SalaryCheck.vue'),
                    meta: {
                        title: '薪酬标准复核',
                    },
                },
                {
                    path: 'SalaryQuery',
                    component: () => import('@/pages/Salary/SalaryQuery.vue'),
                    meta: {
                        title: '薪酬查询',
                    },
                },
                {
                    path: 'PaySalary',
                    component: () => import('@/pages/Salary/PaySalary.vue'),
                    meta: {
                        title: '薪酬发放',
                    },
                },
                {
                    path: 'PaySalaryDetail',
                    component: () => import('@/pages/Salary/PaySalaryDetail.vue'),
                    meta: {
                        title: '薪酬发放明细',
                    },
                },
            ]
        }
    ]
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/Login') return next()
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (tokenStr === null || tokenStr === "") return next('/Login')
    next()
})

export default router

