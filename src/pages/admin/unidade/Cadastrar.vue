<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/unidade/cadastrar" class="breadcrumb">Gerenciar Unidades</router-link>
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
                <th>Nome Unidade</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in listaUnidades.data" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.livro.title}}</td>
                <td>{{item.title}}</td>
                <td>
                  <router-link :to="'/admin/unidade/editar/'+item.id">
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
          <!-- <span v-for="item in listaUnidades.links" :key="item.label + Math.random()"> -->
          <span v-for="(item, index) in listaUnidades.links" :key="index">
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
            <select v-model="unidade.book_id">
              <option value="" disabled selected>Selecione um Livro</option>
              <option v-for="item in listaLivros" :key="item.id" :value="item.id">{{item.title}}</option>
            </select>
            <label>Livro</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="description" type="text" class="validate" maxlength="600" v-model="unidade.title">
            <label for="description">Nome Unidade</label>
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
  name: 'CadUnidade',  

  components: {
    AdminTemplate,
    CardTabVue
  },
  data () {
    CardTabVue
    return {
    unidade:{title:'', book_id:''}
    }
  },
  mounted () {
    M.AutoInit()
  },
  methods: {
    atualizaPagina(){
        this.$http
        .get(this.$urlAPI+`unidades/paginada`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista!");

          if(response.data.status){
            this.$store.commit('setUnidade',response.data.unidades);
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
          console.log("Retorno Recebido da API Lista das Séries!");

          if(response.data.status){
            this.$store.commit('setLivro',response.data.livros);
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
          console.log("Retorno Recebido da API Lista Unidades!");
          if(response.data.status){
            this.$store.commit('setUnidade',response.data.unidades);
          }
        })
        .catch((e) => {
          alert("Servidor indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });
    },
    cadastro(){
      this.$http.post(this.$urlAPI+`unidade/cadastro`, {
                      book_id: this.unidade.book_id,
                      title: this.unidade.title
                    },
                    {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setUnidade',response.data.unidades);
              M.toast({html: 'Unidade cadastrada com sucesso!', classes: 'teal darken-1 borda'});
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
      this.$http.delete(this.$urlAPI+`unidade/delete/`+id, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setUnidade',response.data.unidades);
              M.toast({html: 'Unidade excluída com sucesso!', classes: 'teal darken-1 borda'});
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
    listaUnidades(){
      return this.$store.getters.getUnidade;
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
