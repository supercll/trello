<template>
  <div>
    <t-header></t-header>

    <div class="echarts" ref="echarts_main">
      <div class="echarts-container">
        <div id="echarts_pie" class="echarts-item" ref="echarts_pie"></div>
        <div id="echarts_bar" class="echarts-item" ref="echarts_bar"></div>
      </div>
      <div class="echarts-container">
        <div class="button_container">
          <el-button round type="primary" class="button-item" @click="loadheatmapChart('month')">
            近一月数据
          </el-button>
          <el-button round type="primary" class="button-item" @click="loadheatmapChart">
            近一年数据
          </el-button>
        </div>
        <div id="echarts_heatmap" class="echarts-item" ref="echarts_heatmap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import THeader from '@/components/THeader';
import { mapState } from 'vuex';
import { calendarYear, calendarWeek } from '../assets/echartsOptions/heatMap.js';
import { pieChartOption } from '../assets/echartsOptions/pieCharts.js';
import { barChartOption } from '../assets/echartsOptions/barChart.js';
import { Button } from 'element-ui';
import * as echarts from 'echarts/core';

export default {
  name: 'Statistics',

  data() {
    return {};
  },

  components: {
    THeader,
    Button
  },

  methods: {
    lodeECharts() {
      const myPieChart = echarts.init(this.$refs.echarts_pie);
      const myBarChart = echarts.init(this.$refs.echarts_bar);
      const { totalCardNumber, doneCardNumber, doneCard, totalCard } = this.totalCard;
      const undoneCardList = totalCard.filter(card => !card.status);
      myPieChart.setOption(pieChartOption(doneCardNumber, totalCardNumber - doneCardNumber));
      myBarChart.setOption(barChartOption(doneCard, undoneCardList));
    },

    loadheatmapChart(type) {
      const myHeatChart = echarts.init(this.$refs.echarts_heatmap);
      const totalCard = this.totalCard;

      let option;
      switch (type) {
        case 'month':
          option = calendarWeek(type, totalCard.doneTimeTotal);
          break;

        default:
          option = calendarYear('year', totalCard.doneTimeTotal);
          break;
      }
      myHeatChart.setOption(option);
    }
  },

  computed: {
    ...mapState('user', {
      totalCard: state => state.totalCard
    })
  },

  async created() {
    await this.$store.dispatch('user/getTotalCard');
  },

  mounted() {
    this.lodeECharts();
    this.loadheatmapChart();
  }
};
</script>

<style lang="scss">
.echarts {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 300px;

  &-item {
    width: 100%;
    height: 100%;
  }
  &-container {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 10px;
    border: solid 1px rgb(221, 221, 221);
    display: flex;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #echarts_heatmap {
  }
  .button_container {
    display: flex;
    position: absolute;
    top: 80%;
    z-index: 1;

    .button-item {
    }
  }
}
</style>
