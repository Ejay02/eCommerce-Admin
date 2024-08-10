<template>
  <LoadingScreen v-if="enqStore.loading" />
  <div class="mt-4 card p-4" v-if="enqStore?.enquiries?.length">
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
          <tr
            v-for="inquiry in enqStore.enquiries"
            :key="inquiry.id"
            class="hover-row"
          >
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
    <Pagination
      :currentPage="enqStore?.currentPage"
      :totalPages="enqStore?.totalPages"
      @pageChange="goToPage"
    />
  </div>
  <div v-else>
    <Empty />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Empty from "@/components/empty.vue";
import Pagination from "@/components/pagination.vue";
import LoadingScreen from "@/components/loadingScreen.vue";
import { useEnquiryStore } from "@/store/useEnquriesStore";

const enqStore = useEnquiryStore();

const fetchEnqs = async (page = enqStore?.currentPage) => {
  await enqStore?.fetchEnquiries({
    page: page,
    limit: 10,
  });
};

const goToPage = (page) => {
  if (page > 0 && page <= enqStore?.totalPages) {
    fetchEnqs(page);
  }
};

onMounted(async () => {
  await enqStore?.fetchEnquiries();
});
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.table-responsive {
  margin-top: 20px;
  overflow: hidden;
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
