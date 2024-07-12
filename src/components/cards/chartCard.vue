<template>
  <div class="mt-4 card">
    <div class="d-flex justify-content-between">
      <h3 class="mb-4">Income Statistics</h3>
      <i class="bi bi-three-dots-vertical"></i>
    </div>

    <div class="">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            // label: "Bar Dataset",
            backgroundColor: "#ffd333",
            data: [10, 30, 12, 52, 32, 83, 28, 54, 63, 72, 9, 52],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
};
</script>

<style scooped>
.card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: calc(33.3% - 10px);
  box-sizing: border-box;
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.card h3 {
  color: gray;
}
</style>
