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
            v-model:value="email"
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
          <a-input-password
            v-model:value="password"
            placeholder="password"
            id="password"
          />
        </a-space>
        <div class="d-flex justify-content-between">
          <div class="col-auto">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="autoSizingCheck2"
              />
              <label class="form-check-label" for="autoSizingCheck2">
                Remember me
              </label>
            </div>
          </div>
          <router-link to="/forgot-password">Forgot password?</router-link>
        </div>
        <!-- Button -->
        <router-link to="/admin">
          <div class="text-left">
            <button
              class="btn border-0 px-3 py-2 text-white fw-bold w-100 text-center"
              type="submit"
            >
              Log In
            </button>
          </div>
        </router-link>
      </form>

      <!-- continue -->
      <div class="or-continue">
        <hr class="line" />
        <span class="text-center capitalize">or continue with</span>
        <hr class="line" />
      </div>

      <!-- social buttons -->
      <div class="d-flex flex-wrap justify-content-between w-100">
        <button
          class="btn d-flex border-0 fw-bold text-center align-items-center"
          type="submit"
        >
          <i class="fa-brands fa-google me-1"></i> Google
        </button>
        <button
          class="btn d-flex border-0 fw-bold text-center align-items-center"
          type="submit"
        >
          <i class="fa-brands fa-facebook me-1"></i> Facebook
        </button>
        <button
          class="d-flex align-items-center btn border-0 fw-bold text-center"
          type="submit"
        >
          <i class="fa-brands fa-github me-1"></i> Github
        </button>
      </div>
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
  width: 32%;
  font-size: 14px;
}

.or-continue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
  color: gray;
}

.line {
  flex: 1;
  border: 0;
  height: 1px;
  background: gray;
}

@media (max-width: 768px) {
  .d-flex.flex-md-row {
    flex-direction: column;
  }
}
</style>
