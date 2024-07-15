<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4 text-capitalize"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    <div v-if="blogs.length">
      <div v-for="blog in blogs" :key="blog._id" class="blog-item">
        <img
          :src="blog.image || 'https://via.placeholder.com/150'"
          alt="Blog Image"
          class="blog-image"
        />
        <div class="blog-content">
          <h4>{{ blog.title }}</h4>
          <p>{{ blog.description }}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="category-tag">{{ blog.category }}</span>
            <span class="text-muted">{{ blog.author }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No blogs available</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const blogs = ref([
  {
    _id: "1",
    title: "First Blog Post",
    description: "This is a description for the first blog post.",
    category: "Tech",
    author: "John Doe",
    image: "",
  },
  {
    _id: "2",
    title: "Second Blog Post",
    description: "This is a description for the second blog post.",
    category: "Lifestyle",
    author: "Jane Doe",
    image: "",
  },
  {
    _id: "3",
    title: "Third Blog Post",
    description: "This is a description for the third blog post.",
    category: "Travel",
    author: "Admin",
    image: "",
  },
]);
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
}

.blog-item {
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ccc;
}

.blog-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 16px;
  border-radius: 5px;
}

.blog-content {
  flex: 1;
}

.blog-content h4,
.blog-content p {
  color: gray;
}

.category-tag {
  background-color: aliceblue;
  color: gray;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>
