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
  name: 'CardDetalheVue',
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
.row {
  margin-bottom: 0px;
}

.card{
  border-radius: 15px 15px 15px 15px !important;
  background-color: #ffffffd4 !important;
  margin-bottom: 50px;
}

.card .card-action{
  border-radius: 0px 0px 15px 15px !important;
  background-color: transparent !important;
}

.card .card-content{
  background-color: transparent !important;
}

.card-image{
  border-radius: 15px 15px 0px 0px !important;
  background-color: transparent !important;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
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

h4 {
    margin: 10px 0 10px 0;
}
</style>
