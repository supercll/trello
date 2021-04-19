export const pieChartOption = (doneNumber, undoneNumber) => ({
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
          fontSize: '32',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true
      },
      data: [
        { value: doneNumber, name: '已完成' },
        { value: undoneNumber, name: '未完成' }
      ]
    }
  ]
});
