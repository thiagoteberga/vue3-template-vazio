<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/unidade/cadastrar" class="breadcrumb">Gerenciar Unidades</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <div class="input-field col s12">
            <select :value="unidade.book_id" v-model="unidade.book_id">
              <option value="" disabled selected>Selecione um Livro</option>
              <option v-for="item in listaLivros" :key="item.id" :value="item.id">{{item.title}}</option>
            </select>
            <label>Livro</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="description" type="text" class="validate" maxlength="600" v-model="unidade.title">
            <label for="description" class="active">Nome Unidade</label>
          </div>
          <div class="right-align">
            <button class="btn waves-effect amber accent-4" v-on:click="editar(unidade.id)">Salvar</button>
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
  name: 'EditUnidade',  

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
    unidade:{id: '', book_id: '', title:''}
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
      let idUnidadeAlterar = this.$route.params.id; //ID Enviado Via Link
      let unidadeAlterar = this.$store.getters.getUnidadeById(idUnidadeAlterar);
      console.log(unidadeAlterar);
      if(unidadeAlterar){
        this.unidade.id = unidadeAlterar.id;
        this.unidade.book_id = unidadeAlterar.book_id;
        this.unidade.title = unidadeAlterar.title;
      }

    },
    editar(id){

      this.$http
        .put(this.$urlAPI+`unidade/editar/`+id, {
              book_id: this.unidade.book_id,
              title: this.unidade.title,
            },
            {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API!");

          if (response.data.status) {
            this.$store.commit('setUnidade',response.data.unidades);
            M.toast({html: 'Unidade atualizada com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/unidade/cadastrar');
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

</style>
