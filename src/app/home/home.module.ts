import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]),
    CommonModule
  ],

})
export class HomeModule { }
