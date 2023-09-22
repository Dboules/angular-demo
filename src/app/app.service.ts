import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AppService {
  navList = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      url: '',
      children: [
        {
          title: 'Welcome',
          icon: '',
          url: '/welcome',
        },
        {
          title: 'Monitor',
          icon: '',
          url: '/monitor',
        },
        {
          title: 'Workplace',
          icon: '',
          url: '/workplace',
        },
      ],
    },
    {
      title: 'Form',
      icon: 'form',
      url: '',
      children: [
        { title: 'Basic Form', icon: '', url: '/form' },
        { title: 'Demo', icon: '', url: '/form/demo' },
      ],
    },
    {
      title: 'Setting',
      icon: 'setting',
      url: '/setting',
    },
  ];
  // <span nz-icon nzType="setting" nzTheme="outline"></span>
  constructor(private http: HttpClient) {}

  generateQRCODE(data: string) {
    return this.http.get('https://api.wrdan.com/qr', {
      params: { data },
      responseType: 'blob',
    });
  }
}
