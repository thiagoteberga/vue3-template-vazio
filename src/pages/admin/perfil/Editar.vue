<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin" class="breadcrumb">Home</router-link>
          <router-link to="#" class="breadcrumb">Editar Perfil</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input id="nome" type="text" class="validate" maxlength="255" v-model="usuario.name" disabled>
            <label for="nome" class="active">Nome Completo</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="cpf" type="text" class="validate" maxlength="11" v-model.number="usuario.cpf" disabled>
            <label for="cpf" class="active">CPF</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input id="email" type="email" class="validate" maxlength="255" v-model="usuario.email">
            <label for="email" class="active">Email</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <input id="senhaatual" type="password" class="validate" maxlength="40" v-model="usuario.current_password">
            <label for="senhaatual">Senha Atual</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">lock_outline</i>
            <input id="senha" type="password" class="validate" maxlength="40" v-model="usuario.password">
            <label for="senha">Nova Senha</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">lock_outline</i>
            <input id="confirmarsenha" type="password" class="validate" maxlength="40" v-model="usuario.password_confirmation">
            <label for="confirmarsenha">Confirmar Nova Senha</label>
          </div>
          <div class="right-align">
            <button class="btn waves-effect amber accent-4" v-on:click="editar(usuario.id)">Salvar</button>
          </div>
        </span>
      </card-edit-vue>
    </span>
  </admin-template>
</template>

<script>
import AdminTemplate from '@/templates/AdminTemplate'
import CardEditVue from '@/components/cards/CardEditVue.vue'

export default {
  name: 'EditAdminPerfil',

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
    usuario:{id: '', name:'', cpf:'', email:'', password:'', password_confirmation:'', current_password:''}
    }
  },
  mounted () {
    M.AutoInit()
  },
  created () {
    this.atualizaPagina();
  },
  methods: {
    atualizaPagina(){
      
      let usuarioSession = this.$store.getters.getUsuario;

      if(usuarioSession){
        this.usuario.id = usuarioSession.id;
        this.usuario.cpf = usuarioSession.cpf;
        this.usuario.name = usuarioSession.name;
        this.usuario.email = usuarioSession.email;
      }

    },
    editar(id){

      this.$http
        .put(this.$urlAPI+`perfil`, {
              id: this.usuario.id,
              email: this.usuario.email,
              current_password: this.usuario.current_password,
              password: this.usuario.password,
              password_confirmation: this.usuario.password_confirmation,
            },
            {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API!");

          if (response.data.status) {
            this.$store.commit('setUsuario',response.data.usuario);
            M.toast({html: 'Perfil atualizado com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin');
          } else if (response.data.status == false && response.data.validacao == true){
            for (let erro of Object.values(response.data.erros)) {
              M.toast({html:'Erro: ' + erro, classes: 'deep-orange borda'});
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

</style>
