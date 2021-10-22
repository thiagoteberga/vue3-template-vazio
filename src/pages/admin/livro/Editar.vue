<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/livro/cadastrar" class="breadcrumb">Gerenciar Livros</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input id="nome" type="text" class="validate" maxlength="255" v-model="livro.title">
            <label for="nome" class="active">Nome</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="description" type="text" class="validate" maxlength="600" v-model="livro.description">
            <label for="description" class="active">Descrição</label>
          </div>
          <div class="right-align">
            <button class="btn waves-effect amber accent-4" v-on:click="editar(livro.id)">Salvar</button>
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
  name: 'EditLivro',  

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
    livro:{id: '', title:'', description:''}
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
      let idLivroAlterar = this.$route.params.id; //ID Enviado Via Link
      let livroAlterar = this.$store.getters.getLivroById(idLivroAlterar);

      if(livroAlterar){
        this.livro.id = livroAlterar.id;
        this.livro.title = livroAlterar.title;
        this.livro.description = livroAlterar.description;
      }

    },
    editar(id){

      this.$http
        .put(this.$urlAPI+`livro/editar/`+id, {
              title: this.livro.title,
              description: this.livro.description,
            },
            {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API!");

          if (response.data.status) {
            this.$store.commit('setLivro',response.data.livros);
            M.toast({html: 'Livro atualizado com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/livro/cadastrar');
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
