<template>
  <span class="body-span">


    <main>
      <div class="container">

        <div class="row">
          <grid-vue size="s12 m2 l3">
            <slot name="menuesquerdo" />
          </grid-vue>

          <grid-vue size="s12 m8 l6">
              <slot name="menumeio" />
          </grid-vue>

          <grid-vue size="s12 m2 l3">
              <slot name="menudireito" />
          </grid-vue>
        </div>

        
      </div>
    </main>
    

  </span>
</template>

<script>
import GridVue from '@/components/layouts/GridVue'
export default {
  name: 'SiteTemplate',
  components: {
    GridVue,
  },
  mounted() {
      M.AutoInit(); // That way, it is only initialized when the component is mounted
  },
  created(){
    let usuarioSession = this.$store.getters.getUsuario;
    if(usuarioSession){
      let nivel_usuario = usuarioSession.nivel_usuario;
      
      if(nivel_usuario == 1){
        this.$router.push('/student').catch(()=>{console.log('Login Template - Student')});
      }else if(nivel_usuario == 2){
        this.$router.push('/school').catch(()=>{console.log('Login Template - School')});
      }else if(nivel_usuario == 3){
        this.$router.push('/admin').catch(()=>{console.log('Login Template - Admin')});
      }else if(nivel_usuario == 4){
        this.$router.push('/teacher').catch(()=>{console.log('Login Template - Teacher')});
      }else{
        localStorage.clear(); //Limpa o localStorage
        document.cookie = "loginStatusBelvedere=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; //Limpa o Cookie
      }
      
    }
  }
}
</script>

<style scoped>
  .material-icons{
      display: inline-flex;
      vertical-align: top;
  }
  .container {
    width: 65%;
  }
  main {
    margin-top: 0px !important;
  }
  .row {
    margin-bottom: 0px !important;
  }
</style>