<template>
  <LoadingScreen v-if="blogStore.loading" />

  <div class="mt-4 card" v-if="blogStore.blogs.length">
    <div class="m-5">
      <div v-for="blog in blogStore.blogs" :key="blog._id" class="blog-item">
        <img
          :src="blog?.image || 'https://via.placeholder.com/150'"
          alt="Blog Image"
          class="blog-image"
        />
        <div class="blog-content">
          <h4>{{ blog.title }}</h4>
          <div
            class="desc"
            v-html="truncateDescription(blog.description)"
          ></div>

          <h6 class="text-muted mb-3">{{ blog?.author }}</h6>
          <span class="category-tag">{{ blog?.category }}</span>
        </div>
        <div class="d-flex">
          <router-link
            :to="{ name: 'edit', params: { id: blog._id } }"
            class="btn justify-content-center align-content-center"
          >
            <i class="bi bi-pencil-square"></i>
          </router-link>
          <button
            class="btn ml-5 x"
            @click="showDelModal(blog._id, blog.title, 'blogList')"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Empty />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Empty from "@/components/empty.vue";
import LoadingScreen from "@/components/loadingScreen.vue";
import { useBlogStore } from "@/store/useBlogStore";
import { useModalStore } from "@/store/useModalStore";

const blogStore = useBlogStore();
const modalStore = useModalStore();

const showDelModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

// Function to trim excess whitespace and truncate description to 80 words
const truncateDescription = (description) => {
  // Remove excess whitespace
  const cleanedDescription = description.replace(/\s+/g, " ").trim();
  // Split the cleaned description into words
  const words = cleanedDescription.split(" ");
  // Check if the number of words exceeds 80
  return words.length > 5
    ? words.slice(0, 5).join(" ") + "..."
    : cleanedDescription;
};

onMounted(async () => {
  await blogStore.fetchBlogs();
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
.x {
  color: red;
}
</style>
