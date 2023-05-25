import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormComponent } from './form/form.component';
import { ImagePreviewComponent } from './form/image-preview/image-preview.component';

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    FormComponent,
    ImagePreviewComponent
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
