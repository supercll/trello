<template>
  <div>
    <t-header></t-header>

    <div class="echarts" ref="echarts_main">
      <div id="echarts_pie" class="echarts-item" ref="echarts_pie"></div>
      <div id="echarts_heatmap" class="echarts-item" ref="echarts_heatmap"></div>
    </div>
  </div>
</template>

<script>
import THeader from '@/components/THeader';
import { mapState } from 'vuex';
import * as echarts from 'echarts/core';
import {
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart, HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
  LegendComponent,
  PieChart
]);
export default {
  name: 'Statistics',

  components: {
    THeader
  },

  methods: {
    lodeECharts() {
      const myPieChart = echarts.init(this.$refs.echarts_pie);
      console.log(this)
      const { totalCardNumber, doneCardNumber } = this.totalCard.data;
      myPieChart.setOption({
        title: {
          text: '任务完成情况统计'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '任务完成情况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: doneCardNumber, name: '已完成' },
              { value: totalCardNumber - doneCardNumber, name: '未完成' }
            ]
          }
        ]
      });
    },

    loadheatmapChart() {
      const myHeatChart = echarts.init(this.$refs.echarts_heatmap);
      const currentYear = new Date().getFullYear();
      function getVirtulData(year) {
        year = year || '2021';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate(year + '-12-31');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time <= end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ]);
        }
        return data;
      }

      myHeatChart.setOption({
        visualMap: {
          show: false,
          min: 0,
          max: 10000
        },
        color: [],
        legend: {
          top: '5%',
          left: '50%',
          top: "50%"
        },
        grid: {
          left: '50%',
          top: "50%"
        },
        calendar: {
          range: '2021',
          orient: 'vertical'
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getVirtulData(currentYear)
        }
      });
    }
  },

  computed: {
    ...mapState('user', {
      totalCard: state => state.totalCard,
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
  display: flex;
  margin: 0 auto;
  width: 1200px;
  height: 500px;

  &-item {
    height: 100%;
    width: 100%;
    border: solid 1px rgb(202, 202, 202);
    margin: 10px;
  }
  #echarts_heatmap {
    overflow: scroll;
  }
}
</style>
