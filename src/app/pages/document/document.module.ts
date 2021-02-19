import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: DocumentComponent
      }
    ])
  ]
})
export class DocumentModule { }
