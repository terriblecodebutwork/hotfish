import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PostView from './views/PostView.vue'
import QueryView from './views/QueryView.vue'
import MetaView from './views/MetaView.vue'
import NewsView from './views/NewsView.vue'
import PostCommentView from './views/PostCommentView.vue'
import CommentsView from './views/CommentsView.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/post",
      name: 'post',
      component: PostView
    },
    {
      path: "/postNews",
      name: 'postNews',
      component: MetaView
    },
    {
      path: "/comments/:nodeName/:res/:nodeTxid",
      name: 'listComments',
      props: true,
      component: CommentsView
    },
    {
      path: "/postComment/:id",
      name: 'postComment',
      props: true,
      component: PostCommentView
    },
    {
      path: "/news",
      name: 'news',
      props: true,
      component: NewsView
    },
    {
      path: "/q/:title/:query/:from",
      name: 'query',
      props: true,
      component: QueryView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
