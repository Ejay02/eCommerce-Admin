<template>
  <div class="mt-4 card p-4">
    <div class="text-end mb-3">
      <span class="ce" @click="togglePreview">{{
        showPreview ? "Continue editing " : "Preview"
      }}</span>
      ✨
    </div>

    <div v-if="!showPreview">
      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <input
                type="text"
                id="title"
                v-model="formData.title"
                class="form-control"
                required
                autofocus
                placeholder="Blog Title"
                aria-label="Blog Title"
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                id="category"
                v-model="formData.category"
                class="form-control"
                required
                placeholder="Blog Category"
                aria-label="Blog Category"
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                id="author"
                v-model="formData.author"
                class="form-control"
                required
                placeholder="Author name"
                aria-label="Author name"
              />
            </div>

            <div class="mb-3">
              <input
                type="text"
                id="image"
                v-model="formData.image"
                class="form-control"
                required
                placeholder="Blog Image url"
                aria-label="Image url"
              />
            </div>
          </form>
        </div>
        <div class="col-md-6 mb-4">
          <div class="mb-5 quill">
            <QuillEditor
              ref="quillEditor"
              theme="snow"
              rows="12"
              placeholder="Get creative here... 🌠"
              v-model:content="formData.description"
              content-type="html"
              aria-label="Blog Description"
            />
          </div>
        </div>
        <!-- two -->

        <!-- end -->
      </div>
      <div class="text-end mt-3">
        <router-link
          type="submit"
          to="/admin/blog/blog-list"
          class="btn mt-3 gap-5 bn"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          class="btn btn-primary mt-3"
          @click="handleSubmit"
        >
          Update
        </button>
      </div>
    </div>

    <div v-else>
      <!-- preview page -->
      <BlogPreview :formData="formData" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";

import { useRoute } from "vue-router";
import router from "@/router";
import BlogPreview from "@/components/blogPreview.vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();
const route = useRoute();

const quillEditor = ref(null);

const formData = ref({
  title: "",
  category: "",
  author: "",
  image: "",
  description: "",
});

const showPreview = ref(false);

const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

const fetchBlogDetails = async () => {
  const blogId = route.params.id;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/blog/${blogId}`
    );

    Object.assign(formData.value, response.data);
    if (quillEditor.value) {
      quillEditor.value.editor.setContents(
        quillEditor.value.editor.clipboard.convert(response.data.description)
      );
    }
  } catch (error) {
    notify("Error fetching blog details");
  }
};

watch(formData, (newVal) => {
  if (quillEditor.value) {
    quillEditor.value.editor.setContents(
      quillEditor.value.editor.clipboard.convert(newVal.description)
    );
  }
});

const handleSubmit = async () => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/blog/${route.params.id}`,
      formData.value
    );
    if (response.data) {
      notify("Blog updated successfully!", "success");
      router.push("/admin/blog/blog-list");
    }
  } catch (error) {
    notify("Error updating blog: " + error.response.data.message, "error");
  }
};

onMounted(() => {
  fetchBlogDetails();
});
</script>

<style scoped>
.uploading-image {
  border-radius: 5px;
  max-width: 50%;
  height: auto;
}

.xi {
  color: gray;
  font-size: 12px;
}

.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.quill {
  height: 200px;
}

.upload-list-inline :deep(.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}

.row input::placeholder,
.span {
  color: gray;
  font-size: 12px;
}

.bn {
  border: 1px solid gray;
  margin-right: 8px;
  color: gray;
}

.ce {
  font-size: 12px;
  text-decoration-line: underline;
}
</style>
