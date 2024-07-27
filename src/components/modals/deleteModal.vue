<template>
  <div
    v-if="isModalVisible"
    class="modal-overlay d-flex"
    @click.self="handleCancel"
  >
    <div class="modal-card">
      <div class="modal-header mb-2">
        <h3>Delete Confirmation</h3>
        <button class="close-button" @click="handleCancel">×</button>
      </div>
      <div class="modal-body mt-2">
        <p>
          Are you sure you want to delete
          <b>{{ title }}</b> ?
        </p>
      </div>
      <div class="modal-footer mt-2">
        <button class="cancel-button" @click="handleCancel">Cancel</button>
        <button class="ok-button" @click="handleDelete">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import { useModalStore } from "@/store/useModalStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useNotifications } from "@/composable/globalAlert.js";
import { useBlogStore } from "@/store/useBlogStore";

const { notify } = useNotifications();
const modalStore = useModalStore();
const isModalVisible = ref(modalStore.deleteModal);
const categoryStore = useCategoryStore();
const blogStore = useBlogStore();

const title = ref(modalStore.modalTitle);
const source = ref(modalStore.source);

watch(
  () => modalStore.deleteModal,
  (newVal) => {
    isModalVisible.value = newVal;
  }
);

watch(
  () => modalStore.modalTitle,
  (newVal) => {
    title.value = newVal;
  }
);

watch(
  () => modalStore.source,
  (newVal) => {
    source.value = newVal;
  }
);

const handleCancel = () => {
  modalStore.deleteModal = false;
  modalStore.modalId = null;
};

const handleDelete = async () => {
  try {
    let response;
    if (source.value === "blogCategoryList") {
      response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/blog-category/${modalStore.modalId}`
      );

      if (response.data) {
        categoryStore.deleteCategory(modalStore.modalId);
        notify("Category deleted successfully!", "success");
      }
    } else if (source.value === "blogList") {
      response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/blog/${modalStore.modalId}`
      );

      if (response.data) {
        blogStore.deleteBlog(modalStore.modalId);
        notify("Blog deleted successfully!", "success");
      }
    }
    modalStore.deleteModal = false;
  } catch (error) {
    notify("Error deleting category", "error");
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(115, 120, 152, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.modal-card {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  justify-content: space-between;
  padding-bottom: 1px;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: gray;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  color: gray;
}

.modal-footer {
  gap: 10px;
}

.cancel-button {
  background: #fff;
  border: 1px solid #ddd;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 15px;
  color: darkgrey;
  border-radius: 5px;
}

.ok-button {
  background: red;
  color: #fff;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 5px;
}

.modal-body p {
  margin: 0;
  font-size: 13px;
  color: gray;
}
</style>
