import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { FormsModule } from '@angular/forms'; // Импортируем FormsModule
// UI5 Web Components For Angular
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { LabelComponent } from '@ui5/webcomponents-ngx/main/label';
import { ButtonComponent } from '@ui5/webcomponents-ngx/main/button';
import { InputComponent } from '@ui5/webcomponents-ngx/main/input';


@NgModule({
  declarations: [
    AppComponent,
    InputMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LabelComponent,
    InputComponent,
    ButtonComponent,
    Ui5WebcomponentsModule
  ],
  providers: [
    provideClientHydration()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
