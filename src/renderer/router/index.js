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
      component: ToDo,
      meta: {
        name: '待办'
      }
    },
    {
      path: '/log',
      name: 'log',
      component: Log,
      meta: {
        name: '日志'
      }
    },
    {
      path: '/note',
      name: 'note',
      component: Note,
      meta: {
        name: '笔记'
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: {
        name: '设置'
      }
    }
  ]
})
