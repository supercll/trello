import * as echarts from 'echarts/core';

export const barChartOption = (doneCard, undoneCard) => {
  function getDate() {
    let today = echarts.number.parseDate(new Date());
    let dayTime = 3600 * 24 * 1000;
    let formatType = 'yyyy-MM';
    const monthList = [],
      doneNumberList = [],
      undoneNumberList = [];
    let currTime = today;
    for (let i = 0; i < 6; i++) {
      const item = echarts.format.formatTime(formatType, currTime);
      const doneCardNumber = doneCard.filter(card => {
        const doneTime = card.doneTime;
        return echarts.format.formatTime(formatType, doneTime) === item;
      }).length;
      const undoneCardNumber = undoneCard.filter(card => {
        const createdAt = card.createdAt;
        return echarts.format.formatTime(formatType, createdAt) === item;
      }).length;
      monthList.unshift(item);
      doneNumberList.unshift(doneCardNumber);
      undoneNumberList.unshift(undoneCardNumber);
      currTime = currTime - dayTime * 30;
    }

    return {
      monthList,
      doneNumberList,
      undoneNumberList
    };
  }
  return {
    tooltip: {
      position: 'top',
      formatter: function(p) {
          console.log(p)
        return `${p.seriesName}数量: ${p.data}`
      }
    },
    legend: {
        data: ['已完成', '未完成']
    },
    xAxis: {
      type: 'category',
      data: getDate()['monthList']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: getDate()['undoneNumberList'],
        type: 'bar',
        name: '已完成任务'
      },
      {
        data: getDate()['doneNumberList'],
        type: 'bar',
        name: '未完成任务'
      }
    ]
  };
};
