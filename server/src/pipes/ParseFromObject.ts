import { ArgumentMetadata, PipeTransform } from '@nestjs/common';


type TParseFormDataJsonOptions<T> = {
  fields?: [keyof T];
};

export class ParseFromObject<T> implements PipeTransform {
  constructor(private options?: TParseFormDataJsonOptions<T>) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    const { fields } = this.options;

    for (const prop in value) {
      if(fields.find(f => f === prop)) {
          value[prop] = JSON.parse(value[prop])
      }
    }

    return value
  }

}
