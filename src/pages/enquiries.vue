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
            <th>Comment</th>
            <th>Status</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="inquiry in enqStore?.enquiries"
            :key="inquiry?._id"
            class="hover-row"
            @click="handleRedirect(inquiry)"
          >
            <td>
              <span class="">
                {{ inquiry?.name }}
              </span>
              <br />
              <span class="email">
                {{ inquiry?.email }}
              </span>
            </td>
            <td class="text-truncate">
              {{ inquiry.comment.trim().slice(0, 50) }}...
            </td>
            <td>{{ inquiry?.status }}</td>
            <td>{{ new Date(inquiry?.createdAt).toLocaleDateString() }}</td>
            <td>
              <i class="bi bi-telephone-outbound me-2"></i>
              <i class="bi bi-envelope-arrow-up-fill me-2"></i>
              <i class="bi bi-whatsapp me-2"></i>
            </td>
            <td
              class=""
              @click="showDelModal(inquiry?._id, inquiry?.name, 'enquiries')"
            >
              <i class="fa-regular fa-trash-can text-danger"></i>
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
import { useModalStore } from "@/store/useModalStore";
import LoadingScreen from "@/components/loadingScreen.vue";
import { useEnquiryStore } from "@/store/useEnquriesStore";
import router from "@/router";

const modalStore = useModalStore();

const showDelModal = (id, title, type) => {
  modalStore.deleteModal = true;
  modalStore.modalId = id;
  modalStore.modalTitle = title;
  modalStore.source = type;
};

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

const handleRedirect = async (enquiry) => {
  router.push(`/enquiry/${enquiry?._id}`);
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

.email {
  font-size: 12px;
}

.rl {
  text-decoration: none;
}
</style>
