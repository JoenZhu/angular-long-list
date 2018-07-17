import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LongListComponent } from '../long-list/long-list.component';
import { ScrollDirective } from '../directives/scroll.directive';

@NgModule({
  declarations: [
    AppComponent, LongListComponent, ScrollDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
