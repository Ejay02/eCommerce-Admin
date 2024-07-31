<template>
  <div>
    <h3 class="title">{{ formData.title }}</h3>
    <p class="date">{{ new Date().toLocaleDateString() }}</p>
    <span class="author">{{ formData?.author }}</span> <br />
    <span class="category-tag">{{ formData?.category }}</span>

    <img
      :src="formData.image"
      class="img-fluid blog-image my-4 w-100"
      alt="Blog Image"
    />
    <div class="desc">
      <Markdown :source="formData.description" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Markdown from "vue3-markdown-it";

defineProps({
  formData: Object,
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

.category-tag {
  background-color: rgb(152, 182, 209);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
}

.title {
  color: black;
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
