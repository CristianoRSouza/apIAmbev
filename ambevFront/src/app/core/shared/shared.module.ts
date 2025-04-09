import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { MaterialModule } from './material.module';

const mModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  PoModule,
  MaterialModule
]

@NgModule({
  imports: mModules,
  exports: mModules
})
export class SharedModule { }
