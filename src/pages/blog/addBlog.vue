<template>
  <div class="mt-4 card p-4">
    <a-steps :items="items" class="mb-3"></a-steps>

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
          <!-- 
          <a-upload
            class="upload-list-inline"
            :max-count="1"
            v-model="formData.image"
            :auto-upload="false"
            aria-label="Upload Image"
          >
            <a-button class="span">
              <i class="bi bi-upload m-2"></i>
              <span>Upload Image</span>
            </a-button>
          </a-upload> -->

          <div>
            <img :src="formData.image" class="uploading-image mb-5" />
            <input
              class="xi"
              type="file"
              accept="image/jpeg"
              @change="handleImageUpload"
              ref="imageInput"
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
            v-model="formData.description"
            aria-label="Blog Description"
          />
        </div>
      </div>
    </div>
    <div class="text-end mt-3">
      <button type="submit" class="btn btn-primary mt-3" @click="handleSubmit">
        Create
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { h, ref } from "vue";
import {
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const quillEditor = ref(null);

const items = [
  {
    title: "Write blog",
    status: "finish",
    icon: h(LoadingOutlined),
    textValue: "Write blog",
  },
  {
    title: "Preview",
    status: "wait",
    icon: h(SolutionOutlined),
    textValue: "Preview",
  },
  { title: "Post", status: "wait", icon: h(SmileOutlined), textValue: "Post" },
];

const formData = ref({
  title: "",
  description: "",
  category: "",
  author: "",
  image: null,
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    formData.value.image = e.target.result;
  };

  reader.readAsDataURL(file);
};

const handleSubmit = async () => {
  const description = quillEditor.value.getText();
  formData.value.description = description;

  // Validate form data
  if (
    !formData.value.title ||
    !formData.value.description ||
    !formData.value.category ||
    !formData.value.author ||
    !formData.value.image
  ) {
    notify("Please fill in all required fields", "error");
    return;
  }

  // Create FormData object
  const form = new FormData();
  form.append("title", formData.value.title);
  form.append("description", formData.value.description);
  form.append("category", formData.value.category);
  form.append("author", formData.value.author);
  form.append("image", formData.value.image); // Append file

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/blog`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data) {
      notify("Blog created successfully!", "success");
      // Reset form data
      formData.value = {
        title: "",
        description: "",
        category: "",
        author: "",
        image: null,
      };
    }
  } catch (error) {
    notify("Error creating blog: " + error.response.data.message, "error");
  }
};
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
</style>
