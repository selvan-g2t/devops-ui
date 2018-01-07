import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment'
@Pipe({
  name: 'localToUtc'
})
export class LocalToUTcPipe {
  transform(value: string) {
    return moment(value).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }
}