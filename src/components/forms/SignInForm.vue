<template>
  <form @submit.prevent="handleSubmit">
    <label for="email">Email</label>
    <input type="email" placeholder="Your email" v-model.trim="email" required />

    <label for="password">Password</label>
    <input type="password" placeholder="********" v-model.trim="password" required />

    <button type="submit">Sign in</button>
    <p>
      Don't have an account?
      <router-link :to="{ name: 'sign-up' }">Sign up</router-link>
    </p>

  </form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore.js";
import { RouterLink } from "vue-router";
import router from "@/router/index"

const userStore = useUserStore();
const { signInUser } = userStore;

const email = ref("testemail@gmail.com");
const password = ref("testpassword123456789");

const handleSubmit = () => {
  signInUser(email.value, password.value);
  router.push("/home")
};
</script>
