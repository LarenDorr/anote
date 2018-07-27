import Vue from 'vue'
import Router from 'vue-router'
import ToDo from '@/views/ToDo.vue'
import Log from '@/views/Log.vue'
import Note from '@/views/Note.vue'
import Setting from '@/views/Setting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/todo'
    },
    {
      path: '/todo',
      name: 'todo',
      component: ToDo
    },
    {
      path: '/log',
      name: 'log',
      component: Log
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    }
  ]
})
