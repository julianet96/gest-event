
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name:'home' },
      { path: 'eventDay/:id', component: () => import('pages/EventDay.vue'), name:'eventDay' },
      { path: 'event/:id', component: () => import('pages/Event.vue'), name:'event' },
      { path: 'loadingSheet/:id', component: () => import('pages/loadingSheet.vue'), name:'loadingSheet' },
      { path: 'events', component: () => import('pages/Events.vue'), name:'events'},
      { path: 'newEvent', component: () => import('pages/NewEvent.vue'), name:'NewEvent'},
      { path: 'equipments', component: () => import('pages/Equipment.vue'), name:'equipments'}
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
