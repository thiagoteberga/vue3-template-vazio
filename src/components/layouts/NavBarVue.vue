<template>
  <span>
      <nav :class="color + ' altura-navbar'" role="navigation">
          <div class="nav-wrapper">
            
            <router-link id="logo-container" :to="url" class="brand-logo left valign-wrapper"> 
              <img class="logo-belvedere valign-wrapper" :src='LogoNew' />
            </router-link>
            <ul class="right hide-on-med-and-down">
              <slot name="itens-menu"/>
            </ul>

            <ul id="nav-mobile" class="sidenav">
              <slot name="itens-menu-mobile"/>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger right">
              <i class="material-icons">menu</i>
            </a>
          </div>
      </nav>
      <nav class="breadcrumb-navbar altura-breadcrumb"> 
            <div class="nav-wrapper altura-breadcrumb">
              <div class="col s12 altura-breadcrumb" style="padding-left: 25px;">
                <slot name="breadcrumb"/> 
              </div>
            </div>
      </nav>
  </span>
</template>

<script>
import LogoNew from "@/assets/images/logo/logo-new-branco.png"

export default {
  name: 'NavBarVue',
  props:['logo','url','color'],

  data () {
    return {
      LogoNew : LogoNew,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.blue-grey.darken-3 {
    background-color: #37474fe6 !important;
}

.logo-belvedere{
  padding: 8px;
  margin: 0px 0px 0px 10px;
  height: 100%;
  width: auto;
}

.brand-logo {
  height: 80px;
}

nav {
  background-color: #37474f;
  height: 45px;
  line-height: 45px;
}

.altura-navbar{
  height: 80px;
}

.altura-breadcrumb{
  background-color: transparent !important;
  height: 45px;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  text-shadow: rgba(0, 0, 0, 0.950) 1px 0px 3px;
}
.breadcrumb{
  font-size: 20px;
}

.material-icons {
  height:72px;
  display: inline-flex;
  vertical-align: top;
  margin-top: 8px;
}

i.right {
    margin-left: 12px !important;
}

.hide-on-med-and-down{
  height: 80px !important;
  line-height: 80px !important;
}

@media(max-width: 4000px){
  a {
    font-size:  19px;
  }
}

@media(max-width: 1450px){
  a {
    font-size:  15.5px;
  }
}

@media(max-width: 1280px){
  a {
    font-size:  15px;
  }
  .logo-belvedere{
    padding: 0px;
    margin: 12px 0px 12px 5px;
    height:auto;
    width:250px;
  }
}

@media(max-width: 1190px){
  a {
    font-size:  15px;
  }
  .logo-belvedere{
    padding: 0px;
    margin: 17px 0px 17px 5px;
    height:auto;
    width:200px;
  }
}

@media(max-width: 1150px){
  a {
    font-size:  15px;
  }
  .logo-belvedere{
    padding: 0px;
    margin: 17px 0px 17px 5px;
    height:0px;
    width:0px;
  }
}

@media(max-width: 992px){
  .breadcrumb-navbar{
    display: none;
  }
  a {
    font-size:  15px;
  }
.logo-belvedere{
  padding: 8px;
  margin: 0px 0px 0px 0px;
  height: 100%;
  width: auto;
}
}

.sidenav-overlay{opacity: 0 !important;}

</style>