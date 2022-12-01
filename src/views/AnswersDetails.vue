<template>
    <PageComponent title="All Answers">
        <div v-if="loading" class="flex justify-center">Loading...</div>
        <div v-else>
            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Question
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Answer
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(answer, index) in data.answerDetails" :key="index"
                            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ answer.question }}
                            </th>
                            <td class="py-4 px-6">
                                {{ answer.answer }}
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

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

const loading = computed(() => store.state.answersDetails.loading);
const data = computed(() => store.state.answersDetails.data);

store.dispatch("getAnswersDetails", {
    sid: route.params.sid,
    aid: route.params.aid
});

</script>

<style>

</style>