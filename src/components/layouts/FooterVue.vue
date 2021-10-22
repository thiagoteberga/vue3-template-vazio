<template>
     <footer :class="'page-footer ' + color">
          <!--
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">{{title}}</h5>
                <p class="grey-text text-lighten-4">{{description || "Descricao"}}</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <ul>
                    <slot></slot>
                </ul>
              </div>
            </div>
          </div>
          -->
          <div class="footer-copyright center blue-grey darken-3">
            <div class="container">
              <div class="row margem-zero">
              © 2021 Copyright - Todos os direitos reservados.
              </div>
              <!--
              <div class="row">
                {{description || "Descricao"}}
              </div>
              -->
            </div>
          </div>
    </footer>
</template>

<script>
export default {
  name: 'FooterVue',
  props:['color','title','copyright', 'author','logo','description'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-footer {
    padding-top: 0px;
  }
  .margem-zero {
    margin-bottom: 0px !important;
  }
</style>
