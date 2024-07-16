<template>
  <div class="mt-4 card p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0">Product List</h3>
      <div>
        <button class="btn btn-light me-2 text-secondary">Import</button>
        <router-link to="/admin/product">
          <button class="btn btn-warning">New Product</button>
        </router-link>
      </div>
    </div>
    <div class="d-flex p-2 text-secondary input">
      <i class="bi bi-sliders2 fs-6 m-2"></i>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="Start typing to search for products"
      />
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="text-secondary">Product</th>
          <th scope="col" class="text-secondary">
            <i class="fa-solid fa-sort m-2"></i>Category
          </th>
          <th scope="col" class="text-secondary">
            <i class="fa-solid fa-sort m-2"></i> Stock
          </th>
          <th scope="col" class="text-secondary">
            <i class="fa-solid fa-sort m-2"></i> Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <img
              :src="product.image"
              alt="product"
              class="product-image text-body-tertiary"
            />
            <div class="product-details">
              <strong class="text-secondary">{{ product.name }}</strong>
              <div class="text-body-tertiary d-flex sku">
                ID: {{ product.id }} | SKU: {{ product.sku }}
              </div>
            </div>
          </td>
          <td class="text-body-tertiary">{{ product.category }}</td>
          <td>
            <span :class="statusClass(product.stockStatus)">
              {{ product.stockStatus }}
            </span>
          </td>
          <td class="text-body-tertiary">{{ product.price }}</td>
          <td>
            <i class="bi bi-three-dots-vertical text-secondary"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  {
    id: 1022,
    sku: "AC6660KW",
    name: "Ash's Chainsaw 3.5kW",
    category: "Power Tools",
    stockStatus: "Out of Stock",
    price: "$666.99",
    image: "path/to/image1.png",
  },
  {
    id: 4402,
    sku: "DELTA500",
    name: "Brandix Air Compressor DELTA500",
    category: "Compressors",
    stockStatus: "7 In Stock",
    price: "$1,800.00",
    image: "path/to/image2.png",
  },
  {
    id: 7203,
    sku: "KZX389PQ",
    name: "Brandix Angle Grinder KZX389PQ",
    category: "Power Tools",
    stockStatus: "2 In Stock",
    price: "$649.00",
    image: "path/to/image3.png",
  },
  {
    id: 4402,
    sku: "DM2019KW",
    name: "Brandix Drilling Machine DM2019KW 4kW",
    category: "Drills",
    stockStatus: "On Backorder",
    price: "$3,199.00",
    image: "path/to/image4.png",
  },
  {
    id: 5221,
    sku: "JIG7000B",
    name: "Brandix Electric Jigsaw JIG7000B",
    category: "Power Tools",
    stockStatus: "1 In Stock",
    price: "$290.00",
    image: "path/to/image5.png",
  },
]);

const statusClass = (status) => {
  if (status === "Out of Stock") return "badge bg-danger";
  if (status.includes("In Stock")) return "badge bg-success";
  if (status === "On Backorder") return "badge bg-warning";
  return "";
};
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.product-details {
  display: inline-block;
  vertical-align: middle;
}

.table th,
.table td {
  vertical-align: middle;
}

.table {
  margin-bottom: 0;
}

.table th {
  text-transform: capitalize;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}

.btn-light {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

.btn-warning {
  background-color: #ffc107;
  border: 1px solid #ffc107;
  color: #fff;
}

.input input::placeholder {
  color: gray;
  font-size: 13px;
}

.input input {
  cursor: pointer;
}

.sku {
  font-size: 12px;
}
</style>
