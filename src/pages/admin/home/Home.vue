<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin" class="breadcrumb">Home</router-link>
    </span>

    <span slot="indicadores">
      <div class="row">

        <card-button-vue size="s12 m6 l4" caminho="/admin/school/cadastrar" :imagem="ImagemColegio">
          <span slot="botao">Colégio Cadastrados</span>
          <span slot="descricao">{{qtColegiosCadastrados}}</span>
        </card-button-vue>

        <card-button-vue size="s12 m6 l4" caminho="admin/relatorio/acesso_plataforma" :imagem="ImagemAluno">
          <span slot="botao">Alunos Cadastrados</span>
          <span slot="descricao">{{qtAlunosCadastrados}}</span>
        </card-button-vue>

        <card-button-vue size="s12 m6 l4" caminho="admin/relatorio/aluno_video" :imagem="ImagemVideosAssistidos">
          <span slot="botao">Vídeos Assistidos</span>
          <span slot="descricao">{{qtVideosAssistidos}}</span>
        </card-button-vue>

      </div>
							
    </span>
  </admin-template>
</template>

<script>
import CardVideoVue from '@/components/cards/CardVideoVue'
import CardButtonVue from '@/components/cards/CardButtonVue'
import AdminTemplate from '@/templates/AdminTemplate'
import ImagemColegio from "@/assets/images/elements/campus.png"
import ImagemAluno from "@/assets/images/elements/aluno.png"
import ImagemVideosAssistidos from "@/assets/images/elements/pc-elearning.png"

export default {
  name: 'HomeAdmin',  

  components: {
    AdminTemplate,
    CardVideoVue,
    CardButtonVue
  },
  data () {
    return {
    ImagemColegio : ImagemColegio,
    ImagemAluno : ImagemAluno,
    ImagemVideosAssistidos : ImagemVideosAssistidos,
    isActive : false,
    qtColegiosCadastrados : '0',
    qtAlunosCadastrados : '0',
    qtVideosAssistidos : '0'
    }
  },
  created(){
    this.atualizaPagina();
  },
  mounted () {
    M.AutoInit()
  },
  methods: {
     atualizaPagina(){

        this.$http.all([
            this.$http.get(this.$urlAPI+`colegios`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}}),
            this.$http.get(this.$urlAPI+`usuarios/1`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}}),
            this.$http.get(this.$urlAPI+`colegio/videos/usuarios`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
            ]).then(this.$http.spread((qtColegios, qtAlunos, qtVideosAssistidos) => {
              if(qtColegios.data.status){
                this.$store.commit('setColegio',qtColegios.data.schools);
                this.qtColegiosCadastrados = qtColegios.data.schools.length;
              }
              if(qtAlunos.data.status){
                this.$store.commit('setUsuarioStudent',qtAlunos.data.usuarios);
                this.qtAlunosCadastrados = qtAlunos.data.usuarios.length;
              }
              if(qtVideosAssistidos.data.status){
                this.qtVideosAssistidos = qtVideosAssistidos.data.quantidade;
              }
            })).catch((e) => {
              alert("Servidor indisponível no momento, tente novamente mais tarde!");
              console.log("Erro na Comunicação com a API!");
            });
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

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

</style>
