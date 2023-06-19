<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <img src="http://via.placeholder.com/640x360" alt="" />
  <h1>Playshelf</h1>
  <h2>A simple videogame list builder</h2>
  <p>
    Organize your favorite titles into personalized lists quickly and easily. Playshelf lets you
    build, share, and explore game collections like never before.
  </p>

  <router-link :to="{ name: 'sign-in' }">Get started</router-link>
</template>
