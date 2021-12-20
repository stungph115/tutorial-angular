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

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './routes/home/home.module#HomeRoutingModule',
    canActivate: [AuthGuard]
  },
  
  {
    path: 'user',
    loadChildren: './routes/user/user.module#UserRoutingModule',
    canActivate: [AuthGuard]
  },

  {
    path: 'detailuser',
    loadChildren: './routes/detailuser/detailuser.module#DetailuserRoutingModule',
    canActivate: [AuthGuard]
  },

  {
    path: 'contact',
    loadChildren: './routes/contact/contact.module#ContactRoutingModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './routes/login/login.module#LoginRoutingModule',
  },
  {
    path: 'register',
    loadChildren: './routes/register/register.module#RegisterRoutingModule',
  },
  {
    path: 'upload',
    loadChildren: './routes/upload/upload.module#UploadRoutingModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'archivage-exp',
    loadChildren: './routes/archivage-exp/archivage-exp.module#ArchivageExpRoutingModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
