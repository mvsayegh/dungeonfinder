<template>
  <div class="register-page min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
    <div class="max-w-md w-full mx-4">
      <div class="card">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gradient mb-2">Junte-se a nós!</h1>
          <p class="text-gray-600">Crie sua conta e comece sua jornada épica</p>
        </div>

        <v-form @submit.prevent="handleRegister" ref="registerForm">
          <div class="space-y-6">
            <v-text-field
              v-model="form.username"
              label="Nome de usuário"
              variant="outlined"
              :rules="usernameRules"
              :error-messages="usernameErrors"
              prepend-inner-icon="mdi-account"
              class="w-full"
              required
            />

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

            <v-text-field
              v-model="form.confirmPassword"
              label="Confirmar senha"
              :type="showConfirmPassword ? 'text' : 'password'"
              variant="outlined"
              :rules="confirmPasswordRules"
              :error-messages="confirmPasswordErrors"
              prepend-inner-icon="mdi-lock-check"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              class="w-full"
              required
            />

            <div class="space-y-3">
              <v-checkbox
                v-model="acceptTerms"
                color="primary"
                hide-details
              >
                <template #label>
                  <span class="text-sm">
                    Eu aceito os 
                    <a href="#" class="text-primary-600 hover:text-primary-700">Termos de Uso</a>
                    e a 
                    <a href="#" class="text-primary-600 hover:text-primary-700">Política de Privacidade</a>
                  </span>
                </template>
              </v-checkbox>

              <v-checkbox
                v-model="acceptNewsletter"
                label="Quero receber novidades e atualizações por email"
                color="primary"
                hide-details
              />
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
              <v-icon left>mdi-account-plus</v-icon>
              Criar Conta
            </v-btn>
          </div>
        </v-form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Já tem uma conta?
            <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
              Fazer login
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const acceptTerms = ref(false)
const acceptNewsletter = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registerForm = ref()

// Validation rules
const usernameRules = [
  (v: string) => !!v || 'Nome de usuário é obrigatório',
  (v: string) => v.length >= 3 || 'Nome de usuário deve ter pelo menos 3 caracteres',
  (v: string) => v.length <= 20 || 'Nome de usuário deve ter no máximo 20 caracteres'
]

const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres',
  (v: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) || 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Confirmação de senha é obrigatória',
  (v: string) => v === form.value.password || 'Senhas não coincidem'
]

// Computed
const usernameErrors = computed(() => {
  if (!form.value.username) return []
  if (form.value.username.length < 3) return ['Nome de usuário deve ter pelo menos 3 caracteres']
  if (form.value.username.length > 20) return ['Nome de usuário deve ter no máximo 20 caracteres']
  return []
})

const emailErrors = computed(() => {
  if (!form.value.email) return []
  if (!/.+@.+\..+/.test(form.value.email)) return ['Email deve ser válido']
  return []
})

const passwordErrors = computed(() => {
  if (!form.value.password) return []
  if (form.value.password.length < 6) return ['Senha deve ter pelo menos 6 caracteres']
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.value.password)) {
    return ['Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número']
  }
  return []
})

const confirmPasswordErrors = computed(() => {
  if (!form.value.confirmPassword) return []
  if (form.value.confirmPassword !== form.value.password) return ['Senhas não coincidem']
  return []
})

const isFormValid = computed(() => {
  return form.value.username && 
         form.value.email && 
         form.value.password && 
         form.value.confirmPassword &&
         usernameErrors.value.length === 0 && 
         emailErrors.value.length === 0 && 
         passwordErrors.value.length === 0 &&
         confirmPasswordErrors.value.length === 0 &&
         acceptTerms.value
})

// Methods
const handleRegister = async () => {
  if (!isFormValid.value) return

  const result = await authStore.register({
    username: form.value.username,
    email: form.value.email,
    password: form.value.password
  })

  if (result.success) {
    router.push('/admin/dashboard')
  }
}
</script>

<style scoped>
.register-page {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(217, 70, 239, 0.1) 0%, transparent 50%);
}
</style>

