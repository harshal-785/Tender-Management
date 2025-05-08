import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TendersComponent } from './components/tenders/tenders.component';
import { CreateTenderComponent } from './components/create-tender/create-tender.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CategoryComponent } from './components/master/category/category.component';
import { CountryComponent } from './components/master/country/country.component';
import { IndustryTypeComponent } from './components/master/industry-type/industry-type.component';
import { StatusComponent } from './components/master/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    TendersComponent,
    CreateTenderComponent,
    AnalyticsComponent,
    SettingsComponent,

     // Declare Master components here
     CategoryComponent,
     CountryComponent,
     IndustryTypeComponent,
     StatusComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export { AppRoutingModule };

