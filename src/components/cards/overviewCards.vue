<template>
  <div class="stats-container">
    <div v-for="(stat, index) in stats" :key="index" class="stat-card">
      <div class="d-flex flex-grow-1 justify-content-between">
        <p>{{ stat.title }}</p>
        <i class="bi bi-three-dots-vertical"></i>
      </div>

      <div class="d-flex flex-grow-1 justify-content-between">
        <div class="amount">
          <h4 class="mb-0">${{ stat.amount }}</h4>
        </div>
        <div class="stat-bottom">
          <h6
            :class="{
              'text-danger': stat.trend === 'down',
              'text-success': stat.trend === 'up',
            }"
          >
            <i :class="stat.trendIcon"></i>
            <span
              :style="{ color: stat.trend === 'up' ? 'green' : 'red' }"
              class="m-2"
            >
              {{ stat.trendPercentage }}
            </span>
          </h6>
          <p>Compared To {{ stat.comparisonPeriod }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const stats = ref([
  {
    title: "Total Sales",
    amount: "903940.45",
    trend: "down",
    trendIcon: "fa-solid fa-arrow-trend-down",
    trendPercentage: "32%",
    comparisonPeriod: "June 2024",
  },
  {
    title: "Average order value",
    amount: "19203.29",
    trend: "down",
    trendIcon: "fa-solid fa-arrow-trend-down",
    trendPercentage: "32%",
    comparisonPeriod: "June 2024",
  },
  {
    title: "Total Orders",
    amount: "77849.00",
    trend: "up",
    trendIcon: "fa-solid fa-arrow-trend-up",
    trendPercentage: "32%",
    comparisonPeriod: "June 2024",
  },
]);
</script>

<style scoped>
.stats-container {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
  cursor: pointer;
}

.stat-card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: calc(33.3% - 10px);
  box-sizing: border-box;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  background-color: #f0f0f0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.text-danger {
  color: red;
}

.text-success {
  color: green;
}

.amount h4 {
  font-size: 25px;
}

.stat-bottom h6,
.stat-bottom i {
  font-size: 12px;
}

.stat-card p {
  font-size: 12px;
  color: gray;
}
</style>
