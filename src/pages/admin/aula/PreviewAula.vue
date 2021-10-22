<template>
  <admin-template>
    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/aula/cadastrar" class="breadcrumb">Gerenciar Videoaula</router-link>
          <router-link to="#" class="breadcrumb">Preview {{aula.class_title}}</router-link>
    </span>
    <span slot="indicadores">
        <grid-vue size="s12 m12 l12">
          <div class="video-tela">
            <card-detalhe-vue-action-invisible>
              <span slot="slot1">
                <div class="right-align">
                  <router-link to="/admin/aula/cadastrar/" class="waves-effect waves-light btn grey darken-2"><i class="material-icons left">close</i></router-link>
                </div>
                <h5 style="padding: 0 20px 0 20px;">{{caminho}} - <b> {{aula.class_title}}</b>: {{aula.video_title}}</h5>

                <hr>
                <h6 style="padding: 0 20px 0 20px;"><b>Descrição:</b> {{aula.description}}.</h6>
                
              </span>
              <span slot="slot2">
                <div class="row" >
                  <card-video-vue  :srcVideo="aula.link" modalName="modal">

                  </card-video-vue>
                </div>
              </span>
            </card-detalhe-vue-action-invisible>
          </div>
         </grid-vue>
    </span>


  </admin-template>
</template>

<script>
import CardDetalheVueActionInvisible from '@/components/cards/CardDetalheVueActionInvisible'
import GridVue from '@/components/layouts/GridVue'
import CardButtonVerticalVueVideos from '@/components/cards/CardButtonVerticalVueVideos'
import AdminTemplate from '@/templates/AdminTemplate'
import CardVideoVue from '@/components/cards/CardVideoVue'

export default {
  name: 'PreviewAula',
  components: {
    CardDetalheVueActionInvisible,
    GridVue,
    AdminTemplate,
    CardButtonVerticalVueVideos,
    CardVideoVue
  },
  methods: {
    volta(){
      window.history.back();
    }
  },
  data () {
    return {
      livro : [],
      aula: [],
      caminho: ''
    }
  },
  created(){
    this.atualizaPagina();
  },
  watch:{
    '$route':'atualizaPagina'
  },
  methods: {
    atualizaPagina(){
        let idAula = this.$route.params.id; //ID Enviado Via Link

        this.$http
        .get(this.$urlAPI+`aulas/`+idAula, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista Aulas!");
          if(response.data.status){
            this.$store.commit('setAula',response.data.aulas);
            const aulaCompleta = response.data.aulas[0];
            console.log(aulaCompleta)
            this.livro = aulaCompleta.licao.unidade.livro; //Pegar a descricao do Livro
            this.aula = aulaCompleta; //Pegar a descricao da Aula
            this.caminho = aulaCompleta.licao.unidade.livro.title + ' - ' + aulaCompleta.licao.unidade.title + ' - ' + aulaCompleta.licao.title;
          }
        })
        .catch((e) => {
          console.log(e)
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });
    }
  },
  computed:{
    listaUnidades(){
      return this.$store.getters.getUnidade;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  @media only screen and (max-width: 7680px){
    .row{
      margin:0 50px 0 50px !important;
      padding: 5px;
    }

    .video-tela{
      margin:0 200px 0 200px !important;
    }
  }

  @media only screen and (max-width: 1250px){
    .row{
      margin:0 20px 0 20px !important;
      padding: 5px;
    }

    .video-tela{
      margin:0 80px 0 80px !important;
    }
  }

  @media only screen and (max-width: 900px){
    .row{
      margin:0px 0px 0px 0px !important;
      padding: 5px;
    }

    .video-tela{
      margin:0px 0px 0px 0px !important;
    }
  }

  .student h5{
    margin-block-start: 0 !important;
    margin-block-end: 20px !important;
    text-shadow: rgba(0, 0, 0, 0.418) 2px 3px 2px;
    color: #ffffff !important;
  }

  .student h3{
    margin-block-start: 0 !important;
    margin-block-end: 20px !important;
    text-shadow: rgba(0, 0, 0, 0.418) 2px 3px 2px;
    color: #ffffff !important;
  }

  .card-stacked .card-action {
    border-top: 0px;
    border-radius: 0px 20px 20px 0px;
    color: #455a64;
  }
  i.left {
    margin-right: 0px !important;
  }
  .btn {
    border-radius: 10px 10px 10px 10px
  }
  h5 {
    margin: 0 0 .656rem 0 !important;
  }
</style>
