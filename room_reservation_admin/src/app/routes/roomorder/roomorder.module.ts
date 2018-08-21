import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { RoomOrderRoutingModule } from './roomorder-routing.module';

import { RoomOrderComponent } from './roomorder.component';
import { RoomOrderListComponent } from './list/list.component';
import { RoomOrderFormComponent } from './form/form.component';
import { RoomOrderService } from '../roomorder/service/roomorder.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, RoomOrderRoutingModule, MainPipe ],
  declarations: [
    RoomOrderComponent,
    RoomOrderListComponent,
    RoomOrderFormComponent
  ],
  providers: [
    RoomOrderService
  ]
})
export class RoomOrderModule { }

