<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/aula/cadastrar" class="breadcrumb">Gerenciar Videoaula</router-link>
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
                <th>Unidade</th>
                <th>Lição</th>
                <th>Aula</th>
                <th>Título</th>
                <th>Ativo</th>
                <th>Preview</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in listaAulas.data" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.licao.unidade.livro.title}}</td>
                <td>{{item.licao.unidade.title}}</td>
                <td>{{item.licao.title}}</td>
                <td>{{item.class_title}}</td>
                <td>{{item.video_title}}</td>
                <td>{{item.active == 1 ? 'Sim' : 'Não'}}</td>
                <td>
                  <router-link :to="'/admin/aula/preview/'+item.id">
                    <button class="btn waves-effect waves-light blue-grey darken-2" name="edit">
                      <i class="material-icons center">visibility</i>
                    </button>
                  </router-link>
                </td>
                <td>
                  <router-link :to="'/admin/aula/editar/'+item.id">
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
          <!-- <span v-for="item in listaAulas.links" :key="item.label + Math.random()"> -->
          <span v-for="(item, index) in listaAulas.links" :key="index">
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
            <select v-model="aula.lesson_id">
              <option value="" disabled selected>Selecione uma Lição</option>
              <option v-for="item in listaLicoes" :key="item.id" :value="item.id">{{item.unidade.livro.title}} - {{item.unidade.title}} - {{item.title}}</option>
            </select>
            <label>Lição</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">mode_edit</i>
            <input id="nomeaula" type="text" class="validate" maxlength="100" v-model="aula.class_title">
            <label for="nomeaula">Nome da Aula</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">movie</i>
            <input id="nomevideo" type="text" class="validate" maxlength="150" v-model="aula.video_title">
            <label for="nomevideo">Nome do Vídeo</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="description" type="text" class="validate" maxlength="600" v-model="aula.description">
            <label for="description">Descrição</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">language</i>
            <input id="link" type="text" class="validate" maxlength="200" v-model="aula.link">
            <label for="link">Link</label>
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
                <input id="active" type="checkbox" v-model="aula.active">
                <span class="lever"></span>
                Sim
              </label>
            </div>
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
  name: 'CadAula',  

  components: {
    AdminTemplate,
    CardTabVue
  },
  data () {
    CardTabVue
    return {
      aula:{lesson_id:'', class_title:'', video_title:'', description:'', link:'', active:false},
    }
  },
  mounted () {
    M.AutoInit()
  },
  methods: {

    atualizaPagina(){
        this.$http
        .get(this.$urlAPI+`aulas/paginada`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista Aulas!");
          if(response.data.status){
            this.$store.commit('setAula',response.data.aulas);
          }
        })
        .catch((e) => {
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });


        //Licoes
        this.$http
        .get(this.$urlAPI+`licoes`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista de Lições!");

          if(response.data.status){
            this.$store.commit('setLicao',response.data.licoes);
          }
        })
        .catch((e) => {
          alert("Servido indisponível no momento, tente novamente mais tarde!");
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
          console.log("Retorno Recebido da API Lista Aulas!");
          if(response.data.status){
            this.$store.commit('setAula',response.data.aulas);
          }
        })
        .catch((e) => {
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });
    },

    cadastro(){
      this.$http.post(this.$urlAPI+`aula/cadastro`, {
                      lesson_id: this.aula.lesson_id,
                      class_title: this.aula.class_title,
                      video_title: this.aula.video_title,
                      description: this.aula.description,
                      link: this.aula.link,
                      active: this.aula.active
                    },
                    {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setAula',response.data.aulas);
              M.toast({html: 'Videoaula cadastrada com sucesso!', classes: 'teal darken-1 borda'});
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

      this.$http.delete(this.$urlAPI+`aula/delete/`+id, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setAula',response.data.aulas);
              M.toast({html: 'Videoaula excluída com sucesso!', classes: 'teal darken-1 borda'});
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
    listaLicoes(){
      return this.$store.getters.getLicao;
    },
    listaAulas(){
      return this.$store.getters.getAula;
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.borda {
  padding: 25px !important;
}

</style>
