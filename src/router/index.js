import { createApp } from 'vue'
/* https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/ */
import { createWebHistory, createRouter } from "vue-router";
//import axios from "axios";

//Login
import Login from '@/pages/login/Login'

//Admin
import HomeAdmin from '@/pages/admin/home/Home'
import CadUserAdmin from '@/pages/admin/user-admin/Cadastrar'
import EditUserAdmin from '@/pages/admin/user-admin/Editar'

createApp.use(createRouter)

const router = new createRouter({
  base: process.env.ROUTER_BASE,
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    // Avoid Erros
    {
      path: '/admin/home',
      redirect: '/admin',
    },
    // Login
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // Home Admin
    {
      path: '/admin',
      name: 'HomeAdmin',
      component: HomeAdmin,
      meta: {
        requiresAuth: true
      }
    },
    // Gerenciar Administradores
    {
      path: '/admin/user-admin/cadastrar',
      name: 'CadUserAdmin',
      component: CadUserAdmin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/user-admin/editar/:id',
      name: 'EditUserAdmin',
      component: EditUserAdmin,
      meta: {
        requiresAuth: true
      }
    },
    // Admin Perfil
    {
      path: '/admin/perfil',
      name: 'EditAdminPerfil',
      component: EditAdminPerfil,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // this route requires auth, check if logged in
  // if not, redirect to login page.
  if (to.matched.some(record => record.meta.requiresAuth)) {

    /*
    //Retorna o Valor do Cookie
    function getCookie(c_name) {
      if (document.cookie.length > 0) {
          let c_start = document.cookie.indexOf(c_name + "=");
          if (c_start != -1) {
              c_start = c_start + c_name.length + 1;
              let c_end = document.cookie.indexOf(";", c_start);
              if (c_end == -1) {
                  c_end = document.cookie.length;
              }
              return unescape(document.cookie.substring(c_start, c_end));
          }
      }
      return "";
    }

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogadoSessao'));
    let token = 'deslogado';

    if(usuarioLogado && getCookie("loginStatusBelvedere") == 'loggedin'){
      token = usuarioLogado.token;
    } else {
      localStorage.clear(); //Limpa o localStorage
      document.cookie = "loginStatusBelvedere=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; //Limpa o Cookie
    }

    axios.get(`http://127.0.0.1:8000/api/check`, {"headers":{"authorization":"Bearer "+token}})

    .then((response) => {
      if (response.data.logado) {
        usuarioSession = true;
        next()
      } else if (!response.data.logado){
        usuarioSession = false;
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    })
    .catch((e) => {
      usuarioSession = false;
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    });*/

    next() //Quando nao valida passa direto

  } else {
    next() //Quando nao valida passa direto
  }
});

export default router;
