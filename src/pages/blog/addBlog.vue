<template>
  <div class="mt-4 card p-4">
    <span class="mb-4 text-end">Preview</span>
    <!--  -->

    <a-steps :items="items" class="mb-3"></a-steps>

    <!--  -->

    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              id="title"
              v-model="formData.title"
              class="form-control"
              required
              autofocus
            />
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <input
              type="text"
              id="category"
              v-model="formData.category"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="author" class="form-label">Author</label>
            <input
              type="text"
              id="author"
              v-model="formData.author"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="images" class="form-label">Images</label>
            <input
              type="file"
              id="images"
              ref="fileInput"
              multiple
              class="form-control"
            />
            <small class="text-muted">Select multiple images to upload.</small>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <div class="mb-3 quill">
          <QuillEditor
            theme="snow"
            rows="12"
            placeholder="Get creative here... 🌠"
          />
        </div>
      </div>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-primary">Create</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { h } from "vue";
import {
  // UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";
const items = [
  {
    title: "Create blog",
    status: "finish",
    icon: h(LoadingOutlined),
  },
  {
    title: "Verify details",
    status: "wait",
    // status: "finish",
    icon: h(SolutionOutlined),
  },
  // {
  //   title: "Preview",
  //   status: "process",
  //   icon: h(LoadingOutlined),
  // },
  {
    title: "Done",
    status: "wait",
    icon: h(SmileOutlined),
  },
];

const formData = ref({
  title: "",
  description: "",
  category: "",
  author: "",
  images: [],
});

const handleSubmit = () => {
  // Handle form submission logic here
};
</script>

<style scoped>
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
  height: 300px;
}
</style>
