import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { SettingComponent } from './setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingComponent,
      },
    ]),
  ],
  declarations: [SettingComponent],
})
export class SettingModule {}
