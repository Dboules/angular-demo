import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DemoComponent } from './demo/demo.component';
import { ComponentModule } from '../../components/component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    ComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormComponent,
      },
      {
        path: 'demo',
        component: DemoComponent,
      },
    ]),
  ],
  declarations: [FormComponent, DemoComponent],
})
export class FormModule {}
