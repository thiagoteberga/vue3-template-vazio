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
  name: 'CardDetalheVueActionInvisible',
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
  border-radius: 20px 20px 20px 20px !important;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: transparent;
}
.card .card-content{  
  border-radius: 20px 20px 20px 20px !important;
  padding: 10px 5px 5px 5px;
  background-color: #ffffffd4 !important;
  -webkit-box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);
}
.card .card-action{
  border-top: none;  
  padding: 15px 15px 30px 15px;
  background-color: transparent;
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
