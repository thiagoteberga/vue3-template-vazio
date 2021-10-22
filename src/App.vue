<template>
            <router-view/>
</template>

<script>
import { createApp } from 'vue'
import M from 'materialize-css'
import VueRouter from 'vue-router'
import { createStoreVuex } from './store'
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.js'

const store = createStoreVuex()

const app = createApp({ createApp })
app.config.globalProperties.$axios = axios;

export default {
  name: 'App',
  store: store,
  VueRouter,
  components: {
  },
  mounted () {
    M.AutoInit()
  },
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .body-span {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background-image: url("./assets/images/background/background.jpg");
  }

  .body-span-dark {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background-image: url("./assets/images/background/background-dark.jpg");
  }

  main {
    flex: 1 0 auto;
    margin-top: 20px;
  }

  .card.horizontal{
    border-radius: 15px;
  }

  a {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  .dropdown-content li>a, .dropdown-content li>span {
    color: #37474f !important;
  }

  @media only screen and (max-width: 1920px){
    .container {
      width: 80% !important;
    }
  }

  @media only screen and (max-width: 1400px){
    .container {
      width: 85% !important;
    }
  }

  @media only screen and (max-width: 993px){
    .container {
      width: 90% !important;
    }
  }

  @media only screen and (max-width: 601px){
    .container {
      width: 90% !important;
    }
  }
</style>
