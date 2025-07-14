<template>
  <AdminLayout>
    <div class="dashboard-page">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-dark-800 mb-2">Dashboard</h1>
        <p class="text-gray-600">Bem-vindo ao painel administrativo do Dungeon Finder</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <v-card
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-card"
          elevation="2"
        >
          <v-card-text class="pa-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">{{ stat.title }}</p>
                <p class="text-3xl font-bold text-dark-800">{{ stat.value }}</p>
                <div class="flex items-center mt-2">
                  <v-icon
                    :color="stat.trend === 'up' ? 'success' : 'error'"
                    size="16"
                    class="mr-1"
                  >
                    {{ stat.trend === 'up' ? 'mdi-trending-up' : 'mdi-trending-down' }}
                  </v-icon>
                  <span
                    :class="stat.trend === 'up' ? 'text-green-600' : 'text-red-600'"
                    class="text-sm font-medium"
                  >
                    {{ stat.change }}
                  </span>
                  <span class="text-gray-500 text-sm ml-1">vs mês anterior</span>
                </div>
              </div>
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center"
                :class="stat.iconBg"
              >
                <v-icon :color="stat.iconColor" size="24">{{ stat.icon }}</v-icon>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- User Growth Chart -->
        <v-card elevation="2">
          <v-card-title class="pa-6 pb-0">
            <div class="flex items-center justify-between w-full">
              <h3 class="text-lg font-semibold">Crescimento de Usuários</h3>
              <v-btn-toggle
                v-model="userGrowthPeriod"
                variant="outlined"
                size="small"
                mandatory
              >
                <v-btn value="7d" size="small">7d</v-btn>
                <v-btn value="30d" size="small">30d</v-btn>
                <v-btn value="90d" size="small">90d</v-btn>
              </v-btn-toggle>
            </div>
          </v-card-title>
          <v-card-text class="pa-6">
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div class="text-center">
                <v-icon size="48" class="text-gray-400 mb-2">mdi-chart-line</v-icon>
                <p class="text-gray-500">Gráfico de crescimento de usuários</p>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Game Tables Activity -->
        <v-card elevation="2">
          <v-card-title class="pa-6 pb-0">
            <h3 class="text-lg font-semibold">Atividade das Mesas</h3>
          </v-card-title>
          <v-card-text class="pa-6">
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div class="text-center">
                <v-icon size="48" class="text-gray-400 mb-2">mdi-chart-donut</v-icon>
                <p class="text-gray-500">Gráfico de atividade das mesas</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Recent Activity & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activity -->
        <div class="lg:col-span-2">
          <v-card elevation="2">
            <v-card-title class="pa-6 pb-0">
              <div class="flex items-center justify-between w-full">
                <h3 class="text-lg font-semibold">Atividade Recente</h3>
                <v-btn variant="text" size="small" color="primary">
                  Ver todas
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text class="pa-6">
              <v-list class="pa-0">
                <v-list-item
                  v-for="(activity, index) in recentActivities"
                  :key="index"
                  class="px-0"
                >
                  <template #prepend>
                    <v-avatar
                      :color="activity.color"
                      size="40"
                      class="mr-4"
                    >
                      <v-icon color="white">{{ activity.icon }}</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-sm font-medium">
                    {{ activity.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-xs text-gray-500">
                    {{ activity.time }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </div>

        <!-- Quick Actions -->
        <div>
          <v-card elevation="2">
            <v-card-title class="pa-6 pb-0">
              <h3 class="text-lg font-semibold">Ações Rápidas</h3>
            </v-card-title>
            <v-card-text class="pa-6">
              <div class="space-y-3">
                <v-btn
                  v-for="(action, index) in quickActions"
                  :key="index"
                  :color="action.color"
                  variant="outlined"
                  block
                  class="justify-start"
                  @click="handleQuickAction(action.action)"
                >
                  <v-icon left>{{ action.icon }}</v-icon>
                  {{ action.title }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          <!-- System Status -->
          <v-card elevation="2" class="mt-6">
            <v-card-title class="pa-6 pb-0">
              <h3 class="text-lg font-semibold">Status do Sistema</h3>
            </v-card-title>
            <v-card-text class="pa-6">
              <div class="space-y-4">
                <div
                  v-for="(status, index) in systemStatus"
                  :key="index"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center">
                    <v-icon
                      :color="status.status === 'online' ? 'success' : 'error'"
                      size="16"
                      class="mr-2"
                    >
                      mdi-circle
                    </v-icon>
                    <span class="text-sm">{{ status.service }}</span>
                  </div>
                  <v-chip
                    :color="status.status === 'online' ? 'success' : 'error'"
                    size="small"
                    variant="flat"
                  >
                    {{ status.status === 'online' ? 'Online' : 'Offline' }}
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()

// State
const userGrowthPeriod = ref('30d')

// Stats data
const stats = ref([
  {
    title: 'Total de Usuários',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: 'mdi-account-group',
    iconColor: 'primary',
    iconBg: 'bg-primary-100'
  },
  {
    title: 'Mesas Ativas',
    value: '89',
    change: '+8%',
    trend: 'up',
    icon: 'mdi-table-furniture',
    iconColor: 'success',
    iconBg: 'bg-green-100'
  },
  {
    title: 'Sessões Hoje',
    value: '24',
    change: '-3%',
    trend: 'down',
    icon: 'mdi-calendar-today',
    iconColor: 'warning',
    iconBg: 'bg-yellow-100'
  },
  {
    title: 'Taxa de Engajamento',
    value: '87%',
    change: '+5%',
    trend: 'up',
    icon: 'mdi-chart-line',
    iconColor: 'secondary',
    iconBg: 'bg-purple-100'
  }
])

// Recent activities
const recentActivities = ref([
  {
    title: 'Novo usuário registrado: João Silva',
    time: '2 minutos atrás',
    icon: 'mdi-account-plus',
    color: 'primary'
  },
  {
    title: 'Mesa "Aventuras em Faerûn" foi criada',
    time: '15 minutos atrás',
    icon: 'mdi-table-furniture',
    color: 'success'
  },
  {
    title: 'Usuário Maria Santos fez login',
    time: '32 minutos atrás',
    icon: 'mdi-login',
    color: 'info'
  },
  {
    title: 'Mesa "Cyberpunk 2077" foi finalizada',
    time: '1 hora atrás',
    icon: 'mdi-check-circle',
    color: 'warning'
  },
  {
    title: 'Backup do sistema executado com sucesso',
    time: '2 horas atrás',
    icon: 'mdi-backup-restore',
    color: 'secondary'
  }
])

// Quick actions
const quickActions = ref([
  {
    title: 'Criar Usuário',
    icon: 'mdi-account-plus',
    color: 'primary',
    action: 'create-user'
  },
  {
    title: 'Nova Mesa',
    icon: 'mdi-table-plus',
    color: 'success',
    action: 'create-table'
  },
  {
    title: 'Enviar Notificação',
    icon: 'mdi-bell-plus',
    color: 'warning',
    action: 'send-notification'
  },
  {
    title: 'Relatório',
    icon: 'mdi-file-chart',
    color: 'info',
    action: 'generate-report'
  }
])

// System status
const systemStatus = ref([
  {
    service: 'API Backend',
    status: 'online'
  },
  {
    service: 'Banco de Dados',
    status: 'online'
  },
  {
    service: 'Sistema de Email',
    status: 'online'
  },
  {
    service: 'WebSocket',
    status: 'online'
  }
])

// Methods
const handleQuickAction = (action: string) => {
  switch (action) {
    case 'create-user':
      router.push('/admin/users?action=create')
      break
    case 'create-table':
      router.push('/admin/game-tables?action=create')
      break
    case 'send-notification':
      // Implementar modal de notificação
      console.log('Enviar notificação')
      break
    case 'generate-report':
      router.push('/admin/reports')
      break
  }
}
</script>

<style scoped>
.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

:deep(.v-btn-toggle) {
  height: 32px;
}

:deep(.v-btn-toggle .v-btn) {
  min-width: 40px;
  height: 32px;
}
</style>

