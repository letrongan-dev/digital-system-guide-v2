import Vue from 'vue'
import Router from 'vue-router'
import CompMain from '../components/ComponentMain.vue'
import CompManage from '../components/ComponentManage.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CompVideo from '../components/ComponentVideo.vue'

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/video',
      name: 'CompVideo',
      component: CompVideo
    },
    {
      path: '/manage-guide-video',
      name: 'CompManage',
      component: CompManage
    },
    {
      path: '/',
      name: 'CompMain',
      component: CompMain
    }
  ]
})
