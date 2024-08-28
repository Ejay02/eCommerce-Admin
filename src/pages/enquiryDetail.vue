<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <router-link to="/admin/enquiries" class="d-flex align-items-center rl"
          ><i class="fa-solid fa-arrow-left me-2"></i> Back
        </router-link>
        <div class="card">
          <div class="card-header">
            <h5 class="text-end">
              <i class="fa-solid fa-user"></i> {{ enquiry?.name }}
            </h5>
            <h5 class="text-end">
              <i class="fa-solid fa-at"></i> {{ enquiry?.email }}
            </h5>
            <h5 class="text-end">
              <i class="fa-solid fa-mobile-screen-button"></i>
              {{ enquiry?.mobile }}
            </h5>
            <p class="text-end">
              <i class="fa-regular fa-calendar"></i>
              {{ new Date(enquiry?.createdAt).toLocaleDateString() }}
            </p>
          </div>
          <div class="card-body">
            <p>{{ enquiry?.comment }}</p>
          </div>

          <i class="fa-solid fa-reply" @click="replyToEnquiry"></i>
        </div>
      </div>
    </div>
  </div>
  <!--  -->

  <!--  -->
</template>

<script setup>
import { useRoute } from "vue-router";
import { useEnquiryStore } from "@/store/useEnquriesStore";

const route = useRoute();
const enqStore = useEnquiryStore();

const enquiry = enqStore.enquiries.find(
  (enquiry) => enquiry._id === route.params.id
);

const replyToEnquiry = () => {
  const email = enquiry?.email;
  if (email) {
    window.location.href = `mailto:${email}`;
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-header {
  background-color: gray;
  /* color: blue */
}

.card-body {
  padding: 20px;
  color: gray;
}

h5 {
  margin-bottom: 10px;
  font-size: 15px;
}

p {
  margin-bottom: 20px;
}

.rl {
  text-decoration: none;
  margin-bottom: 10px;
}

/*  */
/*  */
</style>
