import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SignInView from '@/views/SignInView.vue'
import HomeView from '@/views/HomeView.vue'
import GameListContentView from '@/views/GameListContentView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/my-lists',
      name: 'my-lists',
      component: HomeView
    },
    {
      path: '/my-lists/:id',
      name: 'list',
      component: GameListContentView
    }
  ]
})

export default router
