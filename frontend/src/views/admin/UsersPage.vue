<template>
  <AdminLayout>
    <div class="users-page">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-dark-800 mb-2">Usuários</h1>
          <p class="text-gray-600">Gerencie todos os usuários da plataforma</p>
        </div>
        <v-btn
          color="primary"
          size="large"
          @click="openCreateDialog"
        >
          <v-icon left>mdi-account-plus</v-icon>
          Novo Usuário
        </v-btn>
      </div>

      <!-- Filters and Search -->
      <v-card class="mb-6" elevation="2">
        <v-card-text class="pa-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Buscar usuários..."
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
              v-model="roleFilter"
              :items="roleOptions"
              label="Função"
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
              Limpar Filtros
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- Users Table -->
      <v-card elevation="2">
        <v-data-table
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="filteredUsers"
          :loading="loading"
          :search="search"
          class="elevation-0"
        >
          <template #item.avatar="{ item }">
            <v-avatar size="40" class="my-2">
              <v-img :src="getUserAvatar(item.username)" :alt="item.username" />
            </v-avatar>
          </template>

          <template #item.username="{ item }">
            <div>
              <div class="font-medium">{{ item.username }}</div>
              <div class="text-sm text-gray-500">{{ item.email }}</div>
            </div>
          </template>

          <template #item.isAdmin="{ item }">
            <v-chip
              :color="item.isAdmin ? 'primary' : 'default'"
              size="small"
              variant="flat"
            >
              {{ item.isAdmin ? 'Admin' : 'Usuário' }}
            </v-chip>
          </template>

          <template #item.status="{ item }">
            <v-chip
              :color="item.status === 'active' ? 'success' : 'error'"
              size="small"
              variant="flat"
            >
              {{ item.status === 'active' ? 'Ativo' : 'Inativo' }}
            </v-chip>
          </template>

          <template #item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>

          <template #item.actions="{ item }">
            <div class="flex gap-2">
              <v-btn
                icon
                size="small"
                variant="text"
                color="primary"
                @click="editUser(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                icon
                size="small"
                variant="text"
                color="error"
                @click="deleteUser(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>

      <!-- Create/Edit User Dialog -->
      <v-dialog v-model="userDialog" max-width="600px">
        <v-card>
          <v-card-title class="pa-6 pb-0">
            <h2 class="text-xl font-semibold">
              {{ editingUser ? 'Editar Usuário' : 'Novo Usuário' }}
            </h2>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <v-form ref="userForm" @submit.prevent="saveUser">
              <div class="space-y-4">
                <v-text-field
                  v-model="userFormData.username"
                  label="Nome de usuário"
                  variant="outlined"
                  :rules="[v => !!v || 'Nome de usuário é obrigatório']"
                  required
                />
                
                <v-text-field
                  v-model="userFormData.email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  :rules="[v => !!v || 'Email é obrigatório', v => /.+@.+\..+/.test(v) || 'Email deve ser válido']"
                  required
                />
                
                <v-text-field
                  v-if="!editingUser"
                  v-model="userFormData.password"
                  label="Senha"
                  type="password"
                  variant="outlined"
                  :rules="[v => !!v || 'Senha é obrigatória', v => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres']"
                  required
                />
                
                <v-switch
                  v-model="userFormData.isAdmin"
                  label="Administrador"
                  color="primary"
                  hide-details
                />
                
                <v-select
                  v-model="userFormData.status"
                  :items="statusOptions"
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
              @click="closeUserDialog"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              :loading="saving"
              @click="saveUser"
            >
              {{ editingUser ? 'Salvar' : 'Criar' }}
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
            <p>Tem certeza que deseja excluir o usuário <strong>{{ userToDelete?.username }}</strong>?</p>
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
const roleFilter = ref('all')
const itemsPerPage = ref(10)

// Dialogs
const userDialog = ref(false)
const deleteDialog = ref(false)

// Form data
const editingUser = ref(null)
const userToDelete = ref(null)
const userFormData = ref({
  username: '',
  email: '',
  password: '',
  isAdmin: false,
  status: 'active'
})

// Mock data (replace with API calls)
const users = ref([
  {
    _id: '1',
    username: 'admin',
    email: 'admin@dungeonFinder.com',
    isAdmin: true,
    status: 'active',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    _id: '2',
    username: 'joao_silva',
    email: 'joao@email.com',
    isAdmin: false,
    status: 'active',
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    _id: '3',
    username: 'maria_santos',
    email: 'maria@email.com',
    isAdmin: false,
    status: 'active',
    createdAt: '2025-02-01T14:20:00Z'
  }
])

// Options
const statusOptions = [
  { title: 'Todos', value: 'all' },
  { title: 'Ativo', value: 'active' },
  { title: 'Inativo', value: 'inactive' }
]

const roleOptions = [
  { title: 'Todos', value: 'all' },
  { title: 'Administrador', value: 'admin' },
  { title: 'Usuário', value: 'user' }
]

// Table headers
const headers = [
  { title: '', key: 'avatar', sortable: false, width: '60px' },
  { title: 'Usuário', key: 'username', sortable: true },
  { title: 'Função', key: 'isAdmin', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Criado em', key: 'createdAt', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, width: '120px' }
]

// Computed
const filteredUsers = computed(() => {
  let filtered = users.value

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(user => user.status === statusFilter.value)
  }

  if (roleFilter.value !== 'all') {
    if (roleFilter.value === 'admin') {
      filtered = filtered.filter(user => user.isAdmin)
    } else {
      filtered = filtered.filter(user => !user.isAdmin)
    }
  }

  return filtered
})

// Methods
const getUserAvatar = (username: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0ea5e9&color=fff&size=128`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const clearFilters = () => {
  search.value = ''
  statusFilter.value = 'all'
  roleFilter.value = 'all'
}

const openCreateDialog = () => {
  editingUser.value = null
  userFormData.value = {
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    status: 'active'
  }
  userDialog.value = true
}

const editUser = (user: any) => {
  editingUser.value = user
  userFormData.value = {
    username: user.username,
    email: user.email,
    password: '',
    isAdmin: user.isAdmin,
    status: user.status
  }
  userDialog.value = true
}

const closeUserDialog = () => {
  userDialog.value = false
  editingUser.value = null
}

const saveUser = async () => {
  saving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingUser.value) {
      // Update existing user
      const index = users.value.findIndex(u => u._id === editingUser.value._id)
      if (index !== -1) {
        users.value[index] = {
          ...users.value[index],
          ...userFormData.value
        }
      }
    } else {
      // Create new user
      const newUser = {
        _id: Date.now().toString(),
        ...userFormData.value,
        createdAt: new Date().toISOString()
      }
      users.value.push(newUser)
    }
    
    closeUserDialog()
  } catch (error) {
    console.error('Erro ao salvar usuário:', error)
  } finally {
    saving.value = false
  }
}

const deleteUser = (user: any) => {
  userToDelete.value = user
  deleteDialog.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const index = users.value.findIndex(u => u._id === userToDelete.value._id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
    
    deleteDialog.value = false
    userToDelete.value = null
  } catch (error) {
    console.error('Erro ao excluir usuário:', error)
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  // Load users data
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
:deep(.v-data-table) {
  border-radius: 8px;
}

:deep(.v-data-table-header) {
  background-color: #f8fafc;
}
</style>

