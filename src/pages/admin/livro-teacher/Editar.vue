<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/book-teacher/cadastrar" class="breadcrumb">Gerenciar Livros do Professor</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <form v-on:submit.prevent="editar(bookTeacher.id)" enctype="multipart/form-data">
            <div class="input-field col s12">
              <i class="material-icons prefix">mode_edit</i>
              <input id="title" type="text" class="validate" maxlength="600" v-model="bookTeacher.title">
              <label for="title" class="active">Título</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">featured_play_list</i>
              <input id="description" type="text" class="validate" maxlength="600" v-model="bookTeacher.description">
              <label for="description" class="active">Descrição</label>
            </div>
            <div class="input-field col s12">
              <div class="file-field input-field">
                <div class="waves-effect btn teal darken-3">
                  <span>Alterar Arquivo</span>
                  <input type="file" id="link" v-on:change="salvaPdf">
                </div>
                <div class="file-path-wrapper">
                  <input id="linkdesc" class="file-path validate" type="text" placeholder="Insira um novo arquivo PDF">
                </div>
              </div>
            </div>
            <br>
            <div class="input-field col s12">
              <i class="material-icons prefix"></i>
              <label>
                <b>
                  Ativo?
                </b>
              </label>
            </div>
            <div class="input-field col s12">
              <!-- Switch -->
              <div class="switch">
                <i class="material-icons prefix"></i>
                <label>
                  Não
                  <input id="active" type="checkbox" v-model="bookTeacher.active">
                  <span class="lever"></span>
                  Sim
                </label>
              </div>
            </div>
            <div class="input-field col s12">
              <a class="waves-effect waves-light grey darken-4 btn visualizar-pdf" :href="urlAPIApostila+bookTeacher.link" target="_blank"><i class="material-icons left">search</i>Visualizar PDF</a>
            </div>
            <div class="input-field col s12" v-if="carregando">
              <progress-bar :size="percentualCarregado"></progress-bar>
            </div>

            <div class="right-align">
              <button class="btn waves-effect amber accent-4" type="submit">Salvar</button>
            </div>
          </form>
        </span>
      </card-edit-vue>
    </span>
  </admin-template>
</template>

<script>
import AdminTemplate from '@/templates/AdminTemplate'
import CardEditVue from '@/components/cards/CardEditVue.vue'
import ProgressBar from '@/components/progress/ProgressBar'

export default {
  name: 'EditLivroTeacher',  

  components: {
    AdminTemplate,
    CardEditVue,
    ProgressBar
  },
  data () {
    return {
    bookTeacher: {id: '', title:'', description:'', active:'', link:'', novolink:''},
    carregando: false,
    percentualCarregado: '',
    urlAPIApostila: this.$urlAPIApostila
    }
  },
  mounted () {
    M.AutoInit()
  },
  created () {
    this.atualizaPagina();
  },
  computed:{
    listaLivros(){
      return this.$store.getters.getLivro;
    }
  },
  methods: {
    atualizaPagina(){
      let idBookTeacherAlterar = this.$route.params.id; //ID Enviado Via Link
      let bookTeacherAlterar = this.$store.getters.getBookTeacherById(idBookTeacherAlterar);

      if(bookTeacherAlterar){
        this.bookTeacher.id = bookTeacherAlterar.id;
        this.bookTeacher.active = bookTeacherAlterar.active;
        this.bookTeacher.title = bookTeacherAlterar.title;
        this.bookTeacher.description = bookTeacherAlterar.description;
        this.bookTeacher.link = bookTeacherAlterar.link;
      }

    },

    salvaPdf(e){
      let pdfFile = e.target.files || e.dataTransfer.files;
      //e.target.files -> Quando é buscado pelo browser
      //e.dataTransfer.files -> Funcao arrasta e solta

      if(!pdfFile.length){
        return;
      } else{
        this.bookTeacher.novolink = pdfFile[0];
      }
    },

    editar(id){

      const headers = {
          "Content-Type": "multipart/form-data",
          "authorization":"Bearer "+this.$store.getters.getToken
      };

      const formData = new FormData();
      formData.append("id", this.bookTeacher.id);
      formData.append("title", this.bookTeacher.title);
      formData.append("description", this.bookTeacher.description);
      formData.append("active", this.bookTeacher.active == 1 ? '1' : '0' );
      formData.append("link", this.bookTeacher.novolink);
      // Send PUT request to laravel
      formData.append('_method', 'PUT');

      this.carregando = true;

      this.$http
        .post(this.$urlAPI+`teacher/livro/editar`, 
            formData,
            {
              "headers": headers,
              onUploadProgress: function( progressEvent ) {
              this.percentualCarregado = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
              }.bind(this)
            }
        )
        .then((response) => {

          console.log("Retorno Recebido da API!");

          if (response.data.status) {
            this.$store.commit('setBookTeacher',response.data.pdfs);
            M.toast({html: 'Livro atualizado com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/book-teacher/cadastrar');
            this.carregando = false;
            this.percentualCarregado = '0';
          } else if (response.data.status == false && response.data.validacao == true){
            for (let erro of Object.values(response.data.erros)) {
              M.toast({html:'Falha na Alteração: ' + erro, classes: 'deep-orange borda'});
            }
            this.carregando = false;
            this.percentualCarregado = '0';

          } else {
            M.toast({html: 'Erro desconhecido, tente novamente mais tarde!', classes: 'deep-orange borda'});
            this.carregando = false;
            this.percentualCarregado = '0';
          }
        })
        .catch((e) => {
          M.toast({html: 'Serviço indisponível no momento, tente novamente mais tarde!', classes: 'deep-orange borda'});
          this.carregando = false;
          this.percentualCarregado = '0';
        });

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .borda {
    padding: 25px;
  }
  .visualizar-pdf{
    width: 100% !important;
  }

</style>
