<template>
  <LoadingScreen v-if="loading" />
  <div class="mt-4 card p-4" v-if="enqs.length">
    <div class="d-flex justify-content-between mb-3">
      <h3></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inquiry in enqs" :key="inquiry.id" class="hover-row">
            <td>{{ inquiry.name }}</td>
            <td>{{ inquiry.email }}</td>
            <td class="text-truncate">{{ inquiry.comment }}</td>
            <td>{{ inquiry?.createdAt }}</td>
            <td>{{ inquiry.status }}</td>
            <td class="d-flex justify-content-between">
              <i class="bi bi-telephone-outbound"></i>
              <i class="bi bi-envelope-arrow-up-fill"></i>
              <i class="bi bi-whatsapp"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <Empty />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Empty from "@/components/empty.vue";
import LoadingScreen from "@/components/loadingScreen.vue";
import { useNotifications } from "@/composable/globalAlert.js";

const loading = ref(false);

const { notify } = useNotifications();
const enqs = ref([]);

const handleFetchEnq = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/enquiry`
    );

    if (response.data) {
      enqs.value = response.data;
    }
  } catch (error) {
    notify("Error fetching blogs", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  handleFetchEnq();
});
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.table-responsive {
  margin-top: 20px;
}

.table th,
.table td {
  vertical-align: middle;
  color: gray;
}

.table th {
  background-color: gray;
  color: #fff;
}
</style>
