<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/user-teacher/cadastrar" class="breadcrumb">Gerenciar Professores</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input id="nome" type="text" class="validate" maxlength="255" v-model="usuario.name">
            <label for="nome" class="active">Nome Completo</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="cpf" type="text" class="validate" maxlength="11" v-model.number="usuario.cpf">
            <label for="cpf" class="active">CPF</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input id="email" type="email" class="validate" maxlength="255" v-model="usuario.email">
            <label for="email" class="active">Email</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">lock_outline</i>
            <input id="senha" type="password" class="validate" maxlength="40" v-model="usuario.password">
            <label for="senha">Nova Senha</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
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
  name: 'EditUserTeacher',  

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
    usuario:{id: '', name:'', cpf:'', email:'', password:'', password_confirmation:''}
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
      let idUsuarioAlterar = this.$route.params.id; //ID Enviado Via Link
      let usuarioAlterar = this.$store.getters.getUsuarioTeacherById(idUsuarioAlterar);

      if(usuarioAlterar){
        this.usuario.id = usuarioAlterar.id;
        this.usuario.cpf = usuarioAlterar.cpf;
        this.usuario.name = usuarioAlterar.name;
        this.usuario.email = usuarioAlterar.email;
      }

    },
    editar(id){

      this.$http
        .put(this.$urlAPI+`usuario/editar/`+id, {
              name: this.usuario.name,
              cpf: this.usuario.cpf,
              email: this.usuario.email,
              password: this.usuario.password,
              password_confirmation: this.usuario.password_confirmation,
            },
            {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API!");

          if (response.data.status) {
            this.$store.commit('setUsuarioTeacher',response.data.usuarios);
            M.toast({html: 'Usuário atualizado com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/user-teacher/cadastrar');
          } else if (response.data.status == false && response.data.validacao == true){
            console.log("Erro de Validacao");
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
