import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { LoginComponent } from './login/login.component';
import { GlobalService } from './GlobalService';
import { AuthGuard } from './auth-guard.service';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';



import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

import { Angular2SocialLoginModule } from 'angular2-social-login';


import { ScrollToModule} from 'ng2-scroll-to';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RecaptchaModule ,RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
declare let ga: Function;
import { ShareButtonModule } from '@ngx-share/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Chart1Component } from './chart1/chart1.component';
import { Chart2Component } from './chart2/chart2.component';
import { Chart3Component } from './chart3/chart3.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(AppRoutes,{useHash:false}),
    Ng4LoadingSpinnerModule,
    Angular2SocialLoginModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    HttpModule,
    HttpClientModule,
    ScrollToModule,
    BrowserModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    ShareButtonModule.forRoot(),
    NgbModule.forRoot(),
    ChartModule.forRoot(highcharts)


  ],

  providers: [
             AuthGuard,   
             ToasterService,
             GlobalService, 
             AuthGuard,
             Ng4LoadingSpinnerService,
             // below line is use for add # in url
             {
                 provide:
                 LocationStrategy,
                 useClass: HashLocationStrategy
             },

              {
             provide: RECAPTCHA_SETTINGS,
              useValue: { 
                siteKey: '6LdAm04UAAAAABRwz2yNS5P2yLKpxxL47nDqN_sT',
                          } 
             },

             DatePipe],
  bootstrap: [AppComponent],
})

export class AppModule { 
  constructor(){}
}

