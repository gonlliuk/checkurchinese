<template>
    <el-container>
        <el-header height="120px">
            <el-row type="flex"
                    justify="center"
                    align="center">
                   <h1>Проверь свой китайский</h1>
            </el-row>
        </el-header>
        <el-container v-loading="loading"
                      style="max-width: 1024px; min-width: 640px; margin: auto">
            <el-aside >
                <el-menu>
                    <el-submenu v-for="(page, pindex) in pages"
                                :index="`${pindex}`"
                                :key="page.id">
                        <template slot="title">
                            <span>{{ page.title }}</span>
                        </template>
                        <el-submenu v-for="(block, bindex) in page.blocks"
                                    :index="`${pindex}-${bindex}`"
                                    :key="block.id">
                            <template slot="title">
                                <span>{{ block.title }}</span>
                            </template>
                            <el-menu-item v-for="(task, tindex) in block.tasks"
                                          :index="`${pindex}-${bindex}-${tindex}`"
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
            loading: true,
        };
    },
    computed: {
        ...mapState([
            'pages',
        ]),
    },
    methods: {
        ...mapActions([
            'getPages',
        ]),
        navigateTo(pageId, blockId, taskId) {
            this.$router.push({
                path: `/page/${pageId}/block/${blockId}/task/${taskId}`,
            });
        },
    },
    created() {
        this.getPages()
            .then(() => {
                this.loading = false;
            })
            .catch((e) => {
                this.loading = false;
                this.$notify({
                    title: 'Error',
                    type: 'error',
                    message: `${e.message}: ${e.response.data}. Please reload page for retry.`,
                    duration: 0,
                });
            });
    },
};
</script>
<style>
body {
    padding: 0;
    margin: 0;
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
    background-color: #545c64;
    color: #ffd04b;
}
.el-main {
    padding-left: 60px;
}
</style>
