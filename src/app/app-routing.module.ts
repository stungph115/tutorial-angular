import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoutingModule } from './routes/home/home.module';
import { UserRoutingModule } from './routes/user/user.module';
import { DetailuserRoutingModule } from './routes/detailuser/detailuser.module';
import { ContactRoutingModule } from './routes/contact/contact.module';
import { LoginRoutingModule } from './routes/login/login.module';
import { RegisterRoutingModule } from './routes/register/register.module'; 
import { UploadRoutingModule } from './routes/upload/upload.module';
import { ArchivageExpRoutingModule } from './routes/archivage-exp/archivage-exp.module';
import { AuthGuard } from './_helpers/auth.guard'; 
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeRoutingModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'user',
    loadChildren: () => import('./routes/user/user.module').then(m => m.UserRoutingModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'detailuser',
    loadChildren: () => import('./routes/detailuser/detailuser.module').then(m => m.DetailuserRoutingModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'contact',
    loadChildren: () => import('./routes/contact/contact.module').then(m => m.ContactRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/login/login.module').then(m => m.LoginRoutingModule),

  },
  {
    path: 'register',
    loadChildren: () => import('./routes/register/register.module').then(m => m.RegisterRoutingModule),

  },
  {
    path: 'upload',
    loadChildren: () => import('./routes/upload/upload.module').then(m => m.UploadRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'archivage-exp',
    loadChildren: () => import('./routes/archivage-exp/archivage-exp.module').then(m => m.ArchivageExpRoutingModule),

    canActivate: [AuthGuard]
  },
  {
    path: 'charts',
    loadChildren: () => import('./routes/charts/charts.module').then(m => m.ChartsRoutingModule),

    canActivate: [AuthGuard]
  },
<<<<<<< HEAD
  {
    path: 'logs',
    loadChildren: () => import('./routes/logs/logs.module').then(m => m.LogsRoutingModule),

    canActivate: [AuthGuard]
  },

=======
>>>>>>> bf124e9d983733e8f0e3c7a592f019ae81c638fa
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
