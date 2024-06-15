import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KurseDetail from "@/components/KurseDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/allekurse',
      name: 'allekurse',
      component: () => import('../views/AlleKurseView.vue')
    },
    {
      path: '/kalender',
      name: 'kalender',
      component: () => import('../views/MeinKalenderView.vue')
    },
    {
      path: '/:name',
      name:'detail',
      component: KurseDetail,
      props:true
    }
  ]
})

export default router
