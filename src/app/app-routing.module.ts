import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InputMessageComponent} from './input-message/input-message.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
