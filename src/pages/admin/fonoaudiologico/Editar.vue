<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin/" class="breadcrumb">Home</router-link>
          <router-link to="/admin/video/fono/cadastrar" class="breadcrumb">Gerenciar Apoio Fonoaudiológico</router-link>
          <router-link to="#" class="breadcrumb">Editar</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <div class="input-field col s12">
            <i class="material-icons prefix">mode_edit</i>
            <input id="title" type="text" class="validate" maxlength="100" v-model="video.title">
            <label for="title" class="active">Título</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">featured_play_list</i>
            <input id="description" type="text" class="validate" maxlength="600" v-model="video.description">
            <label for="description" class="active">Descrição</label>
          </div>
          <div class="input-field col s12">
            <i class="material-icons prefix">language</i>
            <input id="link" type="text" class="validate" maxlength="200" v-model="video.link">
            <label for="link" class="active">Link</label>
          </div>

          <div class="right-align">
            <button class="btn waves-effect amber accent-4" v-on:click="editar(video.id)">Salvar</button>
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
  name: 'EditVideoFono',  

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
      video:{category_id:'', title:'', description:'', link:'', active:true},
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
      return this.$store.getters.getVideoFono;
    },
  },
  methods: {
    atualizaPagina(){
      let idVideoAlterar = this.$route.params.id; //ID Enviado Via Link
      let videoAlterar = this.$store.getters.getVideoFonoEditById(idVideoAlterar);

      if(videoAlterar){
        this.video.id = videoAlterar.id;
        this.video.title = videoAlterar.title;
        this.video.description = videoAlterar.description;
        this.video.link = videoAlterar.link;
        this.video.active = videoAlterar.active;
      }
    },
    editar(id){
      this.$http
        .put(this.$urlAPI+`video/editar/`+id, {
              category_id : "3",
              title : this.video.title,
              description : this.video.description,
              link : this.video.link,
              active : this.video.active
            },
            {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          console.log("Retorno Recebido da API!");

          if (response.data.status) {
            this.$store.commit('setVideoFono',response.data.videos);
            M.toast({html: 'Video atualizado com sucesso!', classes: 'teal darken-1 borda'});
            this.$router.push('/admin/video/fono/cadastrar');
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
