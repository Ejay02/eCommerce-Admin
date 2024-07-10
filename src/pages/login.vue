<template>
  <div class="login py-5">
    <br />
    <br />
    <br />

    <div class="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 class="text-center">Log In</h3>
      <p class="text-center">Login to your account to continue</p>
      <form @submit.prevent="onSubmit">
        <!-- Email -->
        <a-space direction="vertical" class="form-floating mb-3 w-100">
          <a-input
            :value="email"
            placeholder="name@example.com"
            id="email"
          />
        </a-space>
        <!-- Password -->
        <a-space
          direction="vertical"
          size="middle"
          class="form-floating mb-3 w-100"
        >
          <!-- style="width: 100%" -->
          <a-input-password
            :value="password"
            placeholder="password"
            id="password"
          />
        </a-space>
        <!-- Button -->
        <router-link to="/admin">
          <div class="text-left">
            <button
              class="btn border-0 px-3 py-2 text-white fw-bold w-100 text-center te"
              type="submit"
            >
              Log In
            </button>
          </div>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const onSubmit = () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
};
</script>

<style scoped>
.login {
  background-color: #ffd333;
  min-height: 100vh;
}

.btn {
  background-color: #ffd333;
}
</style>
