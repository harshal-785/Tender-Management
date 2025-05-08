import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TendersComponent } from './components/tenders/tenders.component';
import { CreateTenderComponent } from './components/create-tender/create-tender.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CategoryComponent } from './components/master/category/category.component';
import { CountryComponent } from './components/master/country/country.component';
import { IndustryTypeComponent } from './components/master/industry-type/industry-type.component';
import { StatusComponent } from './components/master/status/status.component';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tenders', component: TendersComponent },
  { path: 'add-tender', component: CreateTenderComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'settings', component: SettingsComponent },

   // Master section routes
   { path: 'master/category', component: CategoryComponent },
   { path: 'master/country', component: CountryComponent },
   { path: 'master/industry-type', component: IndustryTypeComponent },
   { path: 'master/status', component: StatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }