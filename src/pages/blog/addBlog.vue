<template>
  <div class="mt-4 card p-4">
    <div class="text-end mb-3">
      <span
        class="ce"
        :class="{ disabled: !isFormFilled }"
        @click="togglePreview"
        :style="{ cursor: isFormFilled ? 'pointer' : 'not-allowed' }"
        >{{ showPreview ? "Continue writing" : "Preview" }}</span
      >
      ✨
    </div>

    <div v-if="!showPreview">
      <!-- edit page -->
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
          <div class="mb-2" v-if="formData.title">
            <button
              @click="generateBlogContent"
              class="btn btn-secondary gbc"
              :disabled="!formData.title || isGenerating"
            >
              {{ isGenerating ? "Generating..." : "Generate Blog Content?" }}
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
      </div>
      <!-- button -->
      <div class="text-end mt-3">
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

    <div v-else>
      <!-- preview page -->
      <BlogPreview :formData="formData" :categories="categories" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import router from "@/router";
import { ref, computed } from "vue";
import aiService from "@/utils/aiService";
import BlogPreview from "@/components/blogPreview.vue";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const quillEditor = ref(null);

const formData = ref({
  title: "",
  description: "",
  category: "",
  author: "",
  image: "",
});

const showPreview = ref(false);
const isGenerating = ref(false);

const togglePreview = () => {
  if (isFormFilled.value) {
    showPreview.value = !showPreview.value;
  }
};

const isFormFilled = computed(() => {
  return (
    formData.value.title &&
    formData.value.description &&
    formData.value.category &&
    formData.value.author &&
    formData.value.image
  );
});

const generateBlogContent = async () => {
  if (!formData.value.title) {
    notify("Please enter a blog title first", "error");
    return;
  }

  isGenerating.value = true;

  try {
    let fullContent = "";
    const numberOfGenerations = 8;

    for (let i = 0; i < numberOfGenerations; i++) {
      let prompt;
      if (i === 0) {
        prompt = `Write a comprehensive and engaging blog post on: ${formData.value.title}. Provide an introduction that grabs the reader's attention, followed by 3-5 key points that explore the topic in-depth`;
      } else {
        prompt = `Continue the following blog post: ${fullContent.slice(-100)}`;
      }

      let generatedContent = await aiService.generateContent(prompt);

      // Remove the prompt if it's included in the response
      const promptIndex = generatedContent?.indexOf(prompt);

      if (promptIndex !== -1) {
        generatedContent = generatedContent
          .substring(promptIndex + prompt.length)
          .trim();
      }

      fullContent += " " + generatedContent;
    }
    formData.value.description = fullContent.trim();
    notify("Blog content generated successfully!", "success");
  } catch (error) {
    notify("Error generating blog content", "error");
  } finally {
    isGenerating.value = false;
  }
};

const handleSubmit = async () => {
  // const description = quillEditor.value.root.innerHTML; // Get HTML content
  const description = quillEditor.value.getText();
  formData.value.description = description;

  // Validate form data
  if (!isFormFilled.value) {
    notify("Please fill in all required fields", "error");
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/blog`, {
      title: formData.value.title,
      description: formData.value.description,
      category: formData.value.category,
      author: formData.value.author,
      image: formData.value.image,
    });

    if (response.data) {
      notify("Blog created successfully!", "success");

      formData.value = {
        title: "",
        description: "",
        category: "",
        author: "",
        image: "",
      };

      router.push("/admin/blog/blog-list");
    }
  } catch (error) {
    notify("Error creating blog", "error");
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

.ce {
  color: #007bff;
  font-size: 12px;
  text-decoration-line: underline;
}

.ce.disabled {
  color: lightgray;
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
