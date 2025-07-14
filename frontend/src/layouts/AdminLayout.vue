<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      class="admin-drawer"
    >
      <v-list>
        <!-- Logo/Brand -->
        <v-list-item
          class="px-2 mb-4"
          :class="{ 'justify-center': rail }"
        >
          <template #prepend>
            <v-icon size="32" class="text-primary-600">mdi-sword-cross</v-icon>
          </template>
          <v-list-item-title v-if="!rail" class="text-xl font-bold text-gradient">
            Dungeon Finder
          </v-list-item-title>
        </v-list-item>

        <v-divider class="mb-4"></v-divider>

        <!-- Navigation Items -->
        <v-list-item
          v-for="item in navigationItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          class="mb-1"
          rounded="xl"
        >
          <template #append v-if="item.badge && !rail">
            <v-chip
              size="small"
              :color="item.badge.color"
              variant="flat"
            >
              {{ item.badge.text }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>

      <!-- User Section -->
      <template #append>
        <div class="pa-2">
          <v-list-item
            :prepend-avatar="userAvatar"
            :title="authStore.user?.username"
            :subtitle="authStore.user?.email"
            class="mb-2"
          >
            <template #append v-if="!rail">
              <v-menu>
                <template #activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    variant="text"
                    size="small"
                    v-bind="props"
                  ></v-btn>
                </template>
                <v-list>
                  <v-list-item @click="handleProfile">
                    <template #prepend>
                      <v-icon>mdi-account</v-icon>
                    </template>
                    <v-list-item-title>Perfil</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="handleSettings">
                    <template #prepend>
                      <v-icon>mdi-cog</v-icon>
                    </template>
                    <v-list-item-title>Configurações</v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="handleLogout">
                    <template #prepend>
                      <v-icon>mdi-logout</v-icon>
                    </template>
                    <v-list-item-title>Sair</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar
      :order="-1"
      class="admin-app-bar"
      elevation="1"
    >
      <v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
      
      <v-app-bar-title class="text-h6 font-weight-bold">
        {{ currentPageTitle }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Search -->
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Buscar..."
        variant="outlined"
        density="compact"
        hide-details
        class="mr-4"
        style="max-width: 300px;"
      ></v-text-field>

      <!-- Notifications -->
      <v-btn icon class="mr-2">
        <v-badge
          :content="notificationCount"
          :model-value="notificationCount > 0"
          color="error"
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <!-- Theme Toggle -->
      <v-btn
        icon
        @click="toggleTheme"
        class="mr-2"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <!-- User Menu -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="text-none"
            variant="text"
          >
            <v-avatar size="32" class="mr-2">
              <v-img :src="userAvatar" :alt="authStore.user?.username"></v-img>
            </v-avatar>
            <span class="hidden sm:inline">{{ authStore.user?.username }}</span>
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleProfile">
            <template #prepend>
              <v-icon>mdi-account</v-icon>
            </template>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleSettings">
            <template #prepend>
              <v-icon>mdi-cog</v-icon>
            </template>
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="goToLanding">
            <template #prepend>
              <v-icon>mdi-home</v-icon>
            </template>
            <v-list-item-title>Ir para o site</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleLogout">
            <template #prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="admin-main">
      <div class="pa-6">
        <router-view />
      </div>
    </v-main>

    <!-- Loading Overlay -->
    <v-overlay
      v-model="authStore.loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const theme = useTheme()
const authStore = useAuthStore()

// State
const drawer = ref(true)
const rail = ref(false)
const searchQuery = ref('')
const notificationCount = ref(3)

// Computed
const isDark = computed(() => theme.global.current.value.dark)

const userAvatar = computed(() => {
  // Gerar avatar baseado no nome do usuário
  const username = authStore.user?.username || 'User'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0ea5e9&color=fff&size=128`
})

const currentPageTitle = computed(() => {
  const routeTitle = route.meta.title as string
  return routeTitle?.replace(' - Admin', '') || 'Dashboard'
})

// Navigation items
const navigationItems = ref([
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    to: '/admin/dashboard'
  },
  {
    title: 'Usuários',
    icon: 'mdi-account-group',
    to: '/admin/users',
    badge: {
      text: '12',
      color: 'primary'
    }
  },
  {
    title: 'Mesas de Jogo',
    icon: 'mdi-table-furniture',
    to: '/admin/game-tables',
    badge: {
      text: '5',
      color: 'success'
    }
  },
  {
    title: 'Relatórios',
    icon: 'mdi-chart-line',
    to: '/admin/reports'
  },
  {
    title: 'Configurações',
    icon: 'mdi-cog',
    to: '/admin/settings'
  }
])

// Methods
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const handleProfile = () => {
  router.push('/admin/profile')
}

const handleSettings = () => {
  router.push('/admin/settings')
}

const goToLanding = () => {
  router.push('/')
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.admin-drawer {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.admin-app-bar {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9) !important;
}

.admin-main {
  background-color: #f8fafc;
}

:deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
}

:deep(.v-list-item--active) {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(217, 70, 239, 0.1));
  border-left: 3px solid #0ea5e9;
}

:deep(.v-list-item--active .v-list-item__prepend .v-icon) {
  color: #0ea5e9;
}
</style>

