<template>
  <AdminLayout>
    <div class="game-tables-page">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-dark-800 mb-2">Mesas de Jogo</h1>
          <p class="text-gray-600">Gerencie todas as mesas de RPG da plataforma</p>
        </div>
        <v-btn
          color="primary"
          size="large"
          @click="openCreateDialog"
        >
          <v-icon left>mdi-table-plus</v-icon>
          Nova Mesa
        </v-btn>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <v-card
          v-for="(stat, index) in stats"
          :key="index"
          elevation="2"
          class="stat-card"
        >
          <v-card-text class="pa-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">{{ stat.title }}</p>
                <p class="text-2xl font-bold text-dark-800">{{ stat.value }}</p>
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

      <!-- Filters and Search -->
      <v-card class="mb-6" elevation="2">
        <v-card-text class="pa-6">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Buscar mesas..."
              variant="outlined"
              density="compact"
              hide-details
            />
            <v-select
              v-model="statusFilter"
              :items="statusOptions"
              label="Status"
              variant="outlined"
              density="compact"
              hide-details
            />
            <v-select
              v-model="systemFilter"
              :items="systemOptions"
              label="Sistema"
              variant="outlined"
              density="compact"
              hide-details
            />
            <v-select
              v-model="dateFilter"
              :items="dateOptions"
              label="Data"
              variant="outlined"
              density="compact"
              hide-details
            />
            <v-btn
              color="primary"
              variant="outlined"
              @click="clearFilters"
            >
              <v-icon left>mdi-filter-off</v-icon>
              Limpar
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- Game Tables Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <v-card
          v-for="table in filteredTables"
          :key="table._id"
          elevation="2"
          class="game-table-card"
        >
          <v-card-text class="pa-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-dark-800 mb-2">{{ table.title }}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ table.description }}</p>
              </div>
              <v-menu>
                <template #activator="{ props }">
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    v-bind="props"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="editTable(table)">
                    <template #prepend>
                      <v-icon>mdi-pencil</v-icon>
                    </template>
                    <v-list-item-title>Editar</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteTable(table)">
                    <template #prepend>
                      <v-icon>mdi-delete</v-icon>
                    </template>
                    <v-list-item-title>Excluir</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Sistema:</span>
                <v-chip size="small" variant="flat" color="primary">
                  {{ table.gameSystem }}
                </v-chip>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Jogadores:</span>
                <span class="text-sm font-medium">
                  {{ table.currentPlayers }}/{{ table.maxPlayers }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Status:</span>
                <v-chip
                  :color="getStatusColor(table.status)"
                  size="small"
                  variant="flat"
                >
                  {{ getStatusText(table.status) }}
                </v-chip>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Data:</span>
                <span class="text-sm">{{ formatDate(table.scheduledDate) }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Mestre:</span>
                <span class="text-sm font-medium">{{ table.createdBy }}</span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex gap-2">
                <v-btn
                  size="small"
                  variant="outlined"
                  color="primary"
                  @click="viewTable(table)"
                >
                  <v-icon left size="16">mdi-eye</v-icon>
                  Ver Detalhes
                </v-btn>
                <v-btn
                  size="small"
                  variant="outlined"
                  color="success"
                  @click="editTable(table)"
                >
                  <v-icon left size="16">mdi-pencil</v-icon>
                  Editar
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Create/Edit Table Dialog -->
      <v-dialog v-model="tableDialog" max-width="800px">
        <v-card>
          <v-card-title class="pa-6 pb-0">
            <h2 class="text-xl font-semibold">
              {{ editingTable ? 'Editar Mesa' : 'Nova Mesa' }}
            </h2>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <v-form ref="tableForm" @submit.prevent="saveTable">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <v-text-field
                  v-model="tableFormData.title"
                  label="Título da Mesa"
                  variant="outlined"
                  :rules="[v => !!v || 'Título é obrigatório']"
                  required
                  class="md:col-span-2"
                />
                
                <v-textarea
                  v-model="tableFormData.description"
                  label="Descrição"
                  variant="outlined"
                  rows="3"
                  :rules="[v => !!v || 'Descrição é obrigatória']"
                  required
                  class="md:col-span-2"
                />
                
                <v-select
                  v-model="tableFormData.gameSystem"
                  :items="gameSystems"
                  label="Sistema de Jogo"
                  variant="outlined"
                  :rules="[v => !!v || 'Sistema é obrigatório']"
                  required
                />
                
                <v-number-input
                  v-model="tableFormData.maxPlayers"
                  label="Máximo de Jogadores"
                  variant="outlined"
                  :min="2"
                  :max="8"
                  :rules="[v => !!v || 'Número máximo é obrigatório']"
                  required
                />
                
                <v-text-field
                  v-model="tableFormData.scheduledDate"
                  label="Data Agendada"
                  type="datetime-local"
                  variant="outlined"
                  :rules="[v => !!v || 'Data é obrigatória']"
                  required
                />
                
                <v-select
                  v-model="tableFormData.status"
                  :items="tableStatusOptions"
                  label="Status"
                  variant="outlined"
                  required
                />
              </div>
            </v-form>
          </v-card-text>
          
          <v-card-actions class="pa-6 pt-0">
            <v-spacer />
            <v-btn
              variant="text"
              @click="closeTableDialog"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              :loading="saving"
              @click="saveTable"
            >
              {{ editingTable ? 'Salvar' : 'Criar' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="deleteDialog" max-width="400px">
        <v-card>
          <v-card-title class="pa-6 pb-0">
            <h2 class="text-xl font-semibold">Confirmar Exclusão</h2>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <p>Tem certeza que deseja excluir a mesa <strong>{{ tableToDelete?.title }}</strong>?</p>
            <p class="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
          </v-card-text>
          
          <v-card-actions class="pa-6 pt-0">
            <v-spacer />
            <v-btn
              variant="text"
              @click="deleteDialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="error"
              :loading="deleting"
              @click="confirmDelete"
            >
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// State
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const search = ref('')
const statusFilter = ref('all')
const systemFilter = ref('all')
const dateFilter = ref('all')

// Dialogs
const tableDialog = ref(false)
const deleteDialog = ref(false)

// Form data
const editingTable = ref(null)
const tableToDelete = ref(null)
const tableFormData = ref({
  title: '',
  description: '',
  gameSystem: '',
  maxPlayers: 4,
  scheduledDate: '',
  status: 'open'
})

// Stats
const stats = ref([
  {
    title: 'Total de Mesas',
    value: '89',
    icon: 'mdi-table-furniture',
    iconColor: 'primary',
    iconBg: 'bg-primary-100'
  },
  {
    title: 'Mesas Abertas',
    value: '34',
    icon: 'mdi-door-open',
    iconColor: 'success',
    iconBg: 'bg-green-100'
  },
  {
    title: 'Mesas Cheias',
    value: '28',
    icon: 'mdi-account-group',
    iconColor: 'warning',
    iconBg: 'bg-yellow-100'
  },
  {
    title: 'Sessões Hoje',
    value: '12',
    icon: 'mdi-calendar-today',
    iconColor: 'secondary',
    iconBg: 'bg-purple-100'
  }
])

// Mock data
const gameTables = ref([
  {
    _id: '1',
    title: 'Aventuras em Faerûn',
    description: 'Uma campanha épica no mundo de Forgotten Realms, onde heróis enfrentam dragões e descobrem segredos antigos.',
    gameSystem: 'D&D 5e',
    maxPlayers: 5,
    currentPlayers: 3,
    scheduledDate: '2025-07-20T19:00:00Z',
    status: 'open',
    createdBy: 'João Silva'
  },
  {
    _id: '2',
    title: 'Cyberpunk 2077 - Night City',
    description: 'Aventuras cyberpunk na cidade do futuro, com hackers, corporações e muito neon.',
    gameSystem: 'Cyberpunk RED',
    maxPlayers: 4,
    currentPlayers: 4,
    scheduledDate: '2025-07-18T20:30:00Z',
    status: 'full',
    createdBy: 'Maria Santos'
  },
  {
    _id: '3',
    title: 'Call of Cthulhu - Mistérios Antigos',
    description: 'Investigações sobrenaturais e horror cósmico nos anos 1920.',
    gameSystem: 'Call of Cthulhu',
    maxPlayers: 6,
    currentPlayers: 2,
    scheduledDate: '2025-07-25T21:00:00Z',
    status: 'open',
    createdBy: 'Pedro Costa'
  }
])

// Options
const statusOptions = [
  { title: 'Todos', value: 'all' },
  { title: 'Aberta', value: 'open' },
  { title: 'Cheia', value: 'full' },
  { title: 'Fechada', value: 'closed' }
]

const systemOptions = [
  { title: 'Todos', value: 'all' },
  { title: 'D&D 5e', value: 'D&D 5e' },
  { title: 'Pathfinder', value: 'Pathfinder' },
  { title: 'Call of Cthulhu', value: 'Call of Cthulhu' },
  { title: 'Cyberpunk RED', value: 'Cyberpunk RED' },
  { title: 'Vampire: The Masquerade', value: 'Vampire: The Masquerade' }
]

const dateOptions = [
  { title: 'Todas', value: 'all' },
  { title: 'Hoje', value: 'today' },
  { title: 'Esta Semana', value: 'week' },
  { title: 'Este Mês', value: 'month' }
]

const gameSystems = [
  'D&D 5e',
  'Pathfinder',
  'Call of Cthulhu',
  'Cyberpunk RED',
  'Vampire: The Masquerade',
  'World of Darkness',
  'Savage Worlds',
  'GURPS'
]

const tableStatusOptions = [
  { title: 'Aberta', value: 'open' },
  { title: 'Cheia', value: 'full' },
  { title: 'Fechada', value: 'closed' }
]

// Computed
const filteredTables = computed(() => {
  let filtered = gameTables.value

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(table => table.status === statusFilter.value)
  }

  if (systemFilter.value !== 'all') {
    filtered = filtered.filter(table => table.gameSystem === systemFilter.value)
  }

  if (search.value) {
    const searchLower = search.value.toLowerCase()
    filtered = filtered.filter(table => 
      table.title.toLowerCase().includes(searchLower) ||
      table.description.toLowerCase().includes(searchLower) ||
      table.gameSystem.toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'success'
    case 'full': return 'warning'
    case 'closed': return 'error'
    default: return 'default'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'open': return 'Aberta'
    case 'full': return 'Cheia'
    case 'closed': return 'Fechada'
    default: return status
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const clearFilters = () => {
  search.value = ''
  statusFilter.value = 'all'
  systemFilter.value = 'all'
  dateFilter.value = 'all'
}

const openCreateDialog = () => {
  editingTable.value = null
  tableFormData.value = {
    title: '',
    description: '',
    gameSystem: '',
    maxPlayers: 4,
    scheduledDate: '',
    status: 'open'
  }
  tableDialog.value = true
}

const editTable = (table: any) => {
  editingTable.value = table
  tableFormData.value = {
    title: table.title,
    description: table.description,
    gameSystem: table.gameSystem,
    maxPlayers: table.maxPlayers,
    scheduledDate: table.scheduledDate.slice(0, 16), // Format for datetime-local
    status: table.status
  }
  tableDialog.value = true
}

const viewTable = (table: any) => {
  // Implement view details functionality
  console.log('View table:', table)
}

const closeTableDialog = () => {
  tableDialog.value = false
  editingTable.value = null
}

const saveTable = async () => {
  saving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingTable.value) {
      // Update existing table
      const index = gameTables.value.findIndex(t => t._id === editingTable.value._id)
      if (index !== -1) {
        gameTables.value[index] = {
          ...gameTables.value[index],
          ...tableFormData.value,
          scheduledDate: tableFormData.value.scheduledDate + ':00Z'
        }
      }
    } else {
      // Create new table
      const newTable = {
        _id: Date.now().toString(),
        ...tableFormData.value,
        currentPlayers: 0,
        scheduledDate: tableFormData.value.scheduledDate + ':00Z',
        createdBy: 'Admin'
      }
      gameTables.value.push(newTable)
    }
    
    closeTableDialog()
  } catch (error) {
    console.error('Erro ao salvar mesa:', error)
  } finally {
    saving.value = false
  }
}

const deleteTable = (table: any) => {
  tableToDelete.value = table
  deleteDialog.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const index = gameTables.value.findIndex(t => t._id === tableToDelete.value._id)
    if (index !== -1) {
      gameTables.value.splice(index, 1)
    }
    
    deleteDialog.value = false
    tableToDelete.value = null
  } catch (error) {
    console.error('Erro ao excluir mesa:', error)
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  // Load tables data
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.game-table-card {
  transition: all 0.3s ease;
}

.game-table-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

