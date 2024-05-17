import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DificilPageRoutingModule } from './dificil-routing.module';

import { DificilPage } from './dificil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DificilPageRoutingModule
  ],
  declarations: [DificilPage]
})
export class DificilPageModule {}
