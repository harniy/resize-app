<template>
  <div class="crope_app">
    <h1>Выберите изображение:</h1>
    <div class="crope_button">
      <input
        type="file"
        id="imageFile"
        accept=".jpg, .jpeg, .png"
        @change="getImage"
      />
      <label for="imageFile" class="material-button" v-if="!isCrope"
        >Загрузить</label
      >
      <div v-else>
        <a
          :href="destination"
          for="imageFile"
          class="material-button"
          download
          @click="saveCrop"
          >Сохранить</a
        >
        <a for="imageFile" class="material-button" @click="isModal = true; saveCrop()"
          >Превью</a
        >
      </div>

      <div class="modal" v-if="isModal">
        <div class="modal_wrapper">
          <div class="modal_header">
            <h1>Превью</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#4d565e"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              @click="isModal = false"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </div>

          <hr />
          <img :src="destination" alt="" />
          <p>что бы сохранить изображение, сделайте правый клик мышкой и нажмите "сохранить как"</p>
        </div>
      </div>
    </div>
    <div ref="crope_field" class="crope_image">
      <img ref="image" :src="srcImage" alt="" v-if="!image" />
    </div>
    <!--     <div class="crope_prev" @keypress.enter="test">
      <img :src="destination" alt="" class="img_prev" />
    </div> -->
  </div>
</template>


<script>
import Cropper from "cropperjs";

export default {
  name: "ImageCropper",
  data() {
    return {
      srcImage: "/image.png",
      cropper: {},
      destination: {},
      image: false,
      isCrope: false,
      isModal: false,
    };
  },
  methods: {
    getImage(e) {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        let img = document.createElement("img");
        img.src = e.target.result;

        this.$refs.crope_field.appendChild(img);

        this.cropper = new Cropper(img, {
          zoomable: false,
          scalable: false,
          aspectRatio: 1,
          /*     crop: () => {
            const canvas = this.cropper.getCroppedCanvas();
            this.destination = canvas.toDataURL("image/jpg");
          }, */
        });
      };
      this.image = true;
      this.isCrope = true;
    },
    saveCrop() {
      const canvas = this.cropper.getCroppedCanvas();
      this.destination = canvas.toDataURL("image/jpg");
    },

  },
};
</script>


<style>
input#imageFile {
  display: none;
}
.crope_button {
  padding: 10px 0 40px 0;
}
.crope_image {
  width: 60%;
  height: 400px;
  margin: 0 auto;
}
.img_prev {
  width: 300px;
  border: 1px solid #448aff73;
}
/* MODAL */
.modal {
  background: #5858585e;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 100;
}
.modal_wrapper {
  background: #fff;
  width: 70%;
  height: 500px;
  border-radius: 10px;
}
.modal_header {
  position: relative;
}

.modal_wrapper img {
  max-height: 75%;
}
.modal_wrapper svg {
  top: -10px;
  position: absolute;
  right: 15px;
  cursor: pointer;
}
</style>