import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectFormlyComponent extends FieldType {
  constructor() {
    super();
  }

  castToAny(wronglyTypedThing: any) {
    return wronglyTypedThing;
  }
}
