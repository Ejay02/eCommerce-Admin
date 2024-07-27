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
          <div v-if="avatar" class="avatar-preview me-4">
            <img :src="avatar" alt="User Avatar" class="avatar-image" />
          </div>
          <div v-else class="avatar-preview initials-avatar me-4">
            {{ initials }}
          </div>
          <div class="">
            <input
              type="file"
              id="avatar"
              @change="handleAvatarChange"
              style="color: gray"
            />
            <small class="form-text text-warning">
              .jpg and .png formats only
            </small>
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
import { ref, computed } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/useUserStore";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const userStore = useUserStore();
userStore.loadUserFromStorage();

const { user } = storeToRefs(userStore);

const defaultAvatar = ref(null);

const avatar = ref(localStorage.getItem("avatar") || defaultAvatar.value);

const fn = user.value.firstname;
const ln = user.value.lastname;

const name = ref(fn + " " + ln);
const email = ref(user.value.email);

const initials = computed(() => {
  const nameParts = name.value.trim().split(" ");
  const firstNameInitial = nameParts[0][0];
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";
  return firstNameInitial + lastNameInitial;
});

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatar.value = e.target.result;
      localStorage.setItem("avatar", e.target.result);
    };
    reader.readAsDataURL(file);
  }
  window.location.reload();
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
      notify("Details updated successfully!", "success");
      // Update the user store with the new data
      userStore.setUser({
        ...user.value,
        firstname: firstname,
        lastname: lastname,
        email: email.value,
      });
    }
  } catch (error) {
    notify("Error updating details", "error");
  }
};

// onMounted(() => {
//   if (!avatar.value) {
//     defaultAvatar.value = initials.value;
//   }
// });
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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: cornflowerblue;  */
  color: white;
  font-size: 30px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials-avatar {
  background-color: cornflowerblue;
  color: white;
  font-size: 30px;
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
