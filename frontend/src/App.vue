<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Inicializar autenticação ao carregar a aplicação
  authStore.initializeAuth()
})
</script>

<style>
/* Global styles are handled in main.css */
</style>

