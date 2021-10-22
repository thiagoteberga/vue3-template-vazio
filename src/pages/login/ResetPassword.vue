<template>
  <login-template>


    <span slot="menuesquerdo"/>

    <span slot="menumeio">

      <div class="row ">

      <card-login-vue>
            <span slot="cardloginCabecalho">
                <div style="text-align:center">         
                    <h3>Redefinir Senha</h3>
                </div>
            </span>

            <span slot="cardloginConteudo">
              
                <!--
                <div class="row">
                  <div class="input-field col s12">
                    <select>
                      <option value="" disabled selected>Choose your option</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                    <label>Colégio</label>
                  </div>
                </div>
                -->
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <input id="login" type="text" class="validate" v-on:keyup.enter="redefinir()" v-model="email" disabled>
                    <label for="login" class="active">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">lock_outline</i>
                    <input id="password" type="password" class="validate" v-on:keyup.enter="redefinir()" v-model="usuario.password">
                    <label for="password">Nova Senha</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">lock_outline</i>
                    <input id="confirmpassword" type="password" class="validate" v-on:keyup.enter="redefinir()" v-model="usuario.password_confirmation">
                    <label for="confirmpassword">Confirmar Nova Senha</label>
                  </div>
                </div>

                <div class="right-align">
                  <!-- Modal Trigger -->
                  <button class="btn green darken-1" v-on:click="redefinir()" >Alterar</button>
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
      </card-login-vue>
      </div>
    </span>
  
    <span slot="menudireito"/>
  </login-template>
</template>

<script>
import CardLoginVue from '@/components/cards/CardLoginVue'
import ModalVue from '@/components/dialog/ModalVue'
import LoginTemplate from '@/templates/LoginTemplate'
import ProgressBar from '@/components/progress/ProgressBar'

export default {
  name: 'ResetPassword',
  components: {
    LoginTemplate,
    CardLoginVue,
    ModalVue,
    ProgressBar
  }, 

  data () {
    return {
    usuario:{email:'', password:'', password_confirmation: ''},
    carregando: false,
    token: this.$route.params.token, //ID Enviado Via Link
    email: this.$route.params.email //ID Enviado Via Link
    }
  },
  methods:{
    redefinir(){

      //Ativa Loading
      this.carregando = true;

      this.$http.post(this.$urlAPI+`reset-password`, {
        email: this.email,
        password: this.usuario.password,
        password_confirmation: this.usuario.password_confirmation,
        token: this.token
      })
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              console.log('Redefinição Realizada com Sucesso');

              //Desativa Loading
              this.carregando = false;
              M.toast({html: 'Senha alterada com sucesso!', classes: 'teal darken-3 borda'});
              this.$router.push('/login');

          }else if(response.data.status == false && response.data.validacao == true){

              //Desativa Loading
              this.carregando = false;

              console.log('Erro de Validacao');
              for (let erro of Object.values(response.data.erros)){
                M.toast({html: erro, classes: 'amber darken-3 borda'});
              }
          }else{
              //Desativa Loading
              this.carregando = false;

              M.toast({html: response.data.result, classes: 'deep-orange accent-4 borda'});
          }
      })
      .catch(e => {
        //Desativa Loading
        this.carregando = false;
        M.toast({html: 'Servidor indisponível no momento, tente novamente mais tarde!', classes: 'deep-orange accent-4 borda'});
      })
    },
  }
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .img-card{
    width: 50px;
    height: auto;
  }

  h2{
    margin-block-start: 0 !important;
    margin-block-end: 20px !important;
    color: #5a5a55;
  }

  h3{
    margin-block-start: 0 !important;
    margin-block-end: 0px !important;
    color: #5f605a;
  }

  /* label color */
  .input-field label {
    color: #5f605a;
  }
  /* label focus color */
  .input-field input[type=text]:focus + label {
    color: #5f605a;
  }
  /* label underline focus color */
  .input-field input[type=text]:focus {
    border-bottom: 1px solid #5f605a !important;
    box-shadow: 0 1px 0 0 #5f605a;
  }
  /* valid color */
  .input-field input[type=text].valid {
    border-bottom: 1px solid #5f605a;
    box-shadow: 0 1px 0 0 #5f605a;
  }
  /* invalid color */
  .input-field input[type=text].invalid {
    border-bottom: 1px solid #5f605a;
    box-shadow: 0 1px 0 0 #5f605a;
  }
  /* icon prefix focus color */
  .input-field .prefix.active {
    color: #5f605a;
  }
  input:not([type]):focus:not([readonly]), input[type=text]:not(.browser-default):focus:not([readonly]), input[type=password]:not(.browser-default):focus:not([readonly]), input[type=email]:not(.browser-default):focus:not([readonly]), input[type=url]:not(.browser-default):focus:not([readonly]), input[type=time]:not(.browser-default):focus:not([readonly]), input[type=date]:not(.browser-default):focus:not([readonly]), input[type=datetime]:not(.browser-default):focus:not([readonly]), input[type=datetime-local]:not(.browser-default):focus:not([readonly]), input[type=tel]:not(.browser-default):focus:not([readonly]), input[type=number]:not(.browser-default):focus:not([readonly]), input[type=search]:not(.browser-default):focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
    border-bottom: 1px solid #5f605a !important;
    -webkit-box-shadow: 0 1px 0 0 #5f605a !important;
    box-shadow: 0 1px 0 0 #5f605a !important;
  }
  input:not([type]).validate+label, input[type=text]:not(.browser-default).validate+label, input[type=password]:not(.browser-default).validate+label, input[type=email]:not(.browser-default).validate+label, input[type=url]:not(.browser-default).validate+label, input[type=time]:not(.browser-default).validate+label, input[type=date]:not(.browser-default).validate+label, input[type=datetime]:not(.browser-default).validate+label, input[type=datetime-local]:not(.browser-default).validate+label, input[type=tel]:not(.browser-default).validate+label, input[type=number]:not(.browser-default).validate+label, input[type=search]:not(.browser-default).validate+label, textarea.materialize-textarea.validate+label {
    color: #5f605a !important;
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