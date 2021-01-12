import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {ForMaterialModule} from './for-material.module';

import { NavigationComponent } from './navigation/navigation.component';
import { MainMapComponent } from './main-map/main-map.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

import { UsersService } from './services/users.service';
import {AppResolverService} from './services/app-resolver.service';
import { OrdersService } from './services/orders.service';
import { AuthService } from './services/auth.service';

import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OutletsComponent } from './outlets/outlets.component';
import { OutletListComponent } from './outlet-list/outlet-list.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGoodsComponent } from './admin/admin-goods/admin-goods.component';
import { AdminPinsComponent } from './admin/admin-pins/admin-pins.component';
import { GoodsComponent } from './goods/goods.component';
import { EditGoodComponent } from './edit-good/edit-good.component';
import { CreateGoodComponent } from './create-good/create-good.component';
// import { PDFDocument, rgb } from 'pdf-lib';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    NewUserComponent,
    AvatarDialogComponent,
    EditUserComponent,
    NavigationComponent,
    MainMapComponent,
    AdminUsersComponent,
    UserCabinetComponent,
    SignupComponent,
    VerifyEmailComponent,
    OrdersComponent,
    OrderListComponent,
    OutletsComponent,
    OutletListComponent,
    AdminComponent,
    AdminGoodsComponent,
    AdminPinsComponent,
    GoodsComponent,
    EditGoodComponent,
    CreateGoodComponent,
  ],
  imports: [
    BrowserModule,
    ForMaterialModule,
    AppRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyATB8N5cUVS9cW9v1hLXw2YD2X4jcw4LKs'
    // }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [UsersService, AppResolverService, OrdersService, AuthService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
