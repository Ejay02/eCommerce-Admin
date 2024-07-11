<template>
  <div class="login py-5">
    <br />
    <br />
    <br />

    <div class="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 class="text-center">Reset Password?</h3>
      <p class="text-center">Enter new password</p>
      <form @submit.prevent="onSubmit">
        <a-space
          direction="vertical"
          size="middle"
          class="form-floating mb-3 w-100"
        >
          <a-input-password
            v-model:value="password"
            placeholder="password"
            id="password"
          />
        </a-space>
        <!--  -->
        <a-space
          direction="vertical"
          size="middle"
          class="form-floating mb-3 w-100"
        >
          <a-input-password
            v-model:value="confirmPassword"
            placeholder="confirm Password"
            id="password"
          />
        </a-space>

        <div class="text-left">
          <button class="btn border-0 px-3 py-2 fw-bold w-100" type="submit">
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");
const confirmPassword = ref("");

const onSubmit = () => {
  console.log("confirm Password:", confirmPassword.value);
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

.login h3 {
  font-size: 20px;
}

.login p {
  color: gray;
  font-size: 12px;
}
</style>
