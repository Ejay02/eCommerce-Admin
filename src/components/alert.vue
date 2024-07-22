<template>
  <transition name="fade">
    <div
      v-if="show"
      :class="['notification', type]"
      class="alert alert-primary d-flex align-items-center gap-2 x"
    >
      <i :class="iconClass" class="xx"></i>
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: "info",
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const show = ref(false);

onMounted(() => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, props.duration);
});

const iconClass = computed(() => {
  switch (props.type) {
    case "success":
      return "fa-solid fa-circle-check";
    case "error":
      return "fa-solid fa-circle-xmark";
    case "warning":
      return "bi bi-exclamation-triangle-fill";
    case "info":
      return "bi bi-exclamation-circle";
    default:
      return "fa-solid fa-circle-info";
  }
});
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 400;
  font-size: 14px;
}

.info {
  background-color: #91caff;
  border: 1px solid #e6f4ff;
}

.success {
  background-color: #b7eb8f;
  border: 1px solid #f6ffed;
}

.warning {
  background-color: #ffe58f;
  border: 1px solid #fffbe6;
}

.error {
  background-color: #ffccc7;
  border: 1px solid #fff2f0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.xx {
  color: var(--icon-color);
}

.success .xx {
  color: green;
}

.error .xx {
  color: red;
}

.warning .xx {
  color: orange;
}

.info .xx {
  color: blue;
}
</style>
