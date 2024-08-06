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
              <!-- v-for="(tag, index) in formData.tags" -->
              <span
                v-for="(tag, index) in processedTags"
                :key="index"
                class="category-tag"
              >
                {{ tag }}
                <span class="remove-tag" @click="removeTag(index)">x</span>
              </span>
            </div>

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
            <div
              v-for="(color, index) in processedColors"
              :key="index"
              class="color-tag border"
              :style="{ backgroundColor: color }"
            >
              {{ color }}
              <span @click="removeColor(index)" class="remove-color">x</span>
            </div>

            <div class="d-flex">
              <input
                type="color"
                id="colorPicker"
                v-model="colorInput"
                class="form-control form-control-color"
              />
              <input
                type="text"
                v-model="colorInput"
                class="form-control ms-2 color"
                placeholder="Enter color name or hex"
              />
              <button
                @click.prevent="addColor"
                class="cbtn btn ms-2 text-center"
              >
                + Add
              </button>
            </div>
          </div>

          <!-- image -->
          <a-upload
            list-type="picture"
            class="upload-list-inline"
            v-model:fileList="fileList"
            :beforeUpload="() => false"
          >
            <a-button class="span">
              <i class="bi bi-upload m-2"></i>
              <span> upload Image(s) </span>
            </a-button>
          </a-upload>
        </form>
      </div>
      <!-- right -->
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
    <!-- button -->
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
import { computed } from "vue";

const { notify } = useNotifications();

const quillEditor = ref(null);
const route = useRoute();

const newTag = ref("");
const colorInput = ref("");

const formData = ref({
  title: "",
  description: "",
  category: "",
  slug: "",
  price: "",
  tags: [],
  colors: [],
  images: [],
  brand: "",
  quantity: "",
});

const processedTags = computed(() => {
  if (typeof formData.value.tags === "string") {
    return formData.value.tags
      .split(/,{1,2}|\s+/)
      .filter((tag) => tag.trim() !== "");
  } else if (Array.isArray(formData.value.tags)) {
    return formData.value.tags.flatMap((tag) =>
      typeof tag === "string"
        ? tag.split(/,{1,2}|\s+/).filter((t) => t.trim() !== "")
        : []
    );
  }
  return [];
});

const processedColors = computed(() => {
  if (typeof formData.value.colors === "string") {
    return formData.value.colors
      .split(/,{1,2}|\s+/)
      .filter((color) => color.trim() !== "");
  } else if (Array.isArray(formData.value.colors)) {
    return formData.value.colors.flatMap((color) =>
      typeof color === "string"
        ? color.split(/,{1,2}|\s+/).filter((c) => c.trim() !== "")
        : []
    );
  }
  return [];
});

const addTag = () => {
  let tag = newTag.value.trim();
  if (tag && !processedTags.value.includes(tag)) {
    if (Array.isArray(formData.value.tags)) {
      formData.value.tags.push(tag);
    } else {
      formData.value.tags = [tag];
    }
    newTag.value = "";
  }
};

const removeTag = (index) => {
  const updatedTags = processedTags.value.filter((_, i) => i !== index);
  formData.value.tags = updatedTags;
};

const addColor = () => {
  let color = colorInput.value.trim();
  if (color && !processedColors.value.includes(color)) {
    if (Array.isArray(formData.value.colors)) {
      formData.value.colors.push(color);
    } else {
      formData.value.colors = [color];
    }
    colorInput.value = ""; // Reset colorInput after adding
  }
};

const removeColor = (index) => {
  const updatedColors = processedColors.value.filter((_, i) => i !== index);
  formData.value.colors = updatedColors;
};

const fetchProductDetails = async () => {
  const productId = route.params.id;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/product/${productId}`
    );

    if (response.data.tags && typeof response.data.tags === "string") {
      response.data.tags = response.data.tags
        .split(/,{1,2}|\s+/)
        .filter((tag) => tag.trim() !== "");
    } else if (!Array.isArray(response.data.tags)) {
      response.data.tags = [];
    }

    if (response.data.colors && typeof response.data.colors === "string") {
      response.data.colors = response.data.colors
        .split(/,{1,2}|\s+/)
        .filter((color) => color.trim() !== "");
    } else if (!Array.isArray(response.data.colors)) {
      response.data.colors = [];
    }

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
    const formDataToSend = new FormData();

    Object.keys(formData.value).forEach((key) => {
      if (key !== "images") {
        formDataToSend.append(key, formData.value[key]);
      }
    });

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

.remove-color {
  cursor: pointer;
  margin-left: 5px;
}

.form-control-color {
  width: 50px;
}

.color-tag {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  color: white;
  position: relative;
}

.color {
  height: 38px;
}

.cbtn {
  height: 38px;
  font-size: 10px;
  /* text-align: center; */
  border-radius: 4px;
  /* padding: 2px; */
  background-color: cornflowerblue;

  /* margin-left: 10px; */
}
</style>
