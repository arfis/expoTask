import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ExpoTask';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'sk']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
