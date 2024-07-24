<template>
  <div class="mt-4 card" v-if="blogs.length">
    <div class="d-flex justify-content-between"></div>
    <div class="m-5">
      <div v-for="blog in blogs" :key="blog._id" class="blog-item">
        <img
          :src="blog?.image || 'https://via.placeholder.com/150'"
          alt="Blog Image"
          class="blog-image"
        />
        <div class="blog-content">
          <h4>{{ blog.title }}</h4>
          <p>{{ blog.description }}</p>

          <h6 class="text-muted mb-3">{{ blog?.author }}</h6>
          <span class="category-tag">{{ blog?.category }}</span>
        </div>
        <button class="btn ml-5" @click="handleDelete(blog._id)">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <Empty />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Empty from "@/components/empty.vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();
const blogs = ref([]);

const handleFetchBlogs = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog`);

    if (response.data) {
      blogs.value = response.data;
    }
  } catch (error) {
    notify("Error fetching blogs", "error");
  }
};

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/blog/${id}`
    );

    if (response.data) {
      blogs.value = blogs.value.filter((blog) => blog._id !== id);
      notify("Blog deleted successfully!", "success");
    }
  } catch (error) {
    notify("Error deleting blog", "error");
  }
};

onMounted(() => {
  handleFetchBlogs();
});
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
  background-color: rgb(152, 182, 209);
  /* color: gray; */
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
}

.blog-content h6 {
  font-size: 12px;
}

.btn {
  text-decoration: none;
  border: none;
}
</style>
