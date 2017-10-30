import Vue from 'vue'
import Router from 'vue-router'
import ChemicalDetails from '@/pages/ChemicalDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ChemicalDetails',
      component: ChemicalDetails
    }
  ]
})
