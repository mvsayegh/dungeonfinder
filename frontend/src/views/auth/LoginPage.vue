<template>
  <div class="login-page min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
    <div class="max-w-md w-full mx-4">
      <div class="card">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gradient mb-2">Bem-vindo de volta!</h1>
          <p class="text-gray-600">Entre na sua conta para continuar sua aventura</p>
        </div>

        <v-form @submit.prevent="handleLogin" ref="loginForm">
          <div class="space-y-6">
            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              variant="outlined"
              :rules="emailRules"
              :error-messages="emailErrors"
              prepend-inner-icon="mdi-email"
              class="w-full"
              required
            />

            <v-text-field
              v-model="form.password"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              :rules="passwordRules"
              :error-messages="passwordErrors"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              class="w-full"
              required
            />

            <div class="flex items-center justify-between">
              <v-checkbox
                v-model="rememberMe"
                label="Lembrar de mim"
                color="primary"
                hide-details
              />
              <a href="#" class="text-primary-600 hover:text-primary-700 text-sm">
                Esqueceu a senha?
              </a>
            </div>

            <v-alert
              v-if="authStore.error"
              type="error"
              variant="tonal"
              closable
              @click:close="authStore.clearError"
            >
              {{ authStore.error }}
            </v-alert>

            <v-btn
              type="submit"
              class="w-full btn-primary"
              size="large"
              :loading="authStore.loading"
              :disabled="!isFormValid"
            >
              <v-icon left>mdi-login</v-icon>
              Entrar
            </v-btn>
          </div>
        </v-form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Não tem uma conta?
            <router-link to="/register" class="text-primary-600 hover:text-primary-700 font-medium">
              Criar conta gratuita
            </router-link>
          </p>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <div class="mt-6">
            <router-link to="/" class="w-full btn-outline flex items-center justify-center">
              <v-icon left>mdi-arrow-left</v-icon>
              Voltar para o site
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Form data
const form = ref({
  email: '',
  password: ''
})

const rememberMe = ref(false)
const showPassword = ref(false)
const loginForm = ref()

// Validation rules
const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres'
]

// Computed
const emailErrors = computed(() => {
  if (!form.value.email) return []
  if (!/.+@.+\..+/.test(form.value.email)) return ['Email deve ser válido']
  return []
})

const passwordErrors = computed(() => {
  if (!form.value.password) return []
  if (form.value.password.length < 6) return ['Senha deve ter pelo menos 6 caracteres']
  return []
})

const isFormValid = computed(() => {
  return form.value.email && 
         form.value.password && 
         emailErrors.value.length === 0 && 
         passwordErrors.value.length === 0
})

// Methods
const handleLogin = async () => {
  if (!isFormValid.value) return

  const result = await authStore.login({
    email: form.value.email,
    password: form.value.password
  })

  if (result.success) {
    // Redirecionar para a página solicitada ou dashboard
    const redirectTo = route.query.redirect as string || '/admin/dashboard'
    router.push(redirectTo)
  }
}
</script>

<style scoped>
.login-page {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(217, 70, 239, 0.1) 0%, transparent 50%);
}
</style>

