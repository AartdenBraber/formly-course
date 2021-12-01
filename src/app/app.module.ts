import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function minValidationMessage(err, field: FormlyFieldConfig) {
  console.log(err, field);
  return `Please provide a value bigger than ${err.min}. You provided ${err.actual}.`;
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        {
          name: 'required',
          message: `This is a required field`,
        },
        {
          name: 'min',
          message: minValidationMessage,
        },
      ],
    }),
    FormlyMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
