
const Tab1 = { template: '<div>foo</div>' }
const Tab2 = { template: '<div>bar</div>' }


const routes = [
  { path: '/tab1', component: Tab1 },
  { path: '/tab2', component: Tab2 }
]


const router = new VueRouter({
  routes: routes
})


const app = new Vue({
  router
}).$mount('#app')
