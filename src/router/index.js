import Vue from 'vue'
import Router from 'vue-router'
import ChemicalDetails from '@/pages/ChemicalDetails'
import ChemicalOverview from '@/pages/ChemicalOverview'
import DisposalRecords from '@/pages/DisposalRecords'
import Dispose from '@/pages/Dispose'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/chemicals'
    },
    {
      path: '/chemicals/:chemName',
      props: true,
      name: 'ChemicalDetails',
      component: ChemicalDetails
    },
    {
      path: '/chemicals',
      name: 'ChemicalOverview',
      component: ChemicalOverview
    },
    {
      name: 'Dispose',
      path: '/dispose',
      component: Dispose
    },
    {
      name: 'DisposalRecords',
      path: '/disposalRecords',
      component: DisposalRecords
    }
  ]
})
