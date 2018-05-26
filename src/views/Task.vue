<template>
    <div>
        <el-row
                v-show="pages.length && !task"
                type="flex"
                justify="center"
                align="center">
            <el-col>
                <h2>К сожалению, задание не найдено.</h2>
                <p>Для выбора задания воспользуйтесь боковым навигационым меню</p>
            </el-col>
        </el-row>
        <div v-if="task">
            <h1>{{ page.title }}</h1>
            <h2>{{ block.title }}</h2>
            <h3>{{ task.title }}</h3>

            <pre>{{ task.text }}</pre>

            <div v-if="task.questions.length"
                 v-for="question in task.questions"
                 :key="question.id">
                <pre>{{ question.description }}</pre>

                <div style="margin-bottom: 20px">
                    <div v-if="question.images.length"
                         v-for="image in question.images"
                         :key="image.uid">
                        <el-row type="flex">
                            <img :src="image.data" style="max-width: 100%; max-height: 300px"/>
                        </el-row>
                    </div>
                </div>

                <div style="margin-bottom: 20px">
                    <div v-if="question.videos.length"
                         v-for="(video, index) in question.videos"
                         :key="index + video.url">
                        <div v-player="{ url: video.url }" style="margin-bottom: 40px; margin-top: 40px"></div>
                    </div>
                </div>

                <div v-if="question.test && question.test.length">
                    <h4 v-show="question.test.length > 1">Тест</h4>
                    <ol>
                       <li v-for="testItem in question.test"
                           :key="testItem.id">
                           <div style="margin-bottom: 10px">{{ testItem.question }}</div>
                           <div v-for="answer in testItem.answers"
                                     :key="answer.id">
                               <el-radio v-model="testItem.checked"
                                         :class="{
                                            'answer-right': testItem.checked && answer.isCorrect && (!question.checkTestByBtn || isTestChecked),
                                            'answer-wrong': testItem.checked && !answer.isCorrect && (!question.checkTestByBtn || isTestChecked),
                                         }"
                                         :label="answer.id">
                                   {{ answer.answer }}
                               </el-radio>
                           </div>
                       </li>
                    </ol>
                    <el-row type="flex" justify="center">
                        <p v-show="question.checkTestByBtn && isTestChecked">
                            Дано {{ countRightCheckedAnswers(question.test) }} правильных ответов из {{ question.test.length }}.
                        </p>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-button v-show="question.checkTestByBtn && !isTestChecked"
                                   type="success"
                                   @click="checkTest()">
                            Проверить тест
                        </el-button>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-button v-show="question.checkTestByBtn && isTestChecked"
                                   type="info"
                                   plain
                                   @click="resetTestCheck(question)">
                            Начать заного
                        </el-button>
                    </el-row>
                </div>
            </div>

            <el-row>
                <pre v-show="task.additionalQuestion">
                    <span class="text-bold">Дополнительные вопросы:</span>
                    {{ task.additionalQuestion }}
                </pre>
            </el-row>
            <el-row>
                <pre v-show="task.comment">
                    <span class="text-bold">Комментарии:</span>
                    {{ task.comment }}
                </pre>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import player from '../directives/player';

export default {
    directives: {
        player,
    },
    data() {
        return {
            main: null,
            isTestChecked: false,
            loaded: false,
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
            if (!this.loaded && val && val.length) this.getInfoFromStore();
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
        checkTest() {
            this.isTestChecked = true;
        },
        resetTestCheck(question) {
            question.test.forEach((item) => {
                item.checked = null;
            });
            this.isTestChecked = false;
        },
        countRightCheckedAnswers(test) {
            return test.reduce((total, question) => {
                const answer = question.answers.find(item => item.id === question.checked);
                return answer && answer.isCorrect ? total + 1 : total;
            }, 0);
        },
    },
    beforeRouteUpdate(to, from, next) {
        next();

        this.main.scrollTo(0, 0);
        if (to.name === 'task') {
            this.getInfoFromStore();
        }
    },
    mounted() {
        this.main = document.querySelector('.el-main');
    },
    created() {
        this.getInfoFromStore();
    },
};
</script>
<style lang="scss">
.el-row {
    margin: 25px 0;
}
.text-bold {
    font-weight: bold;
}
.answer {
    &-right .el-radio__input.is-checked+.el-radio__label{
        color: #23cd23;
    }

    &-wrong .el-radio__input.is-checked+.el-radio__label{
        color: red;
    }
}
pre {
    white-space: pre-line;
}
</style>
