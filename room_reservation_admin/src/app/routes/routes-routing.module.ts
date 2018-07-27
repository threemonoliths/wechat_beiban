import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';

import { UserLoginComponent } from './passport/login/login.component';
import { AuthGuard } from './auth.guard';
import { ACLGuard } from './acl.guard';

const routes: Routes = [
    {
      path: '',
      component: LayoutDefaultComponent,
      children: [
        { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
        { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
        { path: 'dashboard/v1', component: DashboardV1Component },
        { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
        { path: 'dashboard/monitor', component: DashboardMonitorComponent },
        { path: 'dashboard/workplace', component: DashboardWorkplaceComponent },
        {path : 'roomlayout',loadChildren: './roomlayout/roomlayout.module#RoomLayoutModule'},

      ],
      canActivate: [AuthGuard]
    },

    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: UserLoginComponent }
        ]
    },
  
  { path: '**', redirectTo: 'passport/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
