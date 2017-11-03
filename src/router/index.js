import Vue from 'vue'
import Router from 'vue-router'
import ChemicalDetails from '@/pages/ChemicalDetails'
import ChemicalOverview from '@/pages/ChemicalOverview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/chemicals/:chemName',
      props: true,
      name: 'ChemicalDetails',
      component: ChemicalDetails
    },
    {
      path: '/',
      name: 'ChemicalOverview',
      component: ChemicalOverview
    }
  ]
})
