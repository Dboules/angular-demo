import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less'],
})
export class SettingComponent implements OnInit {
  listOfData: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor() {}
  ngOnInit(): void {}
  drop(event: CdkDragDrop<string>) {
    console.log(event);

    moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
  }
}
