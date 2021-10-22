<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/aula/cadastrar" class="breadcrumb">Gerenciar Videoaula</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">

          <div class="input-field col s12">
            <select v-model="aula.lesson_id" :value="aula.lesson_id">
              <option value="" disabled selected>Selecione uma Lição</option>
              <option v-for="item in listaLicoes" :key="item.id" :value="item.id">{{item.unidade.livro.title}} - {{item.unidade.title}} - {{item.title}}</option>
            </select>
            <label>Lição</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">mode_edit</i>
            <input id="nomeaula" type="text" class="validate" maxlength="100" v-model="aula.class_title">
            <label for="nomeaula" class="active">Nome da Aula</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">movie</i>
            <input id="nomevideo" type="text" class="validate" maxlength="150" v-model="aula.video_title">
            <label for="nomevideo" class="active">Nome do Vídeo</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="description" type="text" class="validate" maxlength="600" v-model="aula.description">
            <label for="description" class="active">Descrição</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">language</i>
            <input id="link" type="text" class="validate" maxlength="200" v-model="aula.link">
            <label for="link" class="active">Link</label>
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
            <button class="btn waves-effect amber accent-4" v-on:click="editar(aula.id)">Salvar</button>
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
  name: 'EditAula',  

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
      aula:{id:'', lesson_id:'', class_title:'', video_title:'', description:'', link:'', active:''},
    }
  },
  mounted () {
    M.AutoInit()
  },
  created () {
    this.atualizaPagina();
  },
  computed:{
    listaLicoes(){
      return this.$store.getters.getLicao;
    },
  },
  methods: {
    atualizaPagina(){
      let idAulaAlterar = this.$route.params.id; //ID Enviado Via Link
      let aulaAlterar = this.$store.getters.getAulaById(idAulaAlterar);

      if(aulaAlterar){
        this.aula.id = aulaAlterar.id;
        this.aula.lesson_id = aulaAlterar.lesson_id;
        this.aula.class_title = aulaAlterar.class_title;
        this.aula.video_title = aulaAlterar.video_title;
        this.aula.description = aulaAlterar.description;
        this.aula.link = aulaAlterar.link;
        this.aula.active = aulaAlterar.active;
      }
    },
    editar(id){
      this.$http
        .put(this.$urlAPI+`aula/editar/`+id, {
              lesson_id : this.aula.lesson_id,
              class_title : this.aula.class_title,
              video_title : this.aula.video_title,
              description : this.aula.description,
              link : this.aula.link,
              active : this.aula.active
            },
            {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API!");

          if (response.data.status) {
            this.$store.commit('setAula',response.data.aula);
            M.toast({html: 'Aula atualizada com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/aula/cadastrar');
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
