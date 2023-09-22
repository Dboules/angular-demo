import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  isCollapsed = false;
  navList: any = [];
  constructor(private router: Router, private navService: AppService) {
    this.navList = this.navService.navList;
  }
}
