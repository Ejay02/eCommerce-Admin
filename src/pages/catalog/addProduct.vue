<template>
  <div class="mt-4 card p-4">
    <a-steps :items="items" class="mb-3"></a-steps>

    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="handleSubmit">
          <!-- title -->
          <div class="mb-3 mt-2">
            <input
              type="text"
              id="title"
              v-model="formData.title"
              class="form-control"
              required
              autofocus
              placeholder="Product Name"
            />
          </div>
          <!-- slug -->
          <div class="mb-3">
            <input
              type="text"
              id="slug"
              v-model="formData.slug"
              class="form-control"
              required
              placeholder="Product Slug"
            />
          </div>
          <!-- price -->
          <div class="mb-3">
            <input
              type="number"
              id="price"
              v-model="formData.price"
              class="form-control"
              required
              placeholder="Price"
              min="1"
            />
          </div>
          <!-- tags -->
          <div class="mb-3">
            <!-- tag -->
            <div class="tags mb-2">
              <span
                v-for="(tag, index) in tags"
                :key="index"
                class="category-tag"
              >
                {{ tag }}
                <span class="remove-tag" @click="removeTag(index)">x</span>
              </span>
            </div>
            <!--  -->
            <input
              type="text"
              id="tags"
              v-model="tagInput"
              class="form-control"
              required
              placeholder="Add new tag and press Enter"
              @keyup="addTags"
            />
          </div>

          <!-- color -->
          <div class="mb-3">
            <input
              type="text"
              id="color"
              v-model="formData.color"
              class="form-control"
              required
              placeholder="Color"
            />
          </div>

          <a-upload
            list-type="picture"
            class="upload-list-inline"
            v-model:fileList="formData.images"
          >
            <a-button class="span">
              <i class="bi bi-upload m-2"></i>
              <span> upload Image(s) </span>
            </a-button>
          </a-upload>
        </form>
      </div>
      <div class="col-md-6 mb-4">
        <!-- category -->
        <div class="mb-3 mt-2">
          <input
            type="text"
            id="category"
            v-model="formData.category"
            class="form-control"
            required
            placeholder="Category"
          />
        </div>
        <!-- brand -->
        <div class="mb-3">
          <input
            type="text"
            id="brand"
            v-model="formData.brand"
            class="form-control"
            required
            placeholder="Brand"
          />
        </div>
        <!-- quantity -->
        <div class="mb-3">
          <input
            type="number"
            id="quantity"
            v-model="formData.quantity"
            class="form-control"
            required
            placeholder="Quantity"
            min="1"
          />
        </div>
        <!-- desc -->
        <div class="quill mt-2 mb-5">
          <QuillEditor
            v-model:content="formData.description"
            theme="snow"
            placeholder="Product description"
            ref="quillEditor"
            content-type="html"
          />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="text-end">
      <button
        type="submit"
        class="btn btn-primary mt-3"
        @click="handleSubmit"
        :disabled="!isFormFilled"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { h } from "vue";
import axios from "axios";
import {
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";

import router from "@/router";

import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const items = [
  {
    title: "Add Product deets",
    status: "finish",
    icon: h(LoadingOutlined),
  },
  {
    title: "Preview",
    status: "wait",
    icon: h(SolutionOutlined),
  },
  {
    title: "Post",
    status: "wait",
    icon: h(SmileOutlined),
  },
];

const quillEditor = ref(null);

const tags = ref([]);
const tagInput = ref("");

const addTags = (event) => {
  if (event.key === "," || event.key === "Enter") {
    const newTag = tagInput.value.trim();
    if (newTag) {
      tags.value.push(newTag.replace(/,$/, "")); // Remove trailing comma if present
      tagInput.value = ""; // Clear the input
    }
  }
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
};

const formData = ref({
  title: "",
  description: "",
  category: "",
  slug: "",
  price: "",
  tags: "",
  color: "",
  images: [],
  brand: "",
  quantity: "",
});

const isFormFilled = computed(() => {
  return (
    formData.value.title &&
    formData.value.description &&
    formData.value.category &&
    formData.value.slug &&
    formData.value.price &&
    tags.value.length > 0 &&
    formData.value.color &&
    formData.value.images.length > 0 &&
    formData.value.brand &&
    formData.value.quantity
  );
});

const handleSubmit = async () => {
  if (!quillEditor.value) {
    notify("Error with Quill Editor instance", "error");
    return;
  }

  const description = quillEditor.value.getText();
  formData.value.description = description;
  formData.value.tags = tags.value;

  if (!isFormFilled.value) {
    notify("Please fill in all required fields", "error");
    return;
  }

  try {
    const formDataToSend = new FormData();

    // Append text fields
    Object.keys(formData.value).forEach((key) => {
      if (key !== "images" && key !== "tags") {
        formDataToSend.append(key, formData.value[key]);
      }
    });

    // Append tags as separate entries
    formData.value.tags.forEach((tag, index) => {
      formDataToSend.append(`tags[${index}]`, tag);
    });

    // Append images
    formData.value.images.forEach((file) => {
      formDataToSend.append("images", file.originFileObj);
    });

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/product`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data) {
      notify("Product added successfully!", "success");
    }
    router.push("/admin/product/product-list");
  } catch (error) {
    notify(
      "Error adding product: " +
        (error.response?.data?.message || error.message),
      "error"
    );
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
  height: auto;
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
  height: 65px;
}

.upload-list-inline :deep(.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}

.upload-list-inline [class*="-upload-list-rtl"] :deep(.ant-upload-list-item) {
  float: right;
}

.row input::placeholder,
.span,
#quantity,
#price {
  color: gray;
  font-size: 12px;
}
</style>
