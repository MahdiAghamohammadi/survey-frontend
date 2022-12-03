<template>
    <div class="py-5 px-8">
        <div v-if="loading" class="flex justify-center">Loading...</div>
        <form @submit.prevent="submitSurvey" v-else class="container mx-auto">
            <div class="grid grid-cols-6 items-center">
                <div class="mr-4">
                    <img :src="survey.image_url" alt="" />
                </div>
                <div class="col-span-5">
                    <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
                    <p class="text-gray-500 text-sm" v-html="survey.description"></p>
                </div>
            </div>

            <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm mt-2">
                <span @click="errors = ''"
                    class="w-6 h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
                <div v-for="(field, i) of Object.keys(errors)" :key="i">
                    <div v-for="(error, ind) of errors[field] || []" :key="ind">
                        * {{ error }}
                    </div>
                </div>
            </Alert>

            <div v-if="surveyFinished" class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto">
                <div class="text-xl mb-3 font-semibold ">Thank you for participating in this survey.</div>
                <button @click="submitAnotherResponse" type="button"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit another response
                </button>
            </div>
            <div v-else>
                <hr class="my-3">
                <div>
                    <label for="author">Author</label>
                    <input type="text" v-model="author" id="author"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                </div>
                <hr class="my-3">
                <div v-for="(question, ind) of survey.questions" :key="question.id">
                    <QuestionViewer v-model="answers[question.id]" :question="question" :index="ind" />
                </div>

                <button type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>
  
<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import QuestionViewer from "../components/viewer/QuestionViewer.vue";
import Alert from "../components/Alert.vue";

const route = useRoute();
const store = useStore();

const loading = computed(() => store.state.currentSurvey.loading);
const survey = computed(() => store.state.currentSurvey.data);

const surveyFinished = ref(false);

const answers = ref({});

const author = ref('');

let errors = ref({});

store.dispatch("getSurveyBySlug", route.params.slug);

function submitSurvey() {
    console.log(JSON.stringify(answers.value, undefined, 2));
    store
        .dispatch("saveSurveyAnswer", {
            surveyId: survey.value.id,
            answers: answers.value,
            author: author.value
        })
        .then((response) => {
            if (response.status === 201) {
                surveyFinished.value = true;
            }
        }).catch(err => {
            if (err.response.status === 422) {
                errors.value = err.response.data.errors;
            }
        })
}

function submitAnotherResponse() {
    answers.value = {};
    surveyFinished.value = false;
}
</script>
  
<style>

</style>