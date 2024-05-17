import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacilPageRoutingModule } from './facil-routing.module';

import { FacilPage } from './facil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacilPageRoutingModule
  ],
  declarations: [FacilPage]
})
export class FacilPageModule {}
