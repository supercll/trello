import * as echarts from 'echarts/core';
import {
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent
} from 'echarts/components';
import {
  PieChart,
  HeatmapChart,
  EffectScatterChart,
  GraphChart,
  ScatterChart
} from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
  LegendComponent,
  PieChart,
  GraphChart,
  EffectScatterChart,
  ScatterChart
]);

function getDate(range = 'year') {
  let today = echarts.number.parseDate(new Date());
  let dayTime = 3600 * 24 * 1000;
  let thatday = null;
  let formatType = 'yyyy-MM-dd';
  if (range === 'month') {
    thatday = echarts.format.formatTime(formatType, today - dayTime * 30);
  } else if (range === 'week') {
    thatday = echarts.format.formatTime(formatType, today - dayTime * 7);
  } else {
    thatday = echarts.format.formatTime(formatType, today - dayTime * 365);
  }
  return {
    today: echarts.format.formatTime('yyyy-MM-dd', today),
    thatday
  };
}
export const calendarYear = (type, data) => ({
  title: {
    text: '近一年任务热力图'
  },
  tooltip: {
    position: 'top',
    formatter: function(p) {
      let format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
      return `${format}: ${p.data[1]}`;
    }
  },
  visualMap: {
    show: true,
    min: 0,
    max: 10,
    calculable: true,
    right: '10%',
    bottom: '20%',
    // orient: 'vertical',
    inRange: {
      color: ['#81C4FF', '#6DBAFF', '#4EABFF', '#3DA3FF', '#2899FF', '#0488FF']
    }
  },

  calendar: {
    range: [getDate(type)['thatday'], getDate(type)['today']],
    orient: 'horizontal',
    left: 'center',
    cellSize: [18, 18],
    monthLabel: {
      nameMap: 'cn'
    }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: data
  }
});

export const calendarWeek = (type, data) => ({
  title: {
    text: '近一月任务热力图'
  },
  tooltip: {
    position: 'top',
    formatter: function(p) {
      let format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
      return `${format}: ${p.data[1]}`;
    }
  },

  visualMap: {
    min: 0,
    max: 10,
    orient: 'vertical',
    right: '10%',
    bottom: '20%',
    inRange: {
      color: ['#81C4FF', '#6DBAFF', '#4EABFF', '#3DA3FF', '#2899FF', '#0488FF']
    }
  },
  calendar: {
    orient: 'vertical',
    yearLabel: {
      nameMap: 'cn',
      margin: 40
    },
    monthLabel: {
      nameMap: 'cn',
      margin: 20
    },

    weekLabel: {
      nameMap: 'cn'
    },
    cellSize: 32,
    left: 'center',
    range: [getDate(type)['thatday'], getDate(type)['today']]
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    symbolSize: function(val) {
      return val[1] / 40;
    },
    data
  }
});
