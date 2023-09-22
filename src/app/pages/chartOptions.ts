import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

var chartDom = document.getElementById('main')!;
var myChart = echarts.init(chartDom);
var option: EChartsOption;

interface DataItem {
  name: string;
  value: [string, number];
}

function randomData(): DataItem {
  now = new Date(+now + oneDay);
  value += Math.random() * 50 - 21;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value),
    ],
  };
}

let data: DataItem[] = [];
let now = new Date();
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
for (let i = 0; i < 15; i++) {
  data.push(randomData());
}
console.log(data);
option = {
  title: {
    text: 'Dynamic Data & Time Axis',
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params: any) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
      );
    },
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      data: data,
    },
  ],
};

setInterval(function () {
  // for (var i = 0; i < 5; i++) {
  data.shift();
  data.push(randomData());
  // }

  myChart.setOption<echarts.EChartsOption>({
    series: [
      {
        data: data,
      },
    ],
  });
}, 1000);

option && myChart.setOption(option);
