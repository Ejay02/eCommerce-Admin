<template>
  <div class="mt-4 card p-4">
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
            <th>Subject</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inquiry in inquiries" :key="inquiry.id" class="hover-row">
            <td>{{ inquiry.name }}</td>
            <td>{{ inquiry.email }}</td>
            <td>{{ inquiry.subject }}</td>
            <td>{{ inquiry.date }}</td>
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
</template>

<script setup>
import { ref } from "vue";

const inquiries = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Order Status",
    date: "2024-07-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Product Inquiry",
    date: "2024-07-02",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Return Policy",
    date: "2024-07-03",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    subject: "Shipping Info",
    date: "2024-07-04",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    subject: "Payment Options",
    date: "2024-07-05",
  },
  {
    id: 6,
    name: "Daisy Evans",
    email: "daisy@example.com",
    subject: "Discounts",
    date: "2024-07-06",
  },
  {
    id: 7,
    name: "Ethan Harris",
    email: "ethan@example.com",
    subject: "Account Issues",
    date: "2024-07-07",
  },
  {
    id: 8,
    name: "Fiona Garcia",
    email: "fiona@example.com",
    subject: "Technical Support",
    date: "2024-07-08",
  },
  {
    id: 9,
    name: "George Hill",
    email: "george@example.com",
    subject: "Order Cancellation",
    date: "2024-07-09",
  },
  {
    id: 10,
    name: "Hannah White",
    email: "hannah@example.com",
    subject: "Product Review",
    date: "2024-07-10",
  },
]);
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
  /* background-color: #ffd333; */
  background-color: gray;
  color: #fff;
}
</style>
