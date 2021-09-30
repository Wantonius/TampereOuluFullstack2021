import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
import {MatSliderModule} from '@angular/material/slider'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {GameMechanics} from './services/gamemechanics.service';
import {StartScreen} from './components/startscreen.component';

@NgModule({
  declarations: [
    AppComponent,
	StartScreen
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	MatButtonModule,
	MatSliderModule,
	MatDialogModule
  ],
  providers: [GameMechanics],
  bootstrap: [AppComponent]
})
export class AppModule { }
