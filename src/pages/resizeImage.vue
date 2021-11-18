<template>
  <div class="resize_app">
    <h1>{{ info }}</h1>
    <div class="resize_image">
      <div class="drug_area" :class="{ dragging: isDragging }">
        <input
          ref="image"
          id="file"
          class="image_brows"
          type="file"
          accept=".jpg, .jpeg, .png"
          @dragenter="isDragging = true"
          @dragleave="isDragging = false"
          @keypress.enter="resizeImage"
          @change="isDragging = true"
        />
        <label for="file">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :fill="isDragging ? '#448aff' : '#7d7d7d'"
            width="48px"
            height="48px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"
            /></svg>
            <p v-if="!isDragging">Перетащите изображение сюда или кликните на поле</p>
            </label>
      </div>
      <button class="material-button" @click="resizeImage">применить</button>
      <a :href="saveImage" class="material-button" download v-if="isResize">Сохранить</a>
      <h3>Настройки изображения</h3>
      <ul class="inputs-list">
        <li>
          <p>ширина : {{ imgWidth }}</p>
          <input type="number" class="customSize" v-model="imgWidth" />
        </li>

        <li>
          <p>качество: {{ quality }}</p>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value="0.4"
            v-model="quality"
          />
        </li>
      </ul>
      <div class="img_output">
        <p v-if="imageSize">размер изображения: {{ imageSize }}/kb</p>
        <img alt="" id="out" />
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      imgWidth: 400,
      info: "Поменять размер изображения",
      isDragging: false,
      quality: 0.4,
      imageSize: null,
      saveImage: '',
      isResize: false
    };
  },
  methods: {

    resizeImage() {
      const file = this.$refs.image.files[0];

      if (!file) {
        return (this.info = "Выберите изображение...");
      }

      this.isResize = true
      this.isDragging = true

      this.info = "Поменять размер изображения";
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (event) => {
        this.createImg(event);
      };
    },
    createImg(event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;

      imgElement.onload = (e) => {
        this.compressImg(e);
      };
    },
    compressImg(e) {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = this.imgWidth;

      const scaleSize = MAX_WIDTH / e.target.width;

      canvas.width = MAX_WIDTH;
      canvas.height = e.target.height * scaleSize;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

      const srcEncoded = ctx.canvas.toDataURL("image/jpeg", +this.quality);

      this.saveImage = srcEncoded

      document.querySelector("#out").src = srcEncoded;
      //Размер изображения
      const imgSize = (srcEncoded.length * (3 / 4)) / 1024;
      //toFixed показывает определенное количество знаков после запятой
      this.imageSize = imgSize.toFixed(2);
    },
    
  },
};
</script>


<style >

p {
  font-size: 20px;
  letter-spacing: 1.7px;
  font-weight: 800;
  margin: 0 0 5px;
  font-family: "Open Sans Condensed", sans-serif;
  color: #6f7b88;
}
h3 {
    font-family: "Open Sans Condensed", sans-serif;
    margin: .8rem;
    font-size: 24px;
}
.drug_area {
  background: #cbcbcb33;
  width: 30%;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 20px;
  border: 3px dashed #c8c8c8;
  border-radius: 15px;
  transition: 0.2s;
}
.dragging {
  border: 3px dashed #448aff;
  background: #fff;
}
.drug_area:hover {
  background: #ececec;
  border: 3px dashed #8d8d8d;
}
.drug_area label p {
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 5px;
    font-family: "Open Sans Condensed", sans-serif;
    color: #6f7b88;
    letter-spacing: .2px;
}
input.image_brows {
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

input[type="range"] {
  margin-top: 7px;
}
.drug_area label {
  position: relative;
  bottom: 70%;
  cursor: pointer;
}
.material-button {
  padding: 9px 35px;
  font-size: 1.8rem;
  font-family: "Roboto", sans-serif;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background: #448aff;
  border: 0;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 30%);
  transition: all 200ms ease-in-out;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}
.customSize {
  margin-bottom: 20px;
  margin-top: 5px;
}
ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
}
ul li {
  padding: 0 20px;
  font-family: "Open Sans Condensed", sans-serif;
}
a.material-button {
    display: block;
    width: 145px;
    margin: 0 auto;
    margin-top: 20px;
    text-decoration: none;
}
img#out {
    max-width: 95%;
}

@media screen and (max-width: 450px) {
  .inputs-list {
    flex-direction: column;
  }
}
</style>