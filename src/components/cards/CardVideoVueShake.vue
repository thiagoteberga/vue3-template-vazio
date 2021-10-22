<template>
      <div class="row">

        <!-- Modal Trigger -->
        <div class="card">
          <div class="card-content" style="padding: 10px;">
            <a class="modal-trigger" href="#openvideo">
              <img :src="imageVideo" alt="" class="imagem-video" >
            </a>
          </div>
        </div>

        <modal-video-vue idmodal="openvideo">
          <span>
              <div class="card">
                <div class="card-content" style="position: relative; width=100%; padding-top: 56.25%;">

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
              </div>
          </span>
        </modal-video-vue>
      </div>
</template>

<script>
import ModalVideoVue from '@/components/dialog/ModalVideoVue'
import imageVideo from "@/assets/images/elements/play-video.jpg"
export default {
  name: 'CardVideoVueShake',
        
  components: {
    ModalVideoVue
  },
  props:['srcVideo'],
  data () {
    return {
      imageVideo : imageVideo,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .imagem-video{
    width: 100%;
    height:auto;
  }
  .imagem-video:hover {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;

    /* When the animation is finished, start again */
    animation-iteration-count: 2s;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
