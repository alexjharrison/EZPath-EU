<template>
  <transition name="modal">
    <div @click="$emit('closeModal')" class="modal-mask">
      <div @click.stop class="modal-vid">
        <div class="modal-top">
          <h3 class="modal-header">{{ text.instVid }}</h3>
          <button class="close-button" @click="$emit('closeModal')">Close</button>
        </div>
        <iframe
          height="100%"
          width="100%"
          :src="video"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["video", "text"],
  data() {
    return {};
  }
};
</script>

<style>
.modal-header {
  margin: 0 0 10px 0;
}

.modal-vid {
  background-color: white;
  padding: 20px;
  margin: 40px;
  z-index: 1000;
  width: 600px;
  height: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  transition: all 0.3s ease;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-button {
  margin-bottom: 8px;
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-vid,
.modal-leave-active .modal-vid {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (max-width: 740px) {
  .modal-vid {
    height: 53vw;
  }
}
</style>
