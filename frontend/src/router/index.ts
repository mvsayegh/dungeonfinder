import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Lazy loading das views
const LandingPage = () => import('@/views/LandingPage.vue')
const LoginPage = () => import('@/views/auth/LoginPage.vue')
const RegisterPage = () => import('@/views/auth/RegisterPage.vue')
const DashboardPage = () => import('@/views/admin/DashboardPage.vue')
const UsersPage = () => import('@/views/admin/UsersPage.vue')
const GameTablesPage = () => import('@/views/admin/GameTablesPage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta: {
        title: 'Dungeon Finder - Conecte-se com jogadores de RPG'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        title: 'Login - Dungeon Finder',
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        title: 'Criar Conta - Dungeon Finder',
        requiresGuest: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/dashboard',
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: DashboardPage,
      meta: {
        title: 'Dashboard - Admin',
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: UsersPage,
      meta: {
        title: 'Usuários - Admin',
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/admin/game-tables',
      name: 'admin-game-tables',
      component: GameTablesPage,
      meta: {
        title: 'Mesas de Jogo - Admin',
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Atualizar título da página
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // Verificar se o usuário está autenticado
  if (!authStore.isAuthenticated && localStorage.getItem('authToken')) {
    try {
      await authStore.fetchProfile()
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      authStore.logout()
    }
  }
  
  // Rotas que requerem autenticação
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  // Rotas que requerem privilégios de admin
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'landing' })
    return
  }
  
  // Rotas que requerem usuário não autenticado (login, register)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'admin-dashboard' })
    return
  }
  
  next()
})

export default router

