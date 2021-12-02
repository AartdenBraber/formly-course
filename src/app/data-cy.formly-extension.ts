import { FormlyExtension } from '@ngx-formly/core';

export const dataCyExtension: FormlyExtension = {
  prePopulate(field) {
    field.templateOptions = {
      ...(field.templateOptions || {}),
      attributes: {
        'data-cy': field.key?.toString(),
      },
    };
  },
};
