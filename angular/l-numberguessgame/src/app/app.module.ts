import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
import {MatSliderModule} from '@angular/material/slider'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input'; 
import {GameMechanics} from './services/gamemechanics.service';
import {StartScreen} from './components/startscreen.component';
import {GameScreen} from './components/gamescreen.component';
import {WinDialog} from './components/windialog.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
	StartScreen,
	WinDialog,
	GameScreen
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	FormsModule,
	MatButtonModule,
	MatSliderModule,
	MatDialogModule,
	MatInputModule
  ],
  providers: [GameMechanics],
  bootstrap: [AppComponent]
})
export class AppModule { }
