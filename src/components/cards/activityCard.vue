<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">Recent activity</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div>
      <a-timeline>
        <a-timeline-item
          v-for="(item, index) in timelineItems"
          :key="index"
          :color="item.color"
        >
          <template #dot>
            <span class="custom-dot"></span>
          </template>
          <span class="timeline-text">{{ item.text }}</span>
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script setup>
const timelineItems = [
  {
    color: "#ffd333",
    text: "User applied a discount code and checked out - 2024-06-05 11:15",
  },
  {
    color: "#ffd333",
    text: "User browsed electronics category 2015-09-01",
  },
  {
    color: "#ffd333",
    text: "User added 'Smartphone X' to the cart. 2024-07-01 09:30",
  },
  {
    color: "#ffd333",
    text: "User checked out and made a purchase - 2024-07-01 10:15",
  },
  {
    color: "#ffd333",
    text: "Order #12345 was shipped - 2024-07-02 12:00",
  },
  {
    color: "#ffd333",
    text: "User received the order #12345 - 2024-07-03 14:00",
  },
  {
    color: "#ffd333",
    text: 'User left a 5-star review for "Smartphone X" - 2024-07-04 16:00',
  },
  {
    color: "#ffd333",
    text: "User browsed the home appliances category - 2024-07-05 10:00",
  },
];
</script>

<style scoped>
.card {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.custom-dot {
  display: block;
  width: 16px;
  height: 16px;
  background-color: #ffd333;
  border-radius: 50%;
  border: 2px solid #fff;
}

.timeline-text {
  color: gray; /* Gray color */
}
</style>
