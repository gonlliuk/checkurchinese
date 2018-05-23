<template>
    <el-container>
        <el-header>
            <el-row
                    type="flex"
                    justify="center">
                <h1>CheckUrChinese</h1>
            </el-row>
        </el-header>
        <el-container v-loading="loading">
            <el-aside>
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
            <el-main style="max-width: 960px; min-width: 640px; padding: 20px 40px">
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
