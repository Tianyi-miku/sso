<template>
  <div id="main" class="chart">

  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';


onMounted(() => {
  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);
  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  option && myChart.setOption(option);
})

</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>
