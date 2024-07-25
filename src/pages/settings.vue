<template>
  <div class="mt-4 card p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0">Settings</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <form @submit.prevent="updateSettings">
      <div class="mb-4">
        <label for="avatar" class="form-label">Avatar</label>
        <div class="d-flex align-items-center">
          <img :src="avatar" alt="User Avatar" class="avatar-preview me-4" />
          <div class="">
            <input
              type="file"
              id="avatar"
              @change="handleAvatarChange"
              style="color: gray"
            />
            <small class="form-text text-warning"
              >.jpg and .png formats only</small
            >
            <small class="form-text text-warning">Max size 2MB</small>
          </div>
        </div>
      </div>

      <div class="d-flex gap-1">
        <div class="flex-grow-1 mb-4">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="name"
            style="color: gray"
          />
        </div>

        <div class="flex-grow-1 mb-4">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            style="color: gray"
          />
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary" @click="handleUpdate">
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const userStore = useUserStore();

userStore.loadUserFromStorage();

const { user } = storeToRefs(userStore);

const avatar = ref(
  "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?w=996&t=st=1720681827~exp=1720682427~hmac=189dffe3117a9caac144609539d8e4383817c87c0a80116d53cac50c2dd2e54d"
);

const fn = user.value.firstname;
const ln = user.value.lastname;

const name = ref(fn + " " + ln);

const email = ref(user.value.email);

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatar.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const splitName = (fullName) => {
  const nameParts = fullName.trim().split(" ");
  const firstname = nameParts[0];
  const lastname = nameParts.slice(1).join(" ") || "";
  return { firstname, lastname };
};

const handleUpdate = async () => {
  const { firstname, lastname } = splitName(name.value);

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/edit`,
      {
        firstname: firstname,
        lastname: lastname,
        email: email.value,
      }
    );

    if (response.data) {
      notify("Deets updated successfully!", "success");
      // Update the user store with the new data
      userStore.setUser({
        ...user.value,
        firstname: firstname,
        lastname: lastname,
        email: email.value,
      });
    }
  } catch (error) {
    notify("Error updating deets", "error");
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 5%;
  object-fit: cover;
}

.form-text {
  display: block;
  margin-top: 0.25rem;
}

.d-flex.gap-1 > * {
  margin-right: 5px;
}

.d-flex.gap-1 > *:last-child {
  margin-right: 0;
}

.form-label {
  color: gray;
}
</style>
