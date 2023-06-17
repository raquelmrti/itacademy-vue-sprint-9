<template>
  <form @submit.prevent="handleSubmit">
    <label for="displayName">Display name</label>
    <input type="text" placeholder="Your display name" v-model.trim="displayName" required />

    <label for="email">Email</label>
    <input type="email" placeholder="Your email" v-model.trim="email" required />

    <label for="password">Password</label>
    <input type="password" placeholder="********" v-model.trim="password" required />

    <button type="submit">Create account</button>
    <p>
      Already have an account?
      <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()
const { registerUser } = userStore

const displayName = ref("Test name");
const email = ref("testemail@gmail.com");
const password = ref("testpassword123456789");

const handleSubmit = () => {
  registerUser(displayName.value, email.value, password.value)
}
</script>
