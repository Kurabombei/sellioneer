import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {AppResolverService} from './services/app-resolver.service';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './auth.guard';
import {AdminComponent} from './admin/admin.component';
import {OutletsComponent} from './outlets/outlets.component';
import {AdminGoodsComponent} from './admin/admin-goods/admin-goods.component';
import {AdminPinsComponent} from './admin/admin-pins/admin-pins.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {EditGoodComponent} from './edit-good/edit-good.component';
import {GoodsComponent} from './goods/goods.component';
import {CreateGoodComponent} from './create-good/create-good.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'new-user', component: NewUserComponent},
  { path: 'goods', component: GoodsComponent,
    children: [
      { path: 'goodsEdit/:id', component: EditGoodComponent, resolve: {data : AppResolverService}},
    ]},
  { path: 'details/:id', component: EditUserComponent, resolve: {data : AppResolverService}, canActivate: [AuthGuard]},
  { path: 'user-cabinet', component: UserCabinetComponent,
  children: [
    { path: 'details/:id', component: EditUserComponent, resolve: {data : AppResolverService}, canActivate: [AuthGuard]},
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create-good', component: CreateGoodComponent},
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-goods', component: AdminGoodsComponent },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'admin-pins', component: AdminPinsComponent }, // ##TODO: Admin panel for outlets
      { path: 'admin-goods', component: AdminGoodsComponent,
        children: [
          { path: 'goodsEdit/:id', component: EditGoodComponent, resolve: {data : AppResolverService}}
        ]},
      { path: 'admin-users', component: AdminUsersComponent },
      { path: 'create-good', component: CreateGoodComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
