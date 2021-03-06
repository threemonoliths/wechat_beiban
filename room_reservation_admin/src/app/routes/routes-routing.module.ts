import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';


// passport pages
import { UserLoginComponent } from './passport/login/login.component';

// single pages
// import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

import { AuthGuard } from './auth.guard';
import { ACLGuard } from './acl.guard';


const routes: Routes = [

    {
        path: '',
        component: LayoutDefaultComponent,
        children: [
            
            { path: 'dict', loadChildren: './dictionary/dict.module#DictModule' },
            { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'roomlayout', loadChildren: './roomlayout/roomlayout.module#RoomLayoutModule' },
            { path: 'car', loadChildren: './car/car.module#CarModule' },
            { path: 'room', loadChildren: './room/room.module#RoomModule' },
            { path: 'carorder', loadChildren: './carorder/carorder.module#CarOrderModule' },                    
            { path: 'order', loadChildren: './roomorder/roomorder.module#RoomOrderModule' },
            
            

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
    // 单页不包裹Layout
    // { path: 'callback/:type', component: CallbackComponent },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },

    {
		path: '**', // fallback router must in the last
		component: UserLoginComponent
	}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
})
export class RouteRoutingModule { }
