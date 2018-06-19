import Vue from 'vue'
import Router from 'vue-router'
import ChemicalDetails from '@/pages/ChemicalDetails'
import ChemicalOverview from '@/pages/ChemicalOverview'
import DisposalRecords from '@/pages/DisposalRecords'
import Dispose from '@/pages/Dispose'
import AddChemical from '@/pages/AddChemical'
import SiteSettings from '@/pages/SiteSettings'

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
    },
    {
      name: 'AddChemical',
      path: '/addChemical',
      component: AddChemical
    },
    {
      name: 'SiteSettings',
      path: '/siteSettings',
      component: SiteSettings
    }
  ]
})
