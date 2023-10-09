import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DraggableComponent } from './components/draggable/draggable.component';
import { UserCardComponent } from './components/live-search/components/user-card/user-card.component';
import { LiveSearchComponent } from './components/live-search/live-search.component';
import { SavingIndicatorComponent } from './components/saving-indicator/saving-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    DraggableComponent,
    LiveSearchComponent,
    UserCardComponent,
    SavingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
