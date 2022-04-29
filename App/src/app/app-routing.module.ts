import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientGuard } from './guards/client.guard';
import { EmployeeGuard } from './guards/employee.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeePageModule),
    canActivate: [EmployeeGuard],
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientPageModule),
    canActivate: [ClientGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
