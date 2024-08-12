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

          <!-- Colors -->
          <div class="mb-3">
            <div class="colors mb-2">
              <span
                v-for="(color, index) in colors"
                :key="index"
                class="color-tag"
                :style="{ backgroundColor: color }"
              >
                {{ color }}
                <span class="remove-color" @click="removeColor(index)">x</span>
              </span>
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
                class="form-control ms-2"
                placeholder="Enter color name or hex"
              />
              <button @click.prevent="addColor" class="btn btn-secondary ms-2">
                Add Color
              </button>
            </div>
          </div>

          <!-- color -->
          <!-- <div class="mb-3">
            <input
              type="text"
              id="color"
              v-model="formData.color"
              class="form-control"
              required
              placeholder="Color"
            />
          </div> -->

          <!-- img -->
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
          <div class="mb-2" v-if="formData.title">
            <button
              @click="generateProductDesc"
              class="btn btn-secondary gbc"
              :disabled="!formData.title || isGenerating"
            >
              {{
                isGenerating ? "Generating..." : "Generate Product description?"
              }}
            </button>
          </div>
          <div v-if="isGenerating" class="d-flex">
            <i class="bi bi-exclamation-triangle me-2 text-center"></i>
            <span class="warn mb-2"
              >Might be some errors, repetition or inconsistency in the
              generated text. You might need to do some manual editing of the
              final result.</span
            >
          </div>
          <div class="mb-5 quill">
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
    </div>
    <!-- Button -->
    <div class="text-end mt-3">
      <button
        type="submit"
        class="btn btn-primary mt-4"
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
import router from "@/router";
import {
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons-vue";

import aiService from "@/utils/aiService";

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

const colors = ref([]);
const colorInput = ref("#000000");

const isGenerating = ref(false);

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

const addColor = () => {
  if (colorInput.value && !colors.value.includes(colorInput.value)) {
    colors.value.push(colorInput.value);
    colorInput.value = "#000000"; // Reset to default color
    console.log("Color added:", colors.value); // Debug log
  }
};

const removeColor = (index) => {
  colors.value.splice(index, 1);
};

const formData = ref({
  title: "",
  description: "",
  category: "",
  slug: "",
  price: "",
  tags: "",
  colors: "",
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
    colors.value.length > 0 &&
    // formData.value.color &&
    formData.value.images.length > 0 &&
    formData.value.brand &&
    formData.value.quantity
  );
});

const generateProductDesc = async () => {
  if (!formData.value.title) {
    notify("Please enter a product title first", "error");
    return;
  }
  isGenerating.value = true;
  try {
    let fullContent = "";
    const numberOfGenerations = 5;

    for (let i = 0; i < numberOfGenerations; i++) {
      let prompt;
      if (i === 0) {
        prompt = `Write a compelling and informative product description for: ${formData.value.title}. Highlight the key features, benefits and unique selling points. Address the target audience's needs, pain points and interests. Use a friendly and motivational tone and include a clear call-to-action`;
      } else {
        prompt = `Continue the following description: ${fullContent.slice(
          -100
        )}`;
      }
      let generatedContent = await aiService.generateContent(prompt);

      // Remove the prompt if it's included in the response
      const promptIndex = generatedContent.indexOf(prompt);
      if (promptIndex !== -1) {
        generatedContent = generatedContent
          .substring(promptIndex + prompt.length)
          .trim();
      }

      fullContent += " " + generatedContent;
    }
    formData.value.description = fullContent.trim();
    notify("Product description generated successfully!", "success");
  } catch (error) {
    notify("Error generating product description", "error");
  } finally {
    isGenerating.value = false;
  }
};

const handleSubmit = async () => {
  if (!quillEditor.value) {
    notify("Error with Quill Editor instance", "error");
    return;
  }

  const description = quillEditor.value.getText();
  formData.value.description = description;
  formData.value.tags = tags.value;
  formData.value.colors = colors.value;

  console.log("Colors array:", colors.value); // Debug log
  console.log("FormData before submission:", formData.value); // Debug log

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

    // Append colors as separate entries
    formData.value.colors.forEach((color, index) => {
      formDataToSend.append(`colors[${index}]`, color);
    });

    console.log(
      "FormData after preparation:",
      Object.fromEntries(formDataToSend)
    ); // Debug log

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

.gbc {
  font-size: 10px;
}

.warn {
  font-size: 10px;
  color: gray;
}

.bi {
  color: #d46b08;
}
</style>
