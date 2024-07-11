<template>
  <div class="login py-5">
    <br />
    <br />
    <br />
    <br />

    <div class="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 class="text-center">Forgot Password?</h3>
      <p class="text-center">Enter registered email to continue</p>
      <form @submit.prevent="onSubmit">
        <!-- Email -->
        <a-space direction="vertical" class="form-floating mb-3 w-100">
          <a-input
            v-model:value="email"
            placeholder="name@example.com"
            id="email"
          />
        </a-space>

        <!-- Button -->
        <div class="text-left">
          <button class="btn border-0 px-3 py-2 fw-bold w-100" type="submit">
            Send Link
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

const onSubmit = () => {
  console.log("Email:", email.value);
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

.login p {
  color: gray;
  font-size: 12px;
}

.login h3 {
  font-size: 20px;
}
</style>
