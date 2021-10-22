<template>
      <div class="row">

        <!-- Modal Trigger -->
        <div class="card" style="border-radius: 25px">
          <div class="card-content" style="border-radius: 25px; padding: 10px;">
            <a class="modal-trigger no-autoinit" :href="'#openvideo' + modalName || ''">
              <img :src="imageVideo || imageVideoEnglish" alt="" class="imagem-video" >
            </a>
              <!--
              <iframe
                width="100%"
                height="100%"
                style="position:  absolute;
                      top: 0;
                      left: 0;
                      bottom: 0;
                      right: 0;
                      text-align: center;
                      padding: 10px;"
                :src="srcVideo" 
                allow="autoplay; fullscreen"
                frameborder="0" >
              </iframe>
              -->
          </div>
        </div>

        <modal-video-vue :idmodal="'openvideo' + modalName || ''">
          <span>
              <div class="wide-div">
                    <iframe
                      width="100%"
                      height="100%"
                      style="position:  absolute;
                            top: 0;
                            left: 0;
                            bottom: 0;
                            right: 0;
                            text-align: center;
                            padding: 10px;"
                      :src="srcVideo" 
                      allow="autoplay; fullscreen"
                      frameborder="0" >
                    </iframe>
              </div>
          </span>
        </modal-video-vue>
      </div>
</template>

<script>
import ModalVideoVue from '@/components/dialog/ModalVideoVue'
import imageVideoEnglish from "@/assets/images/elements/play-video-english.jpg"
export default {
  name: 'CardVideoVue',
        
  components: {
    ModalVideoVue
  },
  props:['srcVideo','modalName','imageVideo'],
  data () {
    return {
      imageVideoEnglish : imageVideoEnglish,
    }
  },
  
  mounted () {
    var modals = document.querySelectorAll('.modal');
    var iframes = document.getElementsByTagName('iframe');
    var instances = M.Modal.init(modals, {
                                          onCloseEnd: function() { // Callback for Modal close
                                            //alert('Closed');
                                            for (let cont = 0; cont < iframes.length; cont++) {
                                              let iframeSrc = iframes[cont].src;
		                                          iframes[cont].src = iframeSrc;
                                            };                                            
                                          }
                                        }
                                );

  },
  methods: {
    getImgUrl(pic) {
      if(pic != null){
        return require('@/assets/'+pic)
      } else{
        return null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .imagem-video{
    width: 100%;
    height:auto;
    border-radius: 25px;
  }

  .wide-div{
    padding-top: calc((9 / 16) * 100%);
  }
  
  .card .content-video-modal {
    position: relative ;
    padding-top: 56.25%;
  }

  .imagem-video:hover {
    transform: scale(1.02);
    transition: 0.2s;
}

</style>
