<template>
    
      <div class="row" style="height: 100%; margin:5px">

        <!-- COLUNA LICAO -->
        <div :class="'card-margem col s6 m6 l6'" style="height: 100%">
          <div class="card vertical" style="height: 100%">
            <div class="card-stacked">
              <div class="card-action center-align">
                <b><slot class="btn-card" name="botao" /></b>
              </div>
            </div>
          </div>
        </div>

        <!-- COLUNA AULA -->
        <div :class="'card-margem col s6 m6 l6'"  style="height: 100%">
          <slot name="aula" />
        </div>
        

      </div>
</template>

<script>
import GridVue from '@/components/layouts/GridVue'
export default {
  name: 'CardButtonVerticalVueVideos',
  props:['caminhoVideoaula','caminhoPodcast','caminhoApostila','imagem'],
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

.card-margem {
  padding: 10px;
}

.card-stacked{
  background-color: #455a64;
  color: #fff;
}


</style>
