<template>
  <LoadingScreen v-if="productStore.loading" />
  <div class="mt-4 card p-4" v-if="productStore.products.length">
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
      <!-- <i class="bi bi-sliders2 fs-6 m-2"></i> -->
      <input
        type="text"
        class="form-control mb-3"
        placeholder="🔎Search for products"
        v-model="searchQuery"
        @input="fetchProducts"
      />
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="text-secondary" @click="sortProducts('title')">
            Product
            <i :class="getSortIcon('title')"></i>
          </th>
          <th
            scope="col"
            class="text-secondary"
            @click="sortProducts('category')"
          >
            Category
            <i :class="getSortIcon('category')"></i>
          </th>
          <th
            scope="col"
            class="text-secondary"
            @click="sortProducts('quantity')"
          >
            Stock
            <i :class="getSortIcon('quantity')"></i>
          </th>
          <th scope="col" class="text-secondary" @click="sortProducts('price')">
            Price
            <i :class="getSortIcon('price')"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productStore.products" :key="product._id">
          <td class="d-flex align-items-center">
            <img
              :src="product?.images[0]?.url || product?.images[1]?.url"
              alt="product"
              class="product-image text-body-tertiary"
            />

            <div class="product-details">
              <strong class="text-secondary">{{ product?.title }}</strong>
              <div class="text-body-tertiary d-flex sku">
                ID: {{ product?._id.slice(4, 8) || "N/A" }} | SKU:
                {{ productSKU || "N/A" }}
              </div>
            </div>
          </td>
          <td class="text-body-tertiary">
            <span class="cat">
              {{ product?.category }}
            </span>
          </td>
          <td>
            <span :class="statusClass(product)">
              {{ product?.quantity > 0 ? "In Stock" : "Out of Stock" }}
            </span>
          </td>
          <td class="text-body-tertiary">{{ product?.price }}</td>
          <td>
            <!-- <i class="bi bi-three-dots-vertical text-secondary"></i> -->
            <div class="">
              <router-link
                :to="{ name: 'editProduct', params: { id: product._id } }"
                class="btn"
              >
                <i class="bix bi-pencil-square"></i>
              </router-link>
              <div
                class="btn"
                @click="showDelModal(product._id, product.title, 'productList')"
              >
                <i class="bi bi-trash"></i>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <Empty />
  </div>
</template>

<script setup>
import Empty from "@/components/empty.vue";
import { ref, watch, onMounted } from "vue";
import { useModalStore } from "@/store/useModalStore";
import { useProductStore } from "@/store/useProductStore";
import LoadingScreen from "@/components/loadingScreen.vue";

const searchQuery = ref("");
const sortField = ref("");
const sortOrder = ref("asc");
const modalStore = useModalStore();

const showDelModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

const productStore = useProductStore();

const fetchProducts = async () => {
  await productStore.fetchProducts({
    search: searchQuery.value,
    sort: sortField.value ? `${sortField.value} ${sortOrder.value}` : "",
  });
};

const sortProducts = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
  fetchProducts();
};

const getSortIcon = (field) => {
  if (sortField.value === field) {
    return sortOrder.value === "asc"
      ? "fa-solid fa-arrow-up"
      : "fa-solid fa-arrow-down";
  }
  return "fa-solid fa-sort";
};

watch([searchQuery, sortField, sortOrder], fetchProducts);

const generateRandomSKU = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const randomLetters = () =>
    Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join("");
  const randomNumbers = () =>
    Array.from({ length: 4 }, () =>
      numbers.charAt(Math.floor(Math.random() * numbers.length))
    ).join("");

  return `${randomLetters()}${randomNumbers()}${randomLetters()}`;
};

const productSKU = ref(generateRandomSKU());

const statusClass = (product) => {
  if (product.quantity === 0) return "badge bg-danger"; // Out of Stock
  if (product.quantity > 0) return "badge bg-success"; // In Stock
  return "";
};

onMounted(() => {
  fetchProducts();
});
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

.cat {
  /* background-color: #2db7f5; */
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  color: #531dab;
  background: #f9f0ff;
  border-color: #d3adf7;
}

.btn {
  text-decoration: none;
  border: none;
}

.bi {
  color: red;
}

.bix {
  color: gray;
}
</style>
