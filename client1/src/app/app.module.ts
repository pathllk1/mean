import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';

import { NavbarComponent } from './pages/layout/navbar/navbar.component';
import { ExpComponent } from './pages/exp/exp.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/roles/admin/admin.component';
import { ModeratorComponent } from './pages/roles/moderator/moderator.component';
import { UserComponent } from './pages/roles/user/user.component';
import { AddComponent } from './pages/exp/add/add.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { EdtComponent } from './pages/exp/edt/edt.component';
import { DelConfComponent } from './pages/alerts/del-conf/del-conf.component';
import { PurchaseComponent } from './pages/bills/purchase/purchase.component';
import { AddItemComponent } from './pages/bills/purchase/add-item/add-item.component';
import { EdtItemComponent } from './pages/bills/purchase/edt-item/edt-item.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExpComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    AdminComponent,
    ModeratorComponent,
    UserComponent,
    AddComponent,
    EdtComponent,
    DelConfComponent,
    PurchaseComponent,
    AddItemComponent,
    EdtItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatAutocompleteModule,
    jqxGridModule,
    jqxButtonModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
