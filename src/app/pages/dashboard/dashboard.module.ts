import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';

import { DashboardComponent } from './dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MonitorComponent } from './monitor/monitor.component';
import { WorkplaceComponent } from './workplace/workplace.component';

import { NgxDragableResizableModule } from 'ngx-dragable-resizable';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { Highlight } from 'src/app/directives/Highlight.directive';
import { ComponentModule } from '../../components/component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDragableResizableModule,
    NzIconModule,
    NzProgressModule,
    NzSliderModule,
    ComponentModule,
    NgxEchartsModule.forRoot({ echarts }),
    RouterModule.forChild([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'monitor', component: MonitorComponent },
      { path: 'workplace', component: WorkplaceComponent },
    ]),
  ],
  declarations: [
    DashboardComponent,
    WelcomeComponent,
    MonitorComponent,
    Highlight,
    WorkplaceComponent,
  ],
  exports: [DashboardComponent, WelcomeComponent, MonitorComponent],
})
export class DashboardModule {}
