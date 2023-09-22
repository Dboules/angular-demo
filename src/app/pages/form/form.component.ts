import { Component, OnInit } from '@angular/core';
enum DownloadState {
  WAITING = 'clock-circle',
  PAUSE = 'arrow-down',
  DOWNLOADING = 'pause',
  COMPLETE = '',
}
interface Item {
  name: string;
  progress: number;
  size: number;
  current: number;
  state: string;
  speed: number;
  complete: boolean;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent implements OnInit {
  taskList: Item[] = [];
  downloading: Item[] = [];
  completeList: Item[] = [];
  poolLimit: number = 3;
  currentDownloadingTask: Item[] = [];
  constructor() {}
  ngOnInit(): void {
    this.taskList = new Array(20).fill(0).map((_, index) => {
      return {
        name: `TASK${index + 1}`,
        progress: 0,
        size: Number((Math.random() * 20 + 2).toFixed(2)) * 1024,
        current: 0,
        state: DownloadState.WAITING,
        speed: 0,
        complete: false,
      };
    });
    this.downloading = this.taskList;
    this.taskList.forEach((item, index) => {
      if (index < 3) {
        item.state = DownloadState.DOWNLOADING;
      }
      // this.instancePromise(item);
    });
  }

  instancePromise(item: Item) {
    let timer: any = null;
    return new Promise((resolve) => {
      timer = setInterval(() => {
        if (item.state === DownloadState.WAITING || item.state === DownloadState.PAUSE) {
          return;
        }

        if (item.state === DownloadState.DOWNLOADING) {
          item.speed = Math.floor(Math.random() * 500 + 500);
          item.current += item.speed;
          if (item.current >= item.size) {
            item.current = item.size;
            item.speed = 0;
            item.complete = true;
            item.state = DownloadState.COMPLETE;
            clearInterval(timer);
            this.downloading = this.taskList.filter((item) => !item.complete);
            this.completeList = this.taskList.filter((item) => item.complete);
            const downloadinglen = this.taskList.filter(
              (t) => t.state === DownloadState.DOWNLOADING
            ).length;
            resolve(downloadinglen);
            if (downloadinglen < this.poolLimit) {
              this.nextDownload() && (this.nextDownload().state = DownloadState.DOWNLOADING);
            }
          }
        }
      }, 1000);
    });
  }
  async startPoolDownloading() {
    // let input = this.taskList.map((item) => this.limit(() => this.instancePromise(item)));
    // console.log(input);
    // const result = await Promise.all(input);
    this.downloading = this.taskList;
    this.taskList.forEach((item, index) => {
      if (index < 3) {
        item.state = DownloadState.DOWNLOADING;
      }
      this.instancePromise(item);
    });
    console.log(this.taskList.filter((t) => t.state === DownloadState.DOWNLOADING));
  }
  nextDownload(): Item {
    return this.taskList.find(
      (t) =>
        t.current < t.size && (t.state === DownloadState.PAUSE || t.state === DownloadState.WAITING)
    ) as Item;
  }
  nextWaiting(): Item {
    return this.taskList.find(
      (t) => t.current < t.size && t.state === DownloadState.DOWNLOADING
    ) as Item;
  }
  onControl(item: Item) {
    if (item.state === DownloadState.DOWNLOADING) {
      this.nextDownload() && (this.nextDownload().state = DownloadState.DOWNLOADING);
      item.state = DownloadState.PAUSE;
    } else {
      this.nextDownload() && (this.nextWaiting().state = DownloadState.WAITING);
      item.state = DownloadState.DOWNLOADING;
    }
    console.log(this.taskList.filter((t) => t.state === DownloadState.DOWNLOADING));
  }
  add() {
    console.log(this.taskList);
    // this.startPoolDownloading();
  }
}
