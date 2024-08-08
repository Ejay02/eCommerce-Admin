<template>
  <div class="pagination">
    <button
      class="btn btn-light me-2"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      Previous
    </button>
    <button class="page">Page {{ currentPage }} of {{ totalPages }}</button>
    <button
      class="btn btn-light me-2"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["pageChange"]);

const changePage = (page) => {
  if (page > 0 && page <= props.totalPages) {
    emit("pageChange", page);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
  font-size: 12px;
  color: gray;
}

.pagination .btn {
  margin: 0 5px;
  font-size: 12px;
  color: gray;
  border: 1px solid cornflowerblue;
}

.page {
  text-decoration: none;
  border: none;
  background: white;
}
</style>
