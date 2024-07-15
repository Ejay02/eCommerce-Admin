<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="mb-4"></h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    <div v-if="customers.length">
      <div
        v-for="(customer, index) in sortedCustomers"
        :key="customer.id"
        class="customer-item"
      >
        <div class="customer-details">
          <h4>
            {{ customer.name }}
            <span v-if="index < 3" class="new-tag">New</span>
          </h4>
          <span class="text-muted">{{ customer.email }}</span>
        </div>
        <span class="text-muted">{{
          new Date(customer.joinDate).toLocaleDateString()
        }}</span>
      </div>
    </div>
    <div v-else>
      <p>No customers available</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const customers = ref([
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    joinDate: "2023-02-15T00:00:00Z",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    joinDate: "2023-03-30T00:00:00Z",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    joinDate: "2023-04-10T00:00:00Z",
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    joinDate: "2023-05-05T00:00:00Z",
  },
  {
    id: "6",
    name: "Diana Evans",
    email: "diana.evans@example.com",
    joinDate: "2023-06-20T00:00:00Z",
  },
  {
    id: "7",
    name: "Evan Frank",
    email: "evan.frank@example.com",
    joinDate: "2023-07-10T00:00:00Z",
  },
]);

const sortedCustomers = computed(() => {
  return [...customers.value].sort(
    (a, b) => new Date(b.joinDate) - new Date(a.joinDate)
  );
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
  /* color: #343a40; */
}

.customer-details .new-tag {
  background-color: #28a745;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 8px;
}

.customer-details .text-muted {
  font-size: 0.9rem;
  color: #6c757d;
}

.text-muted {
  font-size: 0.9rem;
  color: #6c757d;
}
</style>
