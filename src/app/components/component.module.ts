import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from '../common/icons-provider.module';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { VideoComponent } from './video/video.component';
// const PIPES = [];

const COMPONETS = [VideoComponent];

const ANT = [
  NzGridModule,
  NzDropDownModule,
  NzInputModule,
  NzBadgeModule,
  NzPopoverModule,
  NzCollapseModule,
  NzButtonModule,
  NzFormModule,
  NzAvatarModule,
  NzTabsModule,
  NzTagModule,
  NzSliderModule,
];

@NgModule({
  declarations: [...COMPONETS],
  imports: [FormsModule, IconsProviderModule, CommonModule, ...ANT],
  exports: [FormsModule, IconsProviderModule, ...COMPONETS],
})
export class ComponentModule {}
