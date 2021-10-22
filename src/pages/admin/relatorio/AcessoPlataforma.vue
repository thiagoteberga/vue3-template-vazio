<template>
  <admin-template>

    <span slot="breadcrumb-template">
          <router-link to="/admin" class="breadcrumb">Home</router-link>
          <router-link to="#" class="breadcrumb">Alunos x Acesso a Plataforma</router-link>
    </span>

    <span slot="indicadores">
      
      <card-edit-vue>
        <span slot="inputs">
          <div v-if="this.naoprocessado">
            <div class="input-field col s12">
              <div style="text-align:center">         
                <h3>Relatório</h3>
                <h5>Alunos x Acesso a Plataforma</h5>
                <hr>
                <h6>Informe o intervalo de datas para geração do relatório:</h6>
              </div>            
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">date_range</i>
              <input id="dtinicial" type="date" class="validate" v-model="data_inicial">
              <label for="dtinicial">Data Inicial</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">date_range</i>
              <input id="dtfinal" type="date" class="validate" v-model="data_final">
              <label for="dtfinal">Data Final</label>
            </div>
            <div class="right-align">
              <button class="btn waves-effect yellow darken-3" v-on:click="gerar()">Processar</button>
            </div>
          </div>
          <div class="center-align" v-else>
            <div>
              <h6>Tudo pronto, clique no botão a baixo para realizar o download:</h6>
              <vue-excel-xlsx
                  :data="data"
                  :columns="columns"
                  :filename="'Relatorio de Acessos a Plataforma'"
                  :sheetname="'Relatorio'"
                  :class="'btn waves-effect green darken-3'"
                  >
                  Realizar o Download
                  <i class="material-icons right">cloud_download</i>
                </vue-excel-xlsx>
            </div>
            <br>
            <div>
              <button class="btn waves-effect grey darken-1" v-on:click="voltar()">Voltar</button>
            </div>
          </div>

          <div class="modal-overlay" v-if="carregando"></div>
          <div class="preloader-wrapper big active" v-if="carregando">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
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
  name: 'AcessoPlataformaAdmin',  

  components: {
    AdminTemplate,
    CardEditVue
  },
  data () {
    return {
      data_inicial:'',
      data_final:'',
      data:[],
      columns : [
                    {
                        label: "ID Usuario",
                        field: "users_id",
                    },
                    {
                        label: "Data Acesso",
                        field: "data_login",
                    },
                    {
                        label: "CPF",
                        field: "cpf",
                    },
                    {
                        label: "Nome",
                        field: "name",
                    },
                    {
                        label: "Email",
                        field: "email",
                    },
                    {
                        label: "Colégio",
                        field: "school_name",
                    },
                    {
                        label: "Série",
                        field: "series_name",
                    }
                ],
      naoprocessado: true,
      carregando: false
    }
  },
  mounted () {
    M.AutoInit()
  },
  methods: {
    voltar(){
      this.naoprocessado = true;
      //Desativa Loading
       this.carregando = false;
    },
    gerar(){
      //Ativa Loading
      this.carregando = true;

      this.$http.get(this.$urlAPI+`relatorio/usuario/acesso/`+this.data_inicial+' 00:00:00/'+this.data_final+' 23:59:59',
                    {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
          console.log("Retorno Recebido da API!");
          //Desativa Loading
          this.carregando = false;
          if(response.data.status){
              this.data = response.data.acessos;
              if(response.data.quantidade > 0) {
                M.toast({html: 'Processamento concluído, clique no botão para realizar o Download!', classes: 'teal darken-1 borda'});
                this.naoprocessado = false;
              } else {
                M.toast({html: 'Nenhum movimento no período informado!', classes: 'deep-orange darken-4 borda'});
               this.naoprocessado = true;
              }
          }else{
              M.toast({html: 'Erro na Geração do Relatório!', classes: 'deep-orange accent-4 borda'});
              this.naoprocessado = true;
          }
      })
      .catch(e => {
        M.toast({html: 'Servidor indisponível no momento, tente novamente mais tarde!!', classes: 'deep-orange accent-4 borda'});
        console.log("Erro na Comunicação com a API!");
        //Desativa Loading
        this.carregando = false;
      })

    },

  },

  computed:{
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .borda {
    padding: 25px;
  }
  h3 {
      margin: 10px 10px 10px 10px !important;
  }
  h5 {
      margin: 10px 10px 30px 10px !important;
  }
  h6 {
      margin: 20px 10px 20px 10px !important;
  }
  hr {
      margin: 30px 0px 30px 0px !important;
  }
  .modal-overlay{
    z-index: 1005 !important; 
    display: block !important;
    opacity: 0.7 !important;
  }
  .preloader-wrapper{
    z-index: 1010 !important;
    position: fixed !important;
    top: calc(50% - 32px) !important;
    left: calc(50% - 32px) !important;
  }
</style>
