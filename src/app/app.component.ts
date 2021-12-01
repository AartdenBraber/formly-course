import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { concatMap, startWith } from 'rxjs';
import { DataService } from './services/data.service';

interface Model {
  id: number;
  firstName: string;
  age: number;
  nationId: number;
  cityId: number;
  ip: string | null;
}

export function IpValidator(control: FormControl): ValidationErrors | null {
  return !control.value || /ip/.test(control.value) ? null : { ip: true };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'formly-course';

  form = new FormGroup({});
  model: Model = {
    id: 123,
    firstName: 'Aart',
    age: 29,
    nationId: 2,
    cityId: 1,
    ip: null,
  };
  fields: Array<FormlyFieldConfig & { key: keyof Model }> = [
    {
      key: 'id',
    },
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        label: 'FirstName',
        required: true,
      },
      hooks: {
        onInit: (field) => {
          if (!field?.templateOptions) return;
          field.templateOptions.label = 'firstname changed';
        },
      },
    },
    {
      key: 'age',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Age',
        min: 18,
      },
      validation: {
        messages: {
          min: `Sorry, you have to be older than 18`,
        },
      },
    },
    {
      key: 'nationId',
      type: 'select',
      templateOptions: {
        label: 'Nation',
        options: this.dataService.getNations(),
      },
    },
    {
      key: 'cityId',
      type: 'select',
      templateOptions: {
        label: 'City',
        options: [],
      },
      expressionProperties: {
        'model.cityId': (model: Model) =>
          model.nationId ? null : model.cityId,
      },
      hideExpression: (model: Model) => !model.nationId,
      hooks: {
        onInit: (field) => {
          if (!field?.templateOptions) return;

          field.templateOptions.options = field.form
            ?.get('nationId')
            ?.valueChanges.pipe(
              startWith(this.model.nationId),
              concatMap((nationId) => this.dataService.getCities(nationId))
            );
        },
      },
    },
    {
      key: 'ip',
      type: 'input',
      templateOptions: {
        label: 'IP address',
        required: true,
      },
      validators: {
        validation: [IpValidator],
        ip2: {
          expression: (c: FormControl) => !c.value || /ip2/.test(c.value),
          message: (err, field: FormlyFieldConfig) =>
            `${field.formControl?.value} doesn't contain the string 'ip2`,
        },
      },
      validation: {
        messages: {
          ip: `You have to enter a valid IP address (which, as we all know, has the string 'ip' in it).`,
        },
      },
    },
  ];

  constructor(private dataService: DataService) {}

  handleSubmit() {
    console.log('submitted', this.form.value);
  }
}
