<template>
  <LoadingScreen v-if="loading" />
  <div class="mt-4 card" v-if="custs.length">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="mb-4"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    <div v-if="custs?.length" class="mt-3">
     
      <div v-for="(customer, index) in custs" :key="customer.id" class="customer-item">
        <div class="customer-details">
          
       
          <h4>
            {{ customer.firstname }} {{ customer.lastname }}
            <span v-if="index === 0" class="new-tag">New</span>
          </h4>
          <span class="text-muted1">{{ customer.email }}</span>
        </div>
        <span class="text-muted">{{
          new Date(customer.createdAt).toLocaleDateString()
        }}</span>
      </div>
    </div>
    <div v-else>
      <p>No customers available</p>
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

const custs = ref([]);

const handleFetchCustomers = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/get-users`
    );

    if (response.data) {
      custs.value = response.data;
    }
  } catch (error) {
    notify("Error fetching customers", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  handleFetchCustomers();
});
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
}

.customer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.customer-item:hover {
  background-color: #e9e9e9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.customer-details {
  display: flex;
  flex-direction: column;
}

.customer-details h4 {
  margin: 0;
  font-size: 1.2rem;
  color: #6c757d;
}

.customer-details .new-tag {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 8px;
  color: #389e0d;
  background: #f6ffed;
  border-color: #b7eb8f;
}

.text-muted1,
.text-muted {
  font-size: 12px;
  color: gray;
}
</style>
