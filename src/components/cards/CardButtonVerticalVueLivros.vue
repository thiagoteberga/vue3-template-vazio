<template>
    
      <div class="row row-principal center-align">
        
        <!-- COLUNA LIVRO -->
        <div :class="'box card-margem col s6 m6 l7'">
          <div class="box card radius-livro">
            <div class="valign-wrapper card-image">
              <img class = "img-card" :src="imagem">
            </div>
            <!-- 
            <div class="card-stacked">
              <div class="card-action center-align">
                <h6><b><slot class="btn-card" name="botao" /></b></h6>
              </div>
            </div>
            -->
          </div>
        </div>

        <!-- COLUNA OPCOES -->
        <div :class="'box card-margem col s6 m6 l5 max-horizontal'">
          
          <router-link :to="caminhoVideoaula">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-action valign-wrapper">
                  <h6 class="center-align">Videoaula</h6>
                </div>
              </div>
            </div>
          </router-link>

          <router-link :to="caminhoPodcast">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-action center-align valign-wrapper">
                  <h6 class="center-align">Podcasts</h6>
                </div>
              </div>
            </div>
          </router-link>

          <router-link :to="caminhoApostila">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-action center-align valign-wrapper">
                  <h6 class="center-align">Apostila</h6>
                </div>
              </div>
            </div>
          </router-link>

        </div>
        

      </div>
</template>

<script>
import GridVue from '@/components/layouts/GridVue'
export default {
  name: 'CardButtonVerticalVueLivros',
  props:['caminhoVideoaula','caminhoPodcast','caminhoApostila','imagem'],
  components: {
    GridVue
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  /*
  .horizontal{
    background-color: #ffffff9e;
  }
  */

  @media only screen and (max-width: 7680px){
    .row-principal{
      margin:5px;
      height:640px;
    }
    .horizontal{
      border-radius: 0px 20px 20px 0px !important;
      height: 110px;
    }
    h6 {
        margin: .46rem 0 .46rem 0;
        width: 100%;
        font-weight: bold;
        font-size: 45px;
        color: #37474f;
    }
    .box{
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        /*justify-content: space-between !important;*/
    }
  }

  @media only screen and (max-width: 1450px){
    .row-principal{
      margin:5px;
      height:450px;
    }
    .horizontal{
      border-radius: 0px 20px 20px 0px !important;
      height: 95px;
    }
    h6 {
        margin: 0 0 0 0;
        width: 100%;
        font-weight: bold;
        font-size: 38px;
        color: #37474f;
    }
    .box{
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      /*justify-content: space-between !important;*/
    }
  }

  @media only screen and (max-width: 1110px){
    .row-principal{
      margin:5px;
      height:500px;
    }
    .horizontal{
      border-radius: 0px 20px 20px 0px !important;
      height: 110px;
    }
    h6 {
        margin: .46rem 0 .46rem 0;
        width: 100%;
        font-weight: bold;
        font-size: 40px;
        color: #37474f;
    }
    .box{
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      /*justify-content: space-between !important;*/
    }
  }

  @media only screen and (max-width: 993px){
    .row-principal{
      margin:5px;
      height:500px;
    }
    .horizontal{
      border-radius: 0px 20px 20px 0px !important;
      height: 150px;
    }
    h6 {
        margin: .46rem 0 .46rem 0;
        width: 100%;
        font-weight: bold;
        font-size: 40px;
        color: #37474f;
    }
    .box{
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
    }
  }

  @media only screen and (max-width: 601px){
    .row-principal{
      margin:5px;
      height:300px;
    }
    .horizontal{
      border-radius: 0px 20px 20px 0px !important;
      height: 90px;
    }
    h6 {
        margin: .46rem 0 .46rem 0;
        width: 100%;
        font-weight: bold;
        font-size: 30px;
        color: #37474f;
    }
    .box{
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
    }
  }



.card-image{
  height: 100%;
}

.img-card{
  height: auto;
  max-height: 100%;
  width: auto;
  max-width: 100%;
  padding: 10px 10px 10px 10px;
  border-radius: 20px 0px 0px 20px !important;
}

.horizontal:hover{
        transform: scale(1.03);
        transition: 0.3s;
}

.card-margem {
  padding: 0px 5px 0px 5px;
}

.card {
  margin: .3rem 0 .3rem 0 !important;
  background-color: #ffffffd4 !important;
}

.card .card-action a{
    color:#455a64 !important;
}

.card-stacked .card-action{
  color:#5884c9 !important;
  height: 100% !important;
  vertical-align: middle;
}

.radius-livro{
    border-radius: 20px 0px 0px 20px !important;
}
</style>
