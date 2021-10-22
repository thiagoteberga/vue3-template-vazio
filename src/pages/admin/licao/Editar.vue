<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/licao/cadastrar" class="breadcrumb">Gerenciar Lições</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <div class="input-field col s12">
            <select :value="licao.unit_id" v-model="licao.unit_id">
              <option value="" disabled selected>Selecione uma Lição</option>
              <option v-for="item in listaUnidades" :key="item.id" :value="item.id">{{item.livro.title}} - {{item.title}}</option>
            </select>
            <label>Unidade</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="description" type="text" class="validate" maxlength="600" v-model="licao.title">
            <label for="description" class="active">Nome da Lição</label>
          </div>
          <div class="right-align">
            <button class="btn waves-effect amber accent-4" v-on:click="editar(licao.id)">Salvar</button>
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
  name: 'EditLicao',  

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
      licao:{id:'', title:'', book_id:'', unit_id:''}
    }
  },
  mounted () {
    M.AutoInit()
  },
  created () {
    this.atualizaPagina();
  },
  computed:{
    listaUnidades(){
      return this.$store.getters.getUnidade;
    }
  },
  methods: {
    atualizaPagina(){
      let idLicaoAlterar = this.$route.params.id; //ID Enviado Via Link
      let licaoAlterar = this.$store.getters.getLicaoById(idLicaoAlterar);

      if(licaoAlterar){
        this.licao.id = licaoAlterar.id;
        this.licao.unit_id = licaoAlterar.unit_id;
        this.licao.book_id = licaoAlterar.book_id;
        this.licao.title = licaoAlterar.title;
      }
    },
    editar(id){
      this.$http
        .put(this.$urlAPI+`licao/editar/`+id, {
              unit_id: this.licao.unit_id,
              title: this.licao.title,
            },
            {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API!");

          if (response.data.status) {
            this.$store.commit('setLicao',response.data.licoes);
            M.toast({html: 'Lição atualizada com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/licao/cadastrar');
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
