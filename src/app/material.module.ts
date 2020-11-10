import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

const MaterialComponents = [MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule,
   MatNativeDateModule, MatTableModule, MatSelectModule, MatListModule, MatGridListModule, MatSortModule
]

@NgModule({

  // imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
