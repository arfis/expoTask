import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterComponent } from './components/customer-filter/customer-filter.component';
import { StepComponent } from './components/step/step.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StepHeaderComponent } from './components/step-header/step-header.component';
import { StepPageComponent } from './container/step-page/step-page.component';
import { StepConfigurationComponent } from './components/step-configuration/step-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFilterComponent,
    StepComponent,
    StepHeaderComponent,
    StepPageComponent,
    StepConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
