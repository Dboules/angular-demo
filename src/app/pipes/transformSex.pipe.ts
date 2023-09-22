import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sexTransform' })
export class TransformSexPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    switch (value) {
      case 'male':
        return '男';
      case 'female':
        return '女';
      default:
        return '未知';
    }
  }
}
