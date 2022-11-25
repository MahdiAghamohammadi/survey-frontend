<template>
    <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register for free
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            Or
            {{ ' ' }}
            <router-link :to="{ name: 'Login' }" class="font-medium text-indigo-600 hover:text-indigo-500">
                login to your account
            </router-link>
        </p>
    </div>
    <form class="mt-8 space-y-6" @submit="register">
        <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
            <div v-for="(field, i) of Object.keys(errors)" :key="i">
                <div v-for="(error, ind) of errors[field] || []" :key="ind">
                    * {{ error }}
                </div>
            </div>
        </Alert>
        <div class="-space-y-px rounded-md shadow-sm">
            <div>
                <label for="full-name" class="sr-only">Full Name</label>
                <input id="full-name" name="name" type="text" autocomplete="name" required="" v-model="user.name"
                    class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Full Name" />
            </div>
            <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email" required=""
                    v-model="user.email"
                    class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address" />
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required=""
                    v-model="user.password"
                    class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password" />
            </div>
            <div>
                <label for="password_confirmation" class="sr-only">Password Confirmation</label>
                <input id="password_confirmation" name="password_confirmation" type="password"
                    autocomplete="current-password_confirmation" required="" v-model="user.password_confirmation"
                    class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password" />
            </div>
        </div>

        <div>
            <TButtonLoading :loading="loading" class="w-full relative justify-center">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign up
            </TButtonLoading>
        </div>
    </form>
</template>
  
<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router';
import store from '../store';
import { ref } from 'vue';
import TButtonLoading from "../components/core/TButtonLoading.vue";
import Alert from "../components/Alert.vue";

const router = useRouter();
const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
}
const loading = ref(false);
let errors = ref({});

function register(ev) {
    ev.preventDefault();

    loading.value = true;
    store.dispatch('register', user)
        .then((res) => {
            loading.value = false;
            router.push({
                name: 'Dashboard'
            })
        })
        .catch(err => {
            loading.value = false;
            if (err.response.status === 422) {
                errors.value = err.response.data.errors;
            }
        })
}
</script>