<template>
  <login-template>


    <template v-slot:menuesquerdo />

    <template v-slot:menumeio>

      <div class="row ">

      <card-login-vue>
            <template v-slot:cardloginCabecalho>
                <div style="text-align:center">         
                    <h3>LOGIN</h3>
                </div>
            </template>

            <template v-slot:cardloginConteudo>

                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="login" type="text" class="validate" v-on:keyup.enter="login()" v-model="usuario.cpf">
                    <label for="login">CPF</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">lock_outline</i>
                    <input id="password" type="password" class="validate" v-on:keyup.enter="login()" v-model="usuario.password">
                    <label for="password">Senha</label>
                  </div>
                </div>

                <div class="right-align">
                  <!-- Modal Trigger -->
                  <a class="btn grey modal-trigger" href="#esqueceu">Esqueci a senha</a>
                  <button class="btn green darken-1" v-on:click="login()" >Entrar</button>
                </div>
                
                <modal-vue idmodal="esqueceu" titulo="Esqueci a Senha" detalhe="">
                  <template v-slot:formulario>
                    <div v-if="emailEnviado">
                      <h4>Tudo certo!</h4>
                      <h5>Um email com as instruções para realizar a redefinição da senha foi enviado para o email cadastrado em seu perfil.</h5>
                      <h5>Verifique a sua caixa de entrada e também a caixa de spam.</h5>
                      <br>
                      <a class="btn waves-effect green darken-1 modal-close">OK, Realizar Login</a>
                    </div>
                    <form v-on:submit.prevent="forgot_password()" enctype="multipart/form-data" v-else>
                      <h4>Esqueci a Senha</h4>
                      <h6>Para redefinir a senha, informe o CPF que está cadastrado na plataforma.</h6>
                      <div class="input-field col s12">
                        <i class="material-icons prefix">account_box</i>
                        <input id="cpf" type="text" class="validate" maxlength="11" v-model="cpf">
                        <label for="cpf" class="active">Informe aqui o seu CPF...</label>
                      </div>
                      <div class="right-align">
                        <a class="btn waves-effect grey modal-close">Cancelar</a>
                        <button class="btn waves-effect green darken-1" type="submit">Solicitar</button>
                      </div>
                    </form>
                  </template>
                </modal-vue>
                <div class="modal-overlay" v-if="carregando" style="z-index: 1005; display: block; opacity: 0.7;"></div>
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
            </template>
      </card-login-vue>
      </div>
    </template>

    <template v-slot:menudireito />
  </login-template>
</template>

<script>
import CardLoginVue from '@/components/cards/CardLoginVue'
import ModalVue from '@/components/dialog/ModalVue'
import LoginTemplate from '@/templates/LoginTemplate'
import ProgressBar from '@/components/progress/ProgressBar'

export default {
  name: 'Home',
  components: {
    LoginTemplate,
    CardLoginVue,
    ModalVue,
    ProgressBar
  }, 

  data () {
    return {
    usuario:{cpf:'',password:''},
    cpf: '',
    emailEnviado: false,
    carregando: false
    }
  },

  methods:{
    login(){

      //Ativa Loading
      this.carregando = true;

      this.$http.post(this.$urlAPI+`login`, {
        cpf: this.usuario.cpf,
        password: this.usuario.password
      })
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              console.log('Login com Sucesso');
              this.$store.commit('setUsuario',response.data.usuario);
              localStorage.setItem('usuarioLogadoSessao',JSON.stringify(response.data.usuario)); //Atribui os Dados no LocalStorage
              document.cookie = "loginStatusBelvedere=loggedin"; //Atribui um cookie para deslogar apos fechar o Browser

              //Desativa Loading
              this.carregando = false;

              if (response.data.usuario.nivel_usuario == 1){
                this.$router.push('/student/home');
              } else if (response.data.usuario.nivel_usuario == 2){
                this.$router.push('/school/home');
              } else if (response.data.usuario.nivel_usuario == 3){
                this.$router.push('/admin');
              } else if (response.data.usuario.nivel_usuario == 4){
                this.$router.push('/teacher');
              }
              M.toast({html: 'Bem vindo!', classes: 'orange lighten-1 borda'});
          }else if(response.data.status == false && response.data.validacao == true){
            
              //Desativa Loading
              this.carregando = false;

              console.log('Erro de Validacao');
              let erros = '';
              for (let erro of Object.values(response.data.erros)){
                M.toast({html: erro, classes: 'deep-orange accent-4 borda'});
              }
          }else{
              //Desativa Loading
              this.carregando = false;

              M.toast({html: 'Usuário ou senha inválidos!', classes: 'deep-orange accent-4 borda'});
          }
      })
      .catch(e => {
        //Desativa Loading
        this.carregando = false;
        M.toast({html: 'Servidor indisponível no momento, tente novamente mais tarde!', classes: 'deep-orange accent-4 borda'});
      })
    },
    forgot_password(){

      //Ativa Loading
      this.carregando = true;

      this.$http.post(this.$urlAPI+`forgot-password`, {
        cpf: this.cpf
      })
      .then(response => {
          console.log("Retorno Recebido da API!");
          if(response.data.status){
              //Desativa Loading
              this.carregando = false;

              this.emailEnviado = true;
              console.log('Email enviado com sucesso');
          }else if(response.data.status == false && response.data.validacao == true){
              //Desativa Loading
              this.carregando = false;

              console.log('Erro de Validacao');
              let erros = '';
              for (let erro of Object.values(response.data.erros)){
                M.toast({html: erro, classes: 'deep-orange accent-4 borda'});
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

  .row {
    margin-bottom: 0px !important;
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

  .preloader-wrapper{
    z-index: 1010 !important;
    position: fixed !important;
    top: calc(50% - 32px) !important;
    left: calc(50% - 32px) !important;
  }
</style>