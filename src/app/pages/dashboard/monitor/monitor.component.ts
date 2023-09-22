import { Component, OnInit, ViewChild } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
interface DataItem {
  name: string;
  value: [string, number];
}
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
})
export class MonitorComponent implements OnInit {
  @ViewChild('echarts') echart!: ECharts;
  data: DataItem[] = [];
  now = new Date();
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 100;
  option!: EChartsOption;
  updateOptions!: EChartsOption;
  timer: any = null;
  constructor() {}
  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.data.push(this.randomData());
    }
    this.option = {
      title: {
        text: 'Dynamic Data & Time Axis',
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          params = params[0];
          var date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
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
          data: this.data,
        },
      ],
    };
    this.timer = setInterval(() => {
      // for (var i = 0; i < 5; i++) {
      this.data.shift();
      this.data.push(this.randomData());
      this.updateOptions = {
        series: [
          {
            data: this.data,
          },
        ],
      };
    }, 1000);
  }
  randomData(): DataItem {
    this.now = new Date(+this.now + this.oneDay);
    this.value += Math.random() * 50 - 21;
    return {
      name: this.now.toString(),
      value: [[this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'), Math.round(this.value)],
    };
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
