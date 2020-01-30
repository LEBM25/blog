import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueMoment from "vue-moment";
import moment from "moment";
import "moment/locale/es";

import Login from "./components/Login.vue";
import UserList from "./components/UserList.vue";
import PostList from "./components/PostList.vue";
import ViewPost from "./components/ViewPost.vue";
import RegisterUser from "./components/RegisterUser.vue";
import NewPost from "./components/NewPost.vue";
import AdminPost from "./components/adminPost.vue";
import UserProfile from "./components/userProfile.vue";

require('./assets/css/register.css')
require('./assets/css/comment.css')
require('./assets/css/profile.css')
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueMoment,{moment})

const store = new Vuex.Store({
  state : {
    token : false,
    nivel : false,
    userName : null,
  },
  mutations:{
    updateToken(state,value){
      state.token = value.token
      state.nivel = value.nivel
      state.userName = value.userName
    }
  }
})


const routes = [
  { path: "/", component: PostList },
  { path: "/login", component: Login },
  { path: "/home", component: PostList },
  { path: "/UserList", component: UserList },
  { path: "/PostList", component: PostList },
  { path: "/ViewPost/:id?", component: ViewPost },
  { path: "/RegisterUser", component: RegisterUser },
  { path: "/NewPost", component: NewPost } ,
  { path: "/AdminPost", component: AdminPost } ,
  { path: "/UserProfile/:id?", component: UserProfile }   
  
];

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
