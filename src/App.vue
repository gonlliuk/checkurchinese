<template>
    <el-container>
        <el-header height="120px">
            <div style="text-align: center">
                <h1 class="header">
                    {{ home ? home.title : 'Welcome'}}
                </h1>
            </div>
        </el-header>
        <el-container v-loading="loading">
            <el-aside >
                <el-menu :default-active="active">
                    <el-menu-item :index="`/`">
                        <router-link to="/" tag="div">Главная страница</router-link>
                    </el-menu-item>
                    <el-submenu v-for="page in pages"
                                :index="`/page/${page.id}`"
                                :key="page.id">
                        <template slot="title">
                            <span>{{ page.title }}</span>
                        </template>
                        <el-submenu v-for="block in page.blocks"
                                    :index="`/page/${page.id}/block/${block.id}`"
                                    :key="block.id">
                            <template slot="title">
                                <span>{{ block.title }}</span>
                            </template>
                            <el-menu-item v-for="task in block.tasks"
                                          :index="`/page/${page.id}/block/${block.id}/task/${task.id}`"
                                          @click="navigateTo(page.id, block.id, task.id)"
                                          :key="task.id">
                                {{ task.title }}
                            </el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            active: '',
            loading: true,
        };
    },
    computed: {
        ...mapState([
            'pages',
            'home',
        ]),
    },
    watch: {
        home(val) {
            if (val) {
                document.title = val.title;
            }
        },
    },
    methods: {
        ...mapActions([
            'getPages',
            'getHome',
        ]),
        navigateTo(pageId, blockId, taskId) {
            this.$router.push({
                path: `/page/${pageId}/block/${blockId}/task/${taskId}`,
            });
        },
    },
    created() {
        this.active = this.$route.path;
        Promise.all([this.getHome(), this.getPages()])
            .then(() => {
                this.loading = false;
            })
            .catch((e) => {
                this.loading = false;
                if (e && e.message && e.response) {
                    this.$notify({
                        title: 'Error',
                        type: 'error',
                        message: `${e.message}: ${e.response.data}. Please reload page for retry.`,
                        duration: 0,
                    });
                } else {
                    console.error(e);
                }
            });
    },
};
</script>
<style>
    @import "~normalize.css/normalize.css";

    body {
        padding: 0;
        margin: 0;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 16px;
    }
    pre {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 16px;
    }
    .el-container {
        height: 100vh;
    }
    .el-aside {
        height: 100%;
    }
    .el-menu {
        height: 100%;
    }
    .el-header {
        background-color: #2196f394;
        color: #3f51b5;
    }
    .el-main {
        padding-left: 60px;
    }
    .header {
        vertical-align: center;
        font-size: 2.8em;
    }
</style>
