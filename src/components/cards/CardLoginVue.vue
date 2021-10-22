<template>
        <div class="row center-align card-login">
          <grid-vue size="s12 m12 l12">

            <div class="card">
              <div class="card-image valign-wrappe">
                <img class="activator" :src="LogoNew">
              </div>
              <div class="card-content valign-wrappe">
                  <slot name="cardloginCabecalho" />
              </div>
              <div class="card-action">
                  <slot name="cardloginConteudo" />
              </div>
            </div>

          </grid-vue>
        </div>
</template>

<script>
import GridVue from '@/components/layouts/GridVue'
import Logo from "@/assets/images/logo/logo-grande.png"
import LogoNew from "@/assets/images/logo/logo-new.png"

export default {
  name: 'CardLoginVue',
  components: {
      GridVue
  },
  props:[],
  data () {
    return {
      Logo : Logo,
      LogoNew : LogoNew
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card{
    border-radius: 15px 15px 15px 15px ;
    background-color: #ffffffd4 !important;
  }
  .card .card-action{
    border-radius: 0px 0px 15px 15px !important;
    background-color: transparent !important;
  }
  .card .card-content {
    background-color: transparent !important;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .card-image{
    border-radius: 15px 15px 0px 0px;
    text-align:center;
    background-color: #efefef;
  }

  .card .card-image img {
      display: unset !important;
      position: relative;
      left: 0;
      right: 0;
      top: 5px;
      bottom: 5px;
      width: 90%;
      height: auto;
      padding: 20px;
  }

  .card-login{
    width: 100% !important;
    margin-left: 0rem !important;
    margin-right: 0rem !important;
  }



  @media only screen and (max-width: 4000px) {
    .card-login{
      padding: 100px;
    }
  }
  @media only screen and (max-width: 1350px) {
    .card-login{
      padding: 50px;
    }
  }
  @media only screen and (max-width: 1100px) {
    .card-login{
      padding: 30px;
    }
  }
  @media only screen and (max-width: 700px) {
    .card-login{
      padding: 0px;
    }
  }

</style>
