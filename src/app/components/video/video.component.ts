import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
})
export class VideoComponent implements OnInit {
  @ViewChild('myVideo') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  @Input() width: number = 400;
  @Input() height: number = 300;
  url: string = 'assets/video.mp4';
  media!: HTMLMediaElement;
  isPlaying: boolean = false;
  percent: number = 0;
  duration!: number;
  volume!: number;
  current!: number;
  timer!: any;
  audioContext: AudioContext = new AudioContext();
  analyser: AnalyserNode = this.audioContext.createAnalyser();
  distortion: WaveShaperNode = this.audioContext.createWaveShaper();
  gainNode: GainNode = this.audioContext.createGain();
  biquadFilter: BiquadFilterNode = this.audioContext.createBiquadFilter();
  convolver: ConvolverNode = this.audioContext.createConvolver();
  source!: MediaStreamAudioSourceNode;
  echoDelay = this.createEchoDelayEffect(this.audioContext);
  drawVisual: any;
  constructor() {
    this.analyser.minDecibels = -50;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.85;
  }
  ngOnInit(): void {}
  audioInstance() {
    const audioElement = this.audio.nativeElement;
    const source = this.audioContext.createMediaElementSource(audioElement);
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    // this.analyser.fftSize = 128;
    // let bufferLength = this.analyser.frequencyBinCount;
    // let dataArrayAlt = new Uint8Array(bufferLength);
    // this.analyser.getByteFrequencyData(dataArrayAlt);
    this.visualize();
    // audioElement.play();
    // setInterval(() => {
    //   let dataArray = new Uint8Array(bufferLength);
    //   this.analyser.getByteFrequencyData(dataArray);
    //   console.log(dataArray);
    // }, 1000);
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
    //     this.analyser = this.audioContext.createAnalyser();
    //     this.source = this.audioContext.createMediaStreamSource(stream);
    //     this.source.connect(this.distortion);
    //     this.distortion.connect(this.biquadFilter);
    //     this.biquadFilter.connect(this.gainNode);
    //     this.convolver.connect(this.gainNode);
    //     this.echoDelay.placeBetween(this.gainNode, this.analyser);
    //     this.analyser.connect(this.audioContext.destination);
    //     this.visualize();
    //   });
    // }
  }
  createEchoDelayEffect(audioContext: AudioContext) {
    const delay = audioContext.createDelay(1);
    const dryNode = audioContext.createGain();
    const wetNode = audioContext.createGain();
    const mixer = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    delay.delayTime.value = 0.75;
    dryNode.gain.value = 1;
    wetNode.gain.value = 0;
    filter.frequency.value = 1100;
    filter.type = 'highpass';

    return {
      apply: function () {
        wetNode.gain.setValueAtTime(0.75, audioContext.currentTime);
      },
      discard: function () {
        wetNode.gain.setValueAtTime(0, audioContext.currentTime);
      },
      isApplied: function () {
        return wetNode.gain.value > 0;
      },
      placeBetween: (inputNode: any, outputNode: any) => {
        inputNode.connect(delay);
        delay.connect(wetNode);
        wetNode.connect(filter);
        filter.connect(delay);

        inputNode.connect(dryNode);
        dryNode.connect(mixer);
        wetNode.connect(mixer);
        mixer.connect(outputNode);
      },
    };
  }
  visualize() {
    let canvasCtx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    const WIDTH = this.canvas.nativeElement.width;
    const HEIGHT = this.canvas.nativeElement.height;
    this.analyser.fftSize = 2048;
    const bufferLengthAlt = this.analyser.frequencyBinCount;
    const dataArrayAlt = new Uint8Array(bufferLengthAlt);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    const drawAlt = () => {
      this.drawVisual = requestAnimationFrame(drawAlt);
      this.analyser.getByteFrequencyData(dataArrayAlt);
      canvasCtx.fillStyle = '#ADC8ED';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      // const barWidth = (WIDTH / bufferLengthAlt) * 2.5;
      const barWidth = 5;
      // console.log(barWidth);
      let barHeight;
      let x = 0;
      for (let i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i];
        barHeight === 0 && (barHeight = barWidth);
        // canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
        canvasCtx.fillStyle = '#002BAD';
        canvasCtx.fillRect(x, Math.abs(HEIGHT - barHeight) / 2, barWidth, barHeight);
        x += barWidth + 3;
      }
    };
    drawAlt();
  }
  ngAfterViewInit() {
    this.audioInstance();
    this.media = this.video.nativeElement;
    this.media.onloadeddata = () => {
      console.log('加载完成');
      this.duration = this.media.duration;
    };
    this.media.onplaying = () => {
      console.log('playing');
      this.playing();
    };
    this.media.onprogress = () => {};
    this.media.onerror = () => {
      console.log('出现错误');
    };
  }
  playing() {
    this.timer = setInterval(() => {
      if (this.media) {
        this.volume = Math.floor(this.media.volume * 10) / 10;
        this.current = this.media.currentTime;
        let cur = this.current / this.duration;
        this.percent = Number(cur.toFixed(3)) * 100;
      }
    }, 500);
  }
  play() {
    console.log('play');
    if (this.media) {
      this.media.play();
      this.isPlaying = true;
    }
  }
  pause() {
    console.log('pause');
    if (this.media) {
      this.media.pause();
      clearInterval(this.timer);
      this.isPlaying = false;
    }
  }
  stop() {
    if (this.media) {
      this.pause();
      this.media.currentTime = 0;
      this.percent = 0;
    }
  }
  increase() {
    if (this.volume < 1) {
      this.media.volume += 0.1;
    }
  }
  decrease() {
    if (this.volume > 0) {
      this.media.volume -= 0.1;
    }
  }
  progressChange(n: number) {
    this.pause();
    this.media.currentTime = (n / 100) * this.duration;
  }
}
