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
              placeholder="Product Name"
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              id="category"
              v-model="formData.category"
              class="form-control"
              required
              placeholder="Product Slug"
            />
          </div>
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
            <input
              type="text"
              id="tags"
              v-model="formData.tag"
              class="form-control"
              required
              placeholder="Tags"
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
              <upload-outlined></upload-outlined>
              <i class="bi bi-upload m-2"></i>
              <span> upload Image(s) </span>
            </a-button>
          </a-upload>
        </form>
      </div>
      <div class="col-md-6">
        <div class="mb-4 quill">
          <QuillEditor
            v-model:content="formData.description"
            theme="snow"
            placeholder="Product description"
          />
        </div>

        <!-- category -->
        <div class="mb-3 mt-5">
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
      </div>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-primary mt-3">Create</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { h } from "vue";
import {
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";

const items = [
  {
    title: "Add Product deets",
    status: "finish",
    icon: h(LoadingOutlined),
  },
  {
    title: "Preview",
    status: "wait",
    // status: "finish",
    icon: h(SolutionOutlined),
  },

  {
    title: "Post",
    status: "wait",
    icon: h(SmileOutlined),
  },
];

const formData = ref({
  title: "",
  description: "",
  category: "",
  author: "",
  price: 100,
  tag: "",
  color: "",
  images: [],
  brand: "",
  quantity: 0,
});

const handleSubmit = () => {
  // Handle form submission logic here
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


