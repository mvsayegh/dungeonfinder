<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900 to-secondary-900"></div>
      <div class="absolute inset-0 bg-black/50"></div>
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        :style="{ backgroundImage: `url(${heroImage})` }"
      ></div>
      
      <div class="relative z-10 container-custom text-center text-white">
        <div class="animate-fade-in">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Dungeon Finder
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Conecte-se com mestres e jogadores apaixonados por RPG. 
            Encontre sua próxima aventura épica ou crie a mesa dos seus sonhos.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <v-btn
              size="large"
              class="btn-primary text-lg px-8 py-4"
              @click="scrollToSection('features')"
            >
              <v-icon left>mdi-sword-cross</v-icon>
              Começar Aventura
            </v-btn>
            <v-btn
              size="large"
              variant="outlined"
              class="text-white border-white hover:bg-white hover:text-dark-900 text-lg px-8 py-4"
              @click="scrollToSection('about')"
            >
              <v-icon left>mdi-information</v-icon>
              Saiba Mais
            </v-btn>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <v-icon size="32" class="text-white opacity-70">mdi-chevron-down</v-icon>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-dark-800">
            Recursos Épicos
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra todas as ferramentas que tornam o Dungeon Finder a melhor plataforma para RPG
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <v-icon size="32" class="text-white">{{ feature.icon }}</v-icon>
              </div>
              <h3 class="text-2xl font-semibold mb-4 text-dark-800">{{ feature.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="section-padding bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-dark-800">
            Como Funciona
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Em apenas alguns passos, você estará pronto para sua próxima aventura
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="text-center"
          >
            <div class="relative mb-6">
              <div class="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {{ index + 1 }}
              </div>
              <div v-if="index < steps.length - 1" class="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform translate-x-10"></div>
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-dark-800">{{ step.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-slide-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-dark-800">
              Sobre o Dungeon Finder
            </h2>
            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
              O Dungeon Finder nasceu da paixão por RPG e da necessidade de conectar jogadores e mestres 
              de forma simples e eficiente. Nossa plataforma foi criada por jogadores, para jogadores.
            </p>
            <p class="text-lg text-gray-700 mb-8 leading-relaxed">
              Seja você um mestre experiente procurando novos jogadores ou um aventureiro em busca 
              da mesa perfeita, o Dungeon Finder é o lugar onde as melhores histórias começam.
            </p>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center">
                <v-icon class="text-primary-600 mr-2">mdi-check-circle</v-icon>
                <span class="text-gray-700">Comunidade ativa</span>
              </div>
              <div class="flex items-center">
                <v-icon class="text-primary-600 mr-2">mdi-check-circle</v-icon>
                <span class="text-gray-700">Interface intuitiva</span>
              </div>
              <div class="flex items-center">
                <v-icon class="text-primary-600 mr-2">mdi-check-circle</v-icon>
                <span class="text-gray-700">Totalmente gratuito</span>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="relative z-10">
              <img 
                :src="aboutImage" 
                alt="Jogadores de RPG" 
                class="rounded-2xl shadow-2xl w-full h-auto"
              >
            </div>
            <div class="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white">
      <div class="container-custom text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Pronto para Sua Próxima Aventura?
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Junte-se a milhares de jogadores e mestres que já encontraram suas mesas ideais no Dungeon Finder.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <v-btn
            size="large"
            class="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4"
            @click="goToRegister"
          >
            <v-icon left>mdi-account-plus</v-icon>
            Criar Conta Gratuita
          </v-btn>
          <v-btn
            size="large"
            variant="outlined"
            class="border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4"
            @click="goToLogin"
          >
            <v-icon left>mdi-login</v-icon>
            Fazer Login
          </v-btn>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark-900 text-white py-12">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-2xl font-bold mb-4 text-gradient">Dungeon Finder</h3>
            <p class="text-gray-400 mb-4 max-w-md">
              A plataforma definitiva para conectar jogadores e mestres de RPG. 
              Encontre sua mesa ideal e viva aventuras épicas.
            </p>
            <div class="flex space-x-4">
              <v-btn icon variant="text" class="text-gray-400 hover:text-white">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon variant="text" class="text-gray-400 hover:text-white">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon variant="text" class="text-gray-400 hover:text-white">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn icon variant="text" class="text-gray-400 hover:text-white">
                <v-icon>mdi-discord</v-icon>
              </v-btn>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul class="space-y-2">
              <li><a href="#features" class="text-gray-400 hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#how-it-works" class="text-gray-400 hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#about" class="text-gray-400 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="/login" class="text-gray-400 hover:text-white transition-colors">Login</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Suporte</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <p class="text-gray-400">
            © 2025 Dungeon Finder. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Images
import heroImage from '@/assets/images/hero-bg.jpg'
import featureImage1 from '@/assets/images/feature-1.jpg'
import aboutImage from '@/assets/images/feature-2.jpg'

const router = useRouter()

// Features data
const features = ref([
  {
    icon: 'mdi-account-group',
    title: 'Encontre Jogadores',
    description: 'Conecte-se com jogadores compatíveis com seu estilo de jogo e horários disponíveis.'
  },
  {
    icon: 'mdi-sword-cross',
    title: 'Crie Mesas',
    description: 'Mestres podem criar e gerenciar suas mesas com facilidade, definindo sistema, horário e vagas.'
  },
  {
    icon: 'mdi-calendar-check',
    title: 'Agende Sessões',
    description: 'Sistema integrado de agendamento para organizar suas sessões de RPG sem complicações.'
  },
  {
    icon: 'mdi-chat',
    title: 'Comunicação',
    description: 'Chat integrado para coordenar com sua mesa e manter todos informados sobre as sessões.'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Ambiente Seguro',
    description: 'Moderação ativa e sistema de avaliações para manter a comunidade saudável e respeitosa.'
  },
  {
    icon: 'mdi-devices',
    title: 'Multi-plataforma',
    description: 'Acesse de qualquer dispositivo - computador, tablet ou smartphone - sempre que precisar.'
  }
])

// Steps data
const steps = ref([
  {
    title: 'Crie sua Conta',
    description: 'Registre-se gratuitamente e configure seu perfil com suas preferências de jogo.'
  },
  {
    title: 'Encontre ou Crie',
    description: 'Procure mesas disponíveis ou crie a sua própria mesa para atrair jogadores.'
  },
  {
    title: 'Jogue e Divirta-se',
    description: 'Conecte-se com sua mesa, agende sessões e viva aventuras épicas!'
  }
])

// Methods
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.hero-section {
  background-attachment: fixed;
}

.feature-card {
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .hero-section {
    background-attachment: scroll;
  }
}
</style>

