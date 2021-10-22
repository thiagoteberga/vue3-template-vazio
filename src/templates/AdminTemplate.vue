
<template>
  <span class="body-span">
    <header>
      <nav-bar-vue color="blue-grey darken-3" url="/admin">
        <template v-slot:itens-menu>
          <li><router-link to="/admin" >Home</router-link></li>
          <li><router-link to="/admin/user-admin/cadastrar" >Administradores</router-link></li>
          <li><a class="dropdown-trigger no-autoinit" href="#!" data-target="dropdown-desktop">Olá, {{primeironome}}<i class="material-icons right">arrow_drop_down</i></a></li>
          
          <!-- Dropdown Alterar Senha -->   
          <ul id="dropdown-desktop" class="dropdown-content no-autoinit">
            <li><router-link to="/admin/perfil/" >Trocar Senha</router-link></li>
            <li><a v-on:click="sair()">Sair</a></li>
          </ul>
        </template>

        <template v-slot:itens-menu-mobile>
          <li class="sidenav-close"><router-link to="/admin" >Home</router-link></li>
          <li class="sidenav-close"><router-link to="/admin/user-admin/cadastrar" >Administradores</router-link></li>
          <li><a class="dropdown-trigger" href="#!" data-target="dropdown-mobile">Olá, {{primeironome}}<i class="material-icons right">arrow_drop_down</i></a></li>
          
          <!-- Dropdown Alterar Senha -->   
          <ul id="dropdown-mobile" class="dropdown-content">
            <li class="sidenav-close"><router-link to='/admin/perfil' >Trocar Senha</router-link></li>
            <li class="sidenav-close"><a v-on:click="sair()">Sair</a></li>
          </ul>
        </template>

        <template v-slot:breadcrumb>
          <slot name="breadcrumb-template"/>
        </template>
        
      </nav-bar-vue>
    </header>

    <main>
      
      <div class="container">

        <div class="row">
              <slot name="indicadores" />
        </div>
        
      </div>
    </main>
    
     <footer-vue color="blue-grey darken-2" title = 'Unimed Pindamonhangaba - Área do Cliente' description = 'TI'>
     </footer-vue>

  </span>
</template>

<script>
import NavBarVue from '@/components/layouts/NavBarVue'
import FooterVue from '@/components/layouts/FooterVue'
export default {
  name: 'AdminTemplate',
  components: {
    NavBarVue,
    FooterVue,
  },
  data(){
    return {
      usuario: '',
      primeironome: '',
      user_id: ''
    }
  },
  methods: {
    sair(){
      this.$http
        .get(this.$urlAPI+`logout`, {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then((response) => {
          if(!response.data.logado){
            localStorage.clear(); //Limpa o localStorage
            document.cookie = "loginStatusBelvedere=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; //Limpa o Cookie
            this.$store.commit('setUsuario','');
            this.$router.push('/login');
          }
        })
        .catch((e) => {
          console.log("Serviço indisponível no momento, tente novamente mais tarde! Erro na Comunicação com a API!");
        });

    }
  },
  mounted() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        coverTrigger: false, // Displays dropdown below the button
        alignment: 'right' // Displays dropdown with edge aligned to the left of button
      });

      M.AutoInit(); // That way, it is only initialized when the component is mounted
  },

  //Validacao Basica de Acesso
  
  created(){
    let usuarioSession = this.$store.getters.getUsuario;

    if(usuarioSession){
      let nivel_usuario = usuarioSession.nivel_usuario;
      this.usuario = this.$store.getters.getUsuario;
      this.primeironome = usuarioSession.name.split(" ")[0];
      this.user_id = usuarioSession.id;
      
      if(nivel_usuario == 1){
        this.$router.push('/student');
      }else if(nivel_usuario == 2){
        this.$router.push('/school');
      }else if(nivel_usuario == 3){
        return;
      }else if(nivel_usuario == 4){
        this.$router.push('/teacher');
      }else{
        localStorage.clear(); //Limpa o localStorage
        document.cookie = "loginStatusBelvedere=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; //Limpa o Cookie
      }

    }
  }
  
}
</script>

<style>
.material-icons{
    display: inline-flex;
    vertical-align: top;
}
</style>