<template>
    <el-row type="flex" justify="center" align="center">
        <el-col>
            <div v-if="home">
                <h2>{{ home.welcome }}</h2>
                <div v-html="home.text"></div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState([
            'home',
        ]),
    },
};
</script>
