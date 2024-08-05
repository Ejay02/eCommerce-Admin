<template>
  <div class="mt-4 card p-4">
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
            <div class="tags mb-2">
              <span
                v-for="(tag, index) in formData.tags"
                :key="index"
                class="category-tag"
              >
                {{ tag }}
                <span class="remove-tag" @click="removeTag(index)">x</span>
              </span>
            </div>
            <!--  -->

            <input
              v-model="newTag"
              type="text"
              id="tags"
              class="form-control"
              placeholder="Add new tag and press Enter"
              @keyup.enter="addTag"
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
            v-model:fileList="fileList"
            :beforeUpload="() => false"
          >
            <!-- v-model:fileList="formData.images" -->
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
    <div class="text-end mt-3">
      <router-link
        type="submit"
        to="/admin/product/product-list"
        class="btn mt-3 gap-5 bn"
      >
        Cancel
      </router-link>
      <button type="submit" class="btn btn-primary mt-3" @click="handleSubmit">
        Update
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import router from "@/router";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const quillEditor = ref(null);
const route = useRoute();

const newTag = ref("");

const addTag = () => {
  let tag = newTag.value.trim();
  tag = tag.replace(/,+$/, "").replace(/^,+/, "");
  if (tag && !formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag);
    newTag.value = "";
  }
};

const removeTag = (index) => {
  formData.value.tags.splice(index, 1);
};

const formData = ref({
  title: "",
  description: "",
  category: "",
  slug: "",
  price: "",
  tags: [],
  color: "",
  images: [],
  brand: "",
  quantity: "",
});

const fetchProductDetails = async () => {
  const productId = route.params.id;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/product/${productId}`
    );

    Object.assign(formData.value, response.data);
  } catch (error) {
    notify("Error fetching product details", "warning");
  }
};

watch(formData, (newVal) => {
  if (quillEditor.value) {
    quillEditor.value.editor.setContents(
      quillEditor.value.editor.clipboard.convert(newVal.description)
    );
  }
});
const fileList = ref([]);

const handleSubmit = async () => {
  try {
    // Create a new FormData instance
    const formDataToSend = new FormData();

    // Append text fields
    Object.keys(formData.value).forEach((key) => {
      if (key !== "images") {
        formDataToSend.append(key, formData.value[key]);
      }
    });

    // Append images
    fileList.value.forEach((file) => {
      if (file.originFileObj) {
        formDataToSend.append("images", file.originFileObj);
      }
    });

    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/product/${route.params.id}`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data) {
      notify("Product edited successfully!", "success");
    }
    router.push("/admin/product/product-list");
  } catch (error) {
    notify(
      "Error editing product: " +
        (error.response?.data?.message || error.message),
      "error"
    );
  }
};

onMounted(() => {
  fetchProductDetails();
});
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
