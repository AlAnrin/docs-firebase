import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import {RouterModule} from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {IconsProviderModule} from '../../icons-provider.module';
import {NzButtonModule} from 'ng-zorro-antd/button';



@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: DocumentComponent
      }
    ]),
    FormsModule,
    IconsProviderModule
  ]
})
export class DocumentModule { }
