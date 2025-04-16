<template>
  <nav-bar></nav-bar>
  <div v-if="storeAuth.usuario.id" class="px-2 py-4 is-size-4 has-text-centered">Oi {{ storeAuth.usuario.email }}</div>
  <div class="container is-max-desktop px-2 py-4">
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import NavBar from './components/Layouts/NavBar.vue';
  import { useStoreAuth } from './stores/storeAuth';

  const storeAuth = useStoreAuth()

  onMounted(() => {
    storeAuth.init
  })
</script> 

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css";
</style>