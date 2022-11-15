<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
                <router-link :to="{ name: 'SurveyCreate' }" class="
                    py-2 
                    px-3 
                    text-white 
                    bg-emerald-500 
                    rounded-md 
                    hover:bg-emerald-600
                    ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add new Survey
                </router-link>
            </div>
        </template>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div v-for="(survey, ind) in surveys.data" :key="ind" class="
                flex flex-col
                py-4
                px-6
                shadow-md
                bg-white
                hover:bg-gray-50
                h-[470px]">
                <img :src="survey.image_url" alt="" class="w-full h-48 object-cover">
                <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
                <div v-html="survey.description" class="overflow-hidden flex-1"></div>
                <div class="flex justify-between items-center mt-3">
                    <router-link :to="{ name: 'SurveyView', params: { id: survey.id } }"
                        class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>

                        Edit
                    </router-link>
                    <button v-if="survey.id" type="button" @click="deleteSurvey(survey)"
                        class="h-8 w-8 flex items-center justify-center rounded border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="w-5 h-5 inline-block -mt-1">
                            <path fill-rule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clip-rule="evenodd" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    </PageComponent>
</template>
  
<script setup>
import store from "../store";
import { computed } from "vue"
import PageComponent from '../components/PageComponent.vue';

const surveys = computed(() => store.state.surveys);
store.dispatch("getSurveys");

function deleteSurvey(survey) {
    if (confirm(`Are you sure you want to delete this survey? Operation can't be undone!!`)) {
        store.dispatch("deleteSurvey", survey.id).then(() => {
            store.dispatch("getSurveys");
        });
    }
}

</script>