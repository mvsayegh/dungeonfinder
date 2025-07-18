import { HttpClient } from '@angular/common/http';
import { MissingTranslationService } from '@core/services';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModuleConfig,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const DEFAULT_LANGUAGE = 'br';
const TRANSLATIONS_PATH = '../../../assets/i18n/';

const translationLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, TRANSLATIONS_PATH, '.json');

export const translateConfig: TranslateModuleConfig = {
  defaultLanguage: DEFAULT_LANGUAGE,
  missingTranslationHandler: {
    provide: MissingTranslationHandler,
    useClass: MissingTranslationService,
  },
  loader: {
    provide: TranslateLoader,
    useFactory: translationLoaderFactory,
    deps: [HttpClient],
  },
};
