import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientGuard } from './guards/client.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { HomeGuard } from './guards/home.guard';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    OneSignal,
    ClientGuard,
    EmployeeGuard,
    HomeGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }