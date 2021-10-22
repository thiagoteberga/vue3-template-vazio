<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/school/cadastrar" class="breadcrumb">Gerenciar Administrador</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>

        <span slot="inputs">
          <div class="input-field col s12">
            <i class="material-icons prefix">school</i>
            <input id="nome" type="text" class="validate" maxlength="255" v-model="colegio.name">
            <label for="nome" class="active">Nome do Colégio</label>
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
                <input id="active" type="checkbox" v-model="colegio.active">
                <span class="lever"></span>
                Sim
              </label>
            </div>
          </div>
          <div class="right-align">
            <button class="btn waves-effect amber accent-4" v-on:click="editar(colegio.id)">Salvar</button>
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
  name: 'EditSchool',  

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
    colegio:{id: '', name:'', active:''}
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
      let idColegioAlterar = this.$route.params.id; //ID Enviado Via Link
      let colegioAlterar = this.$store.getters.getColegioById(idColegioAlterar);

      if(colegioAlterar){
        this.colegio.id = colegioAlterar.id;
        this.colegio.name = colegioAlterar.name;
        this.colegio.active = colegioAlterar.active;
      }

    },
    editar(id){

      this.$http
        .put(this.$urlAPI+`colegio/editar/`+id, {
              name: this.colegio.name,
              active: this.colegio.active,
            },
            {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API!");

          if (response.data.status) {

            this.$store.commit('setColegio',response.data.schools);
            M.toast({html: 'Colégio atualizado com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/school/cadastrar');
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
