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
      const doneCard = this.totalCard.doneCard;
      function getVirtulData(year) {
        year = year || '2021';
        let date = +echarts.number.parseDate(year + '-01-01');
        let end = +echarts.number.parseDate(year + '-12-31');
        let dayTime = 3600 * 24 * 1000;
        let data = doneCard;
        for (let time = date; time <= end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ]);
        }
        data = data.map(item => {
          return item;
        });
        const res = [];
        return data;
      }

      myHeatChart.setOption({
        title: {
          text: '一年任务热力图'
        },
        tooltip: {
          position: 'top',
          formatter: function(p) {
            var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
            return format + ': ' + p.data[1];
          }
        },
        visualMap: {
          show: true,
          min: 0,
          max: 10,
          calculable: true,
          right: '20%',
          top: 'center',
          orient: 'vertical',
          color: ['#2980B9', '#6dd5fa']
        },

        calendar: {
          range: '2021',
          orient: 'vertical',
          left: 'center'
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
  margin: 0 auto;
  width: 1200px;
  height: 600px;

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
