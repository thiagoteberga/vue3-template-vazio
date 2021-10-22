<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/podcast/cadastrar" class="breadcrumb">Gerenciar Podcasts</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <form v-on:submit.prevent="editar(podcast.id)" enctype="multipart/form-data">
            <div class="input-field col s12">
              <select :value="podcast.book_id" v-model="podcast.book_id">
                <option value="" disabled selected>Selecione um Livro</option>
                <option v-for="item in listaLivros" :key="item.id" :value="item.id">{{item.title}}</option>
              </select>
              <label>Livro</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">mode_edit</i>
              <input id="title" type="text" class="validate" maxlength="600" v-model="podcast.title">
              <label for="title" class="active">Título</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">featured_play_list</i>
              <input id="description" type="text" class="validate" maxlength="600" v-model="podcast.description">
              <label for="description" class="active">Descrição</label>
            </div>
            <div class="input-field col s12">
              <div class="file-field input-field">
                <div class="waves-effect btn teal darken-3">
                  <span>Alterar Arquivo</span>
                  <input type="file" id="link" v-on:change="salvaPodcast">
                </div>
                <div class="file-path-wrapper">
                  <input id="linkdesc" class="file-path validate" type="text" placeholder="Insira um novo arquivo MP3">
                </div>
              </div>
            </div>
            <div class="input-field col s12">
              <a class="waves-effect waves-light grey darken-4 btn visualizar-pdf" :href="urlAPIPodcast+podcast.link" target="_blank"><i class="material-icons left">search</i>Escutar Podcast</a>
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
  name: 'EditPodcast',  

  components: {
    AdminTemplate,
    CardEditVue,
    ProgressBar
  },
  data () {
    return {
    podcast:{id: '', book_id:'', title:'', description:'', link:'', novolink:''},
    carregando: false,
    percentualCarregado: '',
    urlAPIPodcast: this.$urlAPIPodcast
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
      let idPodcastAlterar = this.$route.params.id; //ID Enviado Via Link
      let podcastAlterar = this.$store.getters.getPodcastEditById(idPodcastAlterar);

      if(podcastAlterar){
        this.podcast.id = podcastAlterar.id;
        this.podcast.book_id = podcastAlterar.book_id;
        this.podcast.title = podcastAlterar.title;
        this.podcast.description = podcastAlterar.description;
        this.podcast.link = podcastAlterar.link;
      }

    },

    salvaPodcast(e){
      let podcastFile = e.target.files || e.dataTransfer.files;
      //e.target.files -> Quando é buscado pelo browser
      //e.dataTransfer.files -> Funcao arrasta e solta

      if(!podcastFile.length){
        return;
      } else{
        this.podcast.novolink = podcastFile[0];
      }
    },

    editar(id){

      const headers = {
          "Content-Type": "multipart/form-data",
          "authorization":"Bearer "+this.$store.getters.getToken
      };

      const formData = new FormData();
      formData.append("id", this.podcast.id);
      formData.append("book_id", this.podcast.book_id);
      formData.append("title", this.podcast.title);
      formData.append("description", this.podcast.description);
      formData.append("link", this.podcast.novolink);
      // Send PUT request to laravel
      formData.append('_method', 'PUT');

      this.carregando = true;

      this.$http
        .post(this.$urlAPI+`podcast/editar`, 
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
            this.$store.commit('setPodcast',response.data.pdfs);
            M.toast({html: 'Podcast atualizado com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/podcast/cadastrar');
          } else if (response.data.status == false && response.data.validacao == true){
            console.log("Erro de Validacao");
            for (let erro of Object.values(response.data.erros)) {
              M.toast({html:'Falha na Alteração: ' + erro, classes: 'deep-orange borda'});
            }

          } else {
            M.toast({html: 'Erro desconhecido, tente novamente mais tarde!', classes: 'deep-orange borda'});
          }
        })
        .catch((e) => {
          M.toast({html: 'Serviço indisponível no momento, tente novamente mais tarde!', classes: 'deep-orange borda'});
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
