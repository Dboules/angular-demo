import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/setting' },
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    title: 'Dashboard',
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/form/form.module').then((m) => m.FormModule),
    title: 'Form',
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then((m) => m.SettingModule),
    title: 'Setting',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
