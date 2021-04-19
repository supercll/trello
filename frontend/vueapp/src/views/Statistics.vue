<template>
  <div>
    <t-header></t-header>

    <div class="echarts" ref="echarts_main">
      <div class="echarts-container">
        <div id="echarts_pie" class="echarts-item" ref="echarts_pie"></div>

      </div>
      <div class="echarts-container">
        <div id="echarts_heatmap" class="echarts-item" ref="echarts_heatmap"></div>
      </div>
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
import { color } from 'echarts/core';
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
      const { totalCardNumber, doneCardNumber } = this.totalCard;
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
            left: 'center',

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
      const totalCard = this.totalCard;
      function getDate() {
        let today = echarts.number.parseDate(new Date());
        let dayTime = 3600 * 24 * 1000;
        let thatday = today - dayTime * 365;
        return {
          data: totalCard.doneTimeTotal,
          today: echarts.format.formatTime('yyyy-MM-dd', today),
          thatday: echarts.format.formatTime('yyyy-MM-dd', thatday)
        };
      }

      myHeatChart.setOption({
        title: {
          text: '一年任务热力图'
        },
        tooltip: {
          position: 'top',
          formatter: function(p) {
            let format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
            return format + ': ' + p.data[1];
          }
        },
        visualMap: {
          show: true,
          min: 0,
          max: 10,
          calculable: true,
          right: '20%',
          top: '0',
          // orient: 'vertical',
          inRange: {
            color: ['#81C4FF', '#6DBAFF', '#4EABFF', '#3DA3FF', '#2899FF', '#0488FF']
          }
        },

        calendar: {
          range: [getDate()['thatday'], getDate()['today']],
          // orient: 'vertical',
          left: 'center',
          cellSize: [14, 14]
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.totalCard.doneTimeTotal
        }
      });
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
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 300px;

  &-item {
    width: 100%;
    height: 100%;
  }
  &-container {
    width: 100%;
    height: 100%;
    margin: 10px;
    border: solid 1px rgb(221, 221, 221);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #echarts_heatmap {
  }
}
</style>
