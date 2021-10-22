<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/podcast/cadastrar" class="breadcrumb">Gerenciar Podcasts</router-link>
    </span>

    <span slot="indicadores">
      <card-tab-vue
        consultar = 'Consultar'
        cadastrar = 'Cadastrar'
        backpage = 'disabled'
        nextpage = 'waves-effect'>
        <span slot="tabela">
          <table class="highlight responsive-table">
          
            <thead>
              <tr>
                <th>ID</th>
                <th>Livro</th>
                <th>Título</th>
                <th>Descrição</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in listaPodcasts.data" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.livro.title}}</td>
                <td>{{item.title}}</td>
                <td>{{item.description}}</td>
                <td>
                  <router-link :to="'/admin/podcast/editar/'+item.id">
                    <button class="btn waves-effect waves-light amber darken-3" name="edit">
                      <i class="material-icons center">create</i>
                    </button>
                  </router-link>
                </td>
                <td>
                  <button class="btn waves-effect waves-light red darken-4" type="button" name="delete" v-on:click="deletar(item.id)">
                    <i class="material-icons center">delete</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </span>

        <span slot="pagination">
          <!-- <span v-for="item in listaLivros.links" :key="item.label + Math.random()"> -->
          <span v-for="(item, index) in listaPodcasts.links" :key="index">
            <li v-if="item.label == '&laquo; Anterior' && item.url != null" class="waves-effect"><a v-on:click="goToPage(item.url || 'null')"><i class="material-icons">chevron_left</i></a></li>
            <li v-if="item.label == '&laquo; Anterior' && item.url == null" class="disabled"><a v-on:click="goToPage(item.url || 'null')"><i class="material-icons">chevron_left</i></a></li>
            <li v-if="item.label == 'Próximo &raquo;' && item.url != null" class="waves-effect"><a v-on:click="goToPage(item.url || 'null')"><i class="material-icons">chevron_right</i></a></li>
            <li v-if="item.label == 'Próximo &raquo;' && item.url == null" class="disabled"><a v-on:click="goToPage(item.url || 'null')"><i class="material-icons">chevron_right</i></a></li>
            <li v-if="item.active" class="waves-effect active"><a v-on:click="goToPage(item.url || 'null')">{{item.label}}</a></li>
            <li v-if="item.active == false && item.label != '&laquo; Anterior' && item.label != 'Próximo &raquo;'" class="waves-effect"><a v-on:click="goToPage(item.url || 'null')">{{item.label}}</a></li>
          </span>          
        </span>

        <span slot="inputs">
          <form v-on:submit.prevent="cadastro()" enctype="multipart/form-data">
            <div class="input-field col s12">
              <select v-model="podcast.book_id">
                <option value="" disabled selected>Selecione um Livro</option>
                <option v-for="item in listaLivros" :key="item.id" :value="item.id">{{item.title}}</option>
              </select>
              <label>Livro</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">mode_edit</i>
              <input id="title" type="text" class="validate" maxlength="100" v-model="podcast.title">
              <label for="title">Título</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">featured_play_list</i>
              <input id="description" type="text" class="validate" maxlength="600" v-model="podcast.description">
              <label for="description">Descrição</label>
            </div>
            <div class="input-field col s12">
              <div class="file-field input-field">
                <div class="waves-effect btn teal darken-3">
                  <span>Arquivo</span>
                  <input type="file" id="link" v-on:change="salvaPodcast">
                </div>
                <div class="file-path-wrapper">
                  <input id="linkdesc" class="file-path validate" type="text" placeholder="Insira um arquivo PDF">
                </div>
              </div>
            </div>
            <div class="input-field col s12" v-if="carregando">
              <progress-bar :size="percentualCarregado"></progress-bar>
            </div>
            <div class="right-align">
              <button class="btn waves-effect amber accent-4" type="submit">Cadastrar</button>
            </div>
          </form>
        </span>
      </card-tab-vue>
							
    </span>
  </admin-template>
</template>

<script>
import AdminTemplate from '@/templates/AdminTemplate'
import CardTabVue from '@/components/cards/CardTabVue'
import ProgressBar from '@/components/progress/ProgressBar'

export default {
  name: 'CadPodcast',  

  components: {
    AdminTemplate,
    CardTabVue,
    ProgressBar
  },
  data () {
    CardTabVue
    return {
    podcast:{book_id:'', title:'', description:'', link:''},
    carregando: false,
    percentualCarregado: ''
    }
  },
  mounted () {
    M.AutoInit()
  },
  methods: {
    atualizaPagina(){
        this.$http
        .get(this.$urlAPI+`podcasts/paginada`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista!");

          if(response.data.status){
            this.$store.commit('setPodcast',response.data.podcasts);
          }
        })
        .catch((e) => {
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });

        //Livros
        this.$http
        .get(this.$urlAPI+`livros`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista dos Livros!");

          if(response.data.status){
            this.$store.commit('setLivro',response.data.livros);
          }
        })
        .catch((e) => {
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });
    },

    salvaPodcast(e){
      let podcastFile = e.target.files || e.dataTransfer.files;
      //e.target.files -> Quando é buscado pelo browser
      //e.dataTransfer.files -> Funcao arrasta e solta

      if(!podcastFile.length){
        return;
      } else{
        this.podcast.link = podcastFile[0];
      }
    },
    
    goToPage($pagina){
        if ($pagina == 'null') {
          return;
        }
        this.$http
        .get($pagina, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista Podcasts!");
          if(response.data.status){
            this.$store.commit('setPodcast',response.data.podcasts);
          }
        })
        .catch((e) => {
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });
    },

    cadastro(){

      const headers = {
          "Content-Type": "multipart/form-data",
          "authorization":"Bearer "+this.$store.getters.getToken
      };

      const formData = new FormData();
      formData.append("book_id", this.podcast.book_id);
      formData.append("title", this.podcast.title);
      formData.append("description", this.podcast.description);
      formData.append("link", this.podcast.link);

      this.carregando = true;
      //this.percentualCarregado = '50';

      this.$http.post(this.$urlAPI+`podcast/cadastro`,
                      formData,
                      {
                        "headers": headers,
                        onUploadProgress: function( progressEvent ) {
                        this.percentualCarregado = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
                        }.bind(this)
                      }
                      )   
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setPodcast',response.data.podcasts);
              M.toast({html: 'Podcast cadastrado com sucesso!', classes: 'teal darken-1 borda'});
              var elem = document.querySelector('.tabs'); 
              var instance = M.Tabs.getInstance(elem);
              instance.select('tab1');

              this.carregando = false;
              this.percentualCarregado = '0'

          }else if(response.data.status == false && response.data.validacao == true){
              console.log('Erro de Validacao');
              for (let erro of Object.values(response.data.erros)){
                M.toast({html: erro, classes: 'deep-orange accent-4 borda'});
              }
              this.carregando = false;
              this.percentualCarregado = '0'
              
          }else{
              M.toast({html: 'Erro no cadastro, tente novamente mais tarde!', classes: 'deep-orange accent-4 borda'});
              this.carregando = false;
              this.percentualCarregado = '0'
          }
      })
      .catch(e => {
        M.toast({html: 'Servidor indisponível no momento, tente novamente mais tarde!!', classes: 'deep-orange accent-4 borda'});
        console.log("Erro na Comunicação com a API!");
        this.carregando = false;
        this.percentualCarregado = '0'
      })

    },
    deletar(id){

      this.$http.delete(this.$urlAPI+`podcast/delete/`+id, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setPodcast',response.data.podcasts);
              M.toast({html: 'Podcast excluído com sucesso!', classes: 'teal darken-1 borda'});
          }else if(response.data.status == false && response.data.validacao == true){
              console.log('Erro de Validacao');
              for (let erro of Object.values(response.data.erros)){
                M.toast({html: erro, classes: 'deep-orange accent-4 borda'});
              }
              
          }else{
              M.toast({html: 'Erro a exclusão, tente novamente mais tarde!', classes: 'deep-orange accent-4 borda'});
          }
      })
      .catch(e => {
        M.toast({html: 'Servidor indisponível no momento, tente novamente mais tarde!!', classes: 'deep-orange accent-4 borda'});
        console.log("Erro na Comunicação com a API!");
      })

    },
  },
  created(){
    this.atualizaPagina();
  },
  computed:{
    listaPodcasts(){
      return this.$store.getters.getPodcast;
    },
    listaLivros(){
      return this.$store.getters.getLivro;
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.borda {
  padding: 25px;
}

</style>
