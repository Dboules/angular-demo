import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { MediaRecord } from './mediaRecord';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less'],
})
export class DemoComponent implements OnInit {
  @ViewChild('videosnip') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  waveSurfer!: WaveSurfer;
  play: boolean = false;
  audio!: HTMLAudioElement;
  mediaRecord!: MediaRecord;
  show: boolean = false;
  record!: RecordPlugin;
  recordText: string = 'Record';
  imageList: string[] = [];
  constructor() {}
  ngOnInit(): void {
    this.waveSurfer = WaveSurfer.create({
      container: '#records',
      waveColor: '#002bad',
      progressColor: '#002bad',
      height: 25,
      barWidth: 4,
      barGap: 3,
      barRadius: 2,
      barHeight: 1.2,
    });

    this.record = this.waveSurfer.registerPlugin(RecordPlugin.create());
    this.record.on('record-start', () => {
      console.log('start record');
    });
    this.record.on('record-end', (blob) => {
      const recordedUrl = URL.createObjectURL(blob);
      this.initWave(recordedUrl);
    });

    // this.waveSurfer = WaveSurfer.create({
    //   container: '#wavesurfer',
    //   waveColor: '#002bad',
    //   progressColor: '#002bad',
    //   // url: 'assets/video.mp4',
    //   media: this.audio,
    //   height: 25,
    //   normalize: false,
    //   minPxPerSec: 1,
    //   hideScrollbar: true,
    //   barWidth: 4,
    //   barGap: 3,
    //   barRadius: 2,
    //   barHeight: 1.2,
    //   cursorWidth: 0,
    //   sampleRate: 48000,
    // });
    // this.waveSurfer.once('interaction', () => {
    //   this.waveSurfer.play();
    // });
  }
  ngAfterViewInit() {
    this.generate();
  }
  start() {
    console.log('playing');
    this.mediaRecord.start();
  }
  stop() {
    console.log('stop');
    this.mediaRecord.stop();
  }
  recordAudio() {
    if (this.record.isRecording()) {
      this.record.stopRecording();
      this.recordText = 'Record';
      return;
    }
    this.record.startRecording().then(() => {
      this.recordText = 'Stop';
    });
  }
  destory() {
    this.waveSurfer.destroy();
    this.play = false;
  }
  getUrl() {
    let url = this.mediaRecord.getMediaUrl();
    this.initWave('assets/audio.wav');
  }
  initWave(url: string) {
    this.audio = new Audio();
    this.audio.src = url;
    this.show = true;
    this.waveSurfer = WaveSurfer.create({
      container: '#wavesurfer',
      waveColor: '#002bad',
      progressColor: '#002bad',
      // url: 'assets/video.mp4',
      media: this.audio,
      height: 25,
      normalize: false,
      minPxPerSec: 1,
      hideScrollbar: true,
      barWidth: 4,
      barGap: 3,
      barRadius: 2,
      barHeight: 1.2,
      cursorWidth: 0,
      sampleRate: 48000,
    });
    this.waveSurfer.once('finish', () => {
      console.log('finish');
      this.play = false;
    });
    this.waveSurfer.once('interaction', () => {
      this.waveSurfer.play();
    });
  }
  onPlay(value: boolean) {
    if (!this.audio) return;
    this.play = value;
    if (value) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  generate() {
    const canvas = this.canvas.nativeElement;
    const canvasFill = canvas.getContext('2d');
    const video = this.video.nativeElement;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const videoWidth = video.width;
    const videoHeight = video.height;
    canvasFill?.clearRect(0, 0, canvasWidth, canvasHeight);
    let timer: any;
    video.onplay = () => {
      timer = setInterval(() => {
        canvasFill?.drawImage(video, 0, 0, videoWidth, videoHeight);
        const imgSrc = canvas.toDataURL('image/jpeg');
        this.imageList.push(imgSrc);
      }, 1000);
    };

    video.onpause = () => {
      // clearInterval(timer);
    };
    video.onended = () => {
      clearInterval(timer);
    };

    return;
  }
  onVideoPlay(value: boolean) {
    console.log(value);
    this.video.nativeElement.play();
  }
}
