export type mediaType = 'audio' | 'video';
export class MediaRecord {
  mediaElement: any;
  recordElement: any;
  mediaRecorder?: MediaRecorder;
  chunks: any[];
  url: any;
  _recordType: mediaType;
  /**
   *
   * @param mediaElement
   * @param recordElement
   */
  constructor(mediaElement: HTMLMediaElement, recordElement?: HTMLElement) {
    this.mediaElement = mediaElement;
    this.recordElement = recordElement;
    this.chunks = [];
    this._recordType = 'video';
    this.url = '';
  }
  get recordType() {
    return this._recordType;
  }
  set recordType(val: mediaType) {
    this._recordType = val;
  }
  _initMediaRecorder(mediaStream: any) {
    this.mediaRecorder = new MediaRecorder(mediaStream);
    this.mediaRecorder.onstop = () => {
      const type = this.recordType == 'audio' ? 'audio/ogg' : 'video/mp4';
      const blob = new Blob(this.chunks, { type: type });
      this.chunks = [];
      const url = window.URL.createObjectURL(blob);
      this.url = url;
      this.recordElement && (this.recordElement.src = url);
    };
    this.mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };
  }
  /**
   * 录制视频
   */
  start() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => {
        this._initMediaRecorder(mediaStream);
        this.mediaRecorder?.start();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /**
   * 暂停录制
   */
  stop() {
    if (this.recordType == 'video') {
      this.mediaElement.srcObject.getTracks().forEach((track: any) => track.stop());
    }
    this.mediaRecorder?.stop();
  }
  getMediaUrl() {
    return this.url;
  }
}
