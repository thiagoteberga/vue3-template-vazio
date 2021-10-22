<template>
    <router-link :to="caminho">
      <div :class="'card-margem col ' + size">
        <div class="card horizontal">
          <div class="card-image center-align valign-wrapper">
            <img class = "img-card" :src="imagem">
          </div>
          <div class="card-stacked">
            <div class="card-action" style="text-align='center'">
              <a :href="caminho"><b><slot class="btn-card" name="botao" /></b></a>
            </div>
            <div class="card-content">
              <slot name="descricao" />
            </div>
          </div>
        </div>
      </div>
    </router-link>
</template>

<script>
import GridVue from '@/components/layouts/GridVue'
export default {
  name: 'CardButtonVue',
  props:['size','caminho','imagem'],
  components: {
    GridVue
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-card{
  height: 120px;
  width: auto;
  padding: 10px;
}

.card {
  margin: .5rem 0 1rem 0 !important;
  background-color: #ffffffd4 !important;
}

.card .card-content {
  border-top: 1px solid rgba(160,160,160,0.2);
  padding: 15px;
  background-color: transparent !important;
}

.card-stacked .card-action{
  background-color: transparent !important;
}

.card .card-action a{
  color:#455a64 !important;
  border-top: 0px;
}

.card:hover{
  transform: scale(1.05);
  transition: 0.3s;
}

.card-margem {
  padding: 8px !important;
}



a {
  color: #455a64 !important;
}

    
</style>
