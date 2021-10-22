<template>
    <span>
      <div class="card">
        <div class="card-content">
            <slot name="slot1"/>
        </div>
        <div class="card-action">
            <slot name="slot2"/>
        </div>
      </div>
    </span>
</template>

<script>

export default {
  name: 'CardDetalheVueInvisible',
  components: {
  },
  props:[],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  border-radius: 15px 15px 15px 15px !important;
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.card .card-content{  
  padding: 70px 15px 0px 15px;
}
.card .card-action{
  border-top: none;  
  padding: 0px 15px 0px 15px;
}

.card .card-image img {
    display: unset !important;
    position: relative;
    left: 0;
    right: 0;
    top: 5px;
    bottom: 5px;
    width: 100%;
}

</style>
