<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/user-school/cadastrar" class="breadcrumb">Gerenciar Usuários Colégio</router-link>
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
                <th>Colégio</th>
                <th>Usuário</th>
                <th>Nome</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in listaUsuarios.data" :key="item.id">
                <td v-for="colegio in item.colegio" :key="colegio.id">{{colegio.name}}</td>
                <td>{{item.cpf}}</td>
                <td>{{item.name}}</td>
                <td>{{item.email}}</td>
                <td>
                  <router-link :to="'/admin/user-school/editar/'+item.id">
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
          <span v-for="item in listaUsuarios.links" :key="item.label">
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
            <select v-model="usuario.colegio">
              <option value="" disabled selected>Selecione um Colégio</option>
              <option v-for="item in listaColegios" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
            <label>Colégio</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input id="nome" type="text" class="validate" maxlength="255" v-model="usuario.name">
            <label for="nome">Nome Completo</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="cpf" type="text" class="validate" maxlength="11" v-model.number="usuario.cpf">
            <label for="cpf">CPF</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input id="email" type="email" class="validate" maxlength="255" v-model="usuario.email">
            <label for="email">Email</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">lock_outline</i>
            <input id="senha" type="password" class="validate" maxlength="40" v-model="usuario.password">
            <label for="senha">Senha</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <input id="confirmarsenha" type="password" class="validate" maxlength="40" v-model="usuario.password_confirmation">
            <label for="confirmarsenha">Confirmar Senha</label>
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
  name: 'CadUserSchool',  

  components: {
    AdminTemplate,
    CardTabVue
  },
  data () {
    CardTabVue
    return {
    isActive : false,
    usuario:{name:'', cpf:'', email:'', password:'', password_confirmation:'', colegio: ''},
    colegio:{id:'', name:'', active:false}
    }
  },
  mounted () {
    M.AutoInit()
  },
  methods: {

    atualizaPagina(){
        //Usuarios
        this.$http
        .get(this.$urlAPI+`usuarios/paginada/2`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista de Usuarios!");

          if(response.data.status){
            this.$store.commit('setUsuarioColegio',response.data.usuarios);
          }
        })
        .catch((e) => {
          alert("Servido indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });

        //Colegios
        this.$http
        .get(this.$urlAPI+`colegios`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API Lista de Colegios!");

          if(response.data.status){
            this.$store.commit('setColegio',response.data.schools);
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
          console.log("Retorno Recebido da API Lista Usuarios Paginada!");
          if(response.status){
            this.$store.commit('setUsuarioColegio',response.data.usuarios);
          }
        })
        .catch((e) => {
          alert("Servido indisponível no momento, tente novamente mais tarde!");
          console.log("Erro na Comunicação com a API!");
        });
    },

    cadastro(){

      const nivel_usuario = 2;

      this.$http.post(this.$urlAPI+`usuario/colegio/cadastro`, {
                      name: this.usuario.name,
                      cpf: this.usuario.cpf,
                      email: this.usuario.email,
                      password: this.usuario.password,
                      password_confirmation: this.usuario.password_confirmation,
                      nivel_usuario: nivel_usuario,
                      school_id: this.usuario.colegio
                    },
                    {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setUsuarioColegio',response.data.usuarios);
              M.toast({html: 'Usuário cadastrado com sucesso!', classes: 'teal darken-1 borda'});
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

      this.$http.delete(this.$urlAPI+`usuario/delete/`+id, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              this.atualizaPagina();
              //this.$store.commit('setUsuarioColegio',response.data.usuarios);
              M.toast({html: 'Usuário excluído com sucesso!', classes: 'teal darken-1 borda'});
          }else if(response.data.status == false){
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
    listaUsuarios(){
      return this.$store.getters.getUsuarioColegio;
    },
    listaColegios(){
      return this.$store.getters.getColegio;
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
