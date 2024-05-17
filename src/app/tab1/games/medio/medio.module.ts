import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedioPageRoutingModule } from './medio-routing.module';

import { MedioPage } from './medio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedioPageRoutingModule
  ],
  declarations: [MedioPage]
})
export class MedioPageModule {}
