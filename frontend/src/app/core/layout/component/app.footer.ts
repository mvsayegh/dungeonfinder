import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `<div class="layout-footer">Todos os direitos reservados à {{ appName }} &copy; {{ getYear() }}</div>`,
})
export class AppFooter {
  appName = environment.appInfo.name;
  getYear() {
    const year = new Date().getFullYear();
    return year;
  }
}
