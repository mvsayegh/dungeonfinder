import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type User, type LoginCredentials, type RegisterData } from '@/utils/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.isAdmin || false)

  // Actions
  const login = async (credentials: LoginCredentials) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await authService.login(credentials)
      
      if (response.data.success && response.data.data) {
        token.value = response.data.data.token
        user.value = response.data.data.user
        
        localStorage.setItem('authToken', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
        
        return { success: true }
      } else {
        throw new Error(response.data.message || 'Erro no login')
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro no login'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await authService.register(userData)
      
      if (response.data.success && response.data.data) {
        token.value = response.data.data.token
        user.value = response.data.data.user
        
        localStorage.setItem('authToken', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
        
        return { success: true }
      } else {
        throw new Error(response.data.message || 'Erro no registro')
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro no registro'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await authService.logout()
      }
    } catch (err) {
      console.error('Erro no logout:', err)
    } finally {
      // Limpar dados locais independentemente do resultado da API
      token.value = null
      user.value = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  }

  const fetchProfile = async () => {
    try {
      loading.value = true
      error.value = null
      
      const response = await authService.getProfile()
      
      if (response.data.success && response.data.data) {
        user.value = response.data.data
        localStorage.setItem('user', JSON.stringify(user.value))
        return { success: true }
      } else {
        throw new Error(response.data.message || 'Erro ao buscar perfil')
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar perfil'
      error.value = errorMessage
      
      // Se o token for inválido, fazer logout
      if (err.response?.status === 401) {
        await logout()
      }
      
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch (err) {
        console.error('Erro ao inicializar autenticação:', err)
        logout()
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Inicializar autenticação ao criar a store
  initializeAuth()

  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    isAdmin,
    
    // Actions
    login,
    register,
    logout,
    fetchProfile,
    initializeAuth,
    clearError
  }
})

