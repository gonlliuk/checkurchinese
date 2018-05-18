<template>
    <div>
        <el-row
                v-show="!task"
                type="flex"
                justify="center"
                align="center">
            <el-col>
                <h2>К сожалению, задание не найдено.</h2>
                <p>Для выбора задания воспользуйтесь боковым навигационым меню</p>
            </el-col>
        </el-row>
        <el-row
                v-if="task">
            <el-col>
                <h2>{{ page.title }}</h2>
                <h3>{{ block.title }}</h3>
                <h4>{{ task.title }}</h4>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            task: null,
            page: null,
            block: null,
        };
    },
    computed: {
        ...mapState([
            'pages',
        ]),
    },
    watch: {
        pages(val) {
            if (val && val.length) this.getInfoFromStore();
        },
    },
    methods: {
        ...mapActions([
            'getInfo',
        ]),
        async getInfoFromStore() {
            const { pageId, blockId, taskId } = this.$route.params;
            const { task, page, block } = await this.getInfo({ pageId, blockId, taskId });
            if (!task) return;

            this.page = page;
            this.block = block;
            this.task = task;
        },
    },
};
</script>
