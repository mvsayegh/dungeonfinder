import { Injectable } from '@angular/core';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';

@Injectable()
export class MissingTranslationService implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return `missing translation for: ${params.key}`;
  }
}
