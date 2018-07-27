import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';

import { UserLoginComponent } from './passport/login/login.component';
import { AuthenticationService } from './passport/login/login.service';


const COMPONENTS = [
  DashboardV1Component,
  DashboardAnalysisComponent,
  DashboardMonitorComponent,
  DashboardWorkplaceComponent,
  UserLoginComponent
  // LoginComponent
  // passport pages

  // single pages

];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  providers: [AuthenticationService],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
