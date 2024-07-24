<template>
  <div v-if="isModalVisible" class="modal-overlay d-flex" @click="handleCancel">
    <div class="modal-card">
      <div class="modal-header mb-2">
        <h3>Delete Confirmation</h3>
        <button class="close-button" @click="handleCancel">×</button>
      </div>
      <div class="modal-body mt-2">
        <p>
          Are you sure you want to delete
          <b class="">{{ title }}</b> ?
        </p>
      </div>
      <div class="modal-footer mt-2">
        <button class="cancel-button" @click="handleCancel">Cancel</button>
        <button class="ok-button" @click="handleOk">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useModalStore } from "@/stores/useModalStore";

const modalStore = useModalStore();
const isModalVisible = ref(modalStore.deleteModal);

const handleOk = () => {
  modalStore.deleteModal = false;
  // Handle the delete action using modalStore.modalId
};

const handleCancel = () => {
  modalStore.deleteModal = false;
};

watch(
  () => modalStore.deleteModal,
  (newVal) => {
    isModalVisible.value = newVal;
  }
);

const title = ref(modalStore.modalTitle);

watch(
  () => modalStore.modalTitle,
  (newVal) => {
    title.value = newVal;
  }
);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  /* left: 0; */
  width: 100%;
  height: 100%;
  background: rgba(115, 120, 152, 0.5);
  /* display: flex; */
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
  /* max-width: 80%; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* position: relative; */
}

.modal-header {
  /* display: flex; */
  justify-content: space-between;
  /* align-items: center; */
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
  /* margin: 0; */
  color: gray;
}

.modal-footer {
  /* display: flex; */
  /* justify-content: flex-end; */
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
