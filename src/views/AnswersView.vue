<template>
    <PageComponent title="All Answers">
        <div v-if="loading" class="flex justify-center">Loading...</div>
        <div v-else>
            <DashboardCard style="animation-delay: 0.3s">
                <template v-slot:title>
                    <div class="flex justify-between items-center mb-3 px-2">
                        <h3 class="text-2xl font-semibold">
                            {{ route.params.id ? 'All Answer By Survey' : 'All Answers' }}
                        </h3>
                    </div>
                </template>

                <div v-if="data.allAnswers.length" class="text-left">
                    <a href="#" v-for="answer of data.allAnswers" :key="answer.id"
                        class="block p-2 hover:bg-gray-100/90">
                        <div class="font-semibold">{{ answer.survey.title }}</div>
                        <small>
                            Answer Made at:
                            <i class="font-semibold">{{ answer.end_date }}</i>
                        </small>
                    </a>
                </div>
                <div v-else class="text-gray-600 text-center py-16">
                    Your don't have answers yet
                </div>
            </DashboardCard>
        </div>
    </PageComponent>
</template>

<script setup>
import DashboardCard from "../components/core/DashboardCard.vue";
import PageComponent from "../components/PageComponent.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const loading = computed(() => store.state.answers.loading);
const data = computed(() => store.state.answers.data);

if (route.params.id) {
    store.dispatch("getAllAnswersById", route.params.id);
} else {
    store.dispatch("getAllAnswers");
}
</script>

<style>

</style>