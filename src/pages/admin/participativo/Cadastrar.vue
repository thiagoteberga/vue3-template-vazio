<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/video/participativo/cadastrar" class="breadcrumb">Gerenciar Aprendizado Participativo</router-link>
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
                <th>Título</th>
                <th>Descrição</th>
                <th>Link</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in listaVideos.data" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.title}}</td>
                <td>{{item.description}}</td>
                <td>{{item.link}}</td>
                <td>
                  <router-link :to="'/admin/video/participativo/editar/'+item.id">
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
          <!-- <span v-for="item in listaVideos.links" :key="item.label + Math.random()"> -->
          <span v-for="(item, index) in listaVideos.links" :key="index">
            <li v-if="item.label == '&laquo; Anterior' && item.url != null" class="waves-effect"><a v-on:click="goToPage(item.url || 'null')"><i class="material-icons">chevron_left</i></a></li>
            <li v-if="item.label == '&laquo; Anterior' && item.url == null" class="disabled"><a v-on:click="goToPage(item.url || 'null')"><i class="material-icons">chevron_left</i></a></li>
            <li v-if="item.label == 'Próximo &raquo;' && item.url != null" class="waves-effect"><a v-on:click="goToPage(item.url || 'null')"><i class="material-icons">chevron_right</i></a></li>
            <li v-if="item.label == 'Próximo &raquo;' && item.url == null" class="disabled"><a v-on:click="goToPage(item.url || 'null')"><i class="material-icons">chevron_right</i></a></li>
            <li v-if="item.active" class="waves-effect active"><a v-on:click="goToPage(item.url || 'null')">{{item.label}}</a></li>
            <li v-if="item.active == false && item.label != '&laquo; Anterior' && item.label != 'Próximo &raquo;'" class="waves-effect"><a v-on:click="goToPage(item.url || 'null')">{{item.label}}</a></li>
          </span>          
        </span>

        <span slot="inputs">
          <div class="input-field col s12">
            <i class="material-icons prefix">mode_edit</i>
            <input id="title" type="text" class="validate" maxlength="100" v-model="video.title">
            <label for="title">Título</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="description" type="text" class="validate" maxlength="600" v-model="video.description">
            <label for="description">Descrição</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">language</i>
            <input id="link" type="text" class="validate" maxlength="200" v-model="video.link">
            <label for="link">Link</label>
          </div>
          <div class="right-align">
            <button class="btn waves-effect amber accent-4" v-on:click="cadastro()">Cadastrar</button>
          </div>
        </span>
      </card-tab-vue>
							
    </span>
  </admin-template>
</template>

<script>
import AdminTemplate from '@/templates/AdminTemplate'
import CardTabVue from '@/components/cards/CardTabVue'

export default {
  name: 'CadVideoParticipativo',  

  components: {
    AdminTemplate,
    CardTabVue
  },
  data () {
    CardTabVue
    return {
      video:{category_id:'', title:'', description:'', link:'', active:true},
    }
  },
  mounted () {
    M.AutoInit()
  },
  methods: {

    atualizaPagina(){
        this.$http
        .get(this.$urlAPI+`videos/paginada/2`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista Videos!");
          if(response.data.status){
            this.$store.commit('setVideoParticipativo',response.data.videos);
          }
        })
        .catch((e) => {
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });
    },
    
    goToPage($pagina){
        if ($pagina == 'null') {
          return;
        }
        this.$http
        .get($pagina, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista de Videos Participativos!");
          if(response.data.status){
            this.$store.commit('setVideoParticipativo',response.data.videos);
          }
        })
        .catch((e) => {
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });
    },

    cadastro(){
      this.$http.post(this.$urlAPI+`video/cadastro`, {
                      category_id: 2,
                      title: this.video.title,
                      description: this.video.description,
                      link: this.video.link,
                      active: true
                    },
                    {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setVideoParticipativo',response.data.videos);
              M.toast({html: 'Video cadastrado com sucesso!', classes: 'teal darken-1 borda'});
              var elem = document.querySelector('.tabs'); 
              var instance = M.Tabs.getInstance(elem);
              instance.select('tab1');

          }else if(response.data.status == false && response.data.validacao == true){
              console.log('Erro de Validacao');
              for (let erro of Object.values(response.data.erros)){
                M.toast({html: erro, classes: 'deep-orange accent-4 borda'});
              }
              
          }else{
              M.toast({html: 'Erro no cadastro, tente novamente mais tarde!', classes: 'deep-orange accent-4 borda'});
          }
      })
      .catch(e => {
        M.toast({html: 'Servidor indisponível no momento, tente novamente mais tarde!!', classes: 'deep-orange accent-4 borda'});
        console.log("Erro na Comunicação com a API!");
      })

    },
    deletar(id){

      this.$http.delete(this.$urlAPI+`video/delete/`+id, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setVideoParticipativo',response.data.videos);
              M.toast({html: 'Video excluído com sucesso!', classes: 'teal darken-1 borda'});
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
    listaVideos(){
      return this.$store.getters.getVideoParticipativo;
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
