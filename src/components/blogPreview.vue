<template>
  <div>
    <h3 class="title">{{ formData.title }}</h3>
    <span class="author mb-2">{{ formData.author }}</span> <br />
    <p class="date">{{ new Date().toLocaleDateString() }}</p>
    <span class="category-tag">{{ formData.category }}</span>
    <!-- <span>
      <span
        v-for="(category, index) in categories"
        :key="index"
        class="category-tag"
      >
        {{ category }}
      </span></span
    > -->

    <img
      :src="formData.image"
      class="img-fluid blog-image my-4 w-100"
      alt="Blog Image"
    />
    <div class="desc" v-html="formData.description"></div>
  </div>
</template>

<script setup>
defineProps({
  formData: Object,
  // categories: Array,
});
</script>

<style scoped>
.single-blog-card {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.blog-image {
  /* width: 100px; */
  height: 200px;
  border-radius: 5px;
  display: block;
}

.ce {
  font-size: 10px;
  text-decoration-line: underline;
}

.title {
  color: black;
  margin-bottom: 0px;
}

.date {
  font-size: 10px;
  color: gray;
  margin-bottom: 0px;
}

.author {
  font-size: 15px;
  color: gray;
}
</style>
