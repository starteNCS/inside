import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SettingsComponent } from './components/cards/settings/settings.component';
import { CanvasComponent } from './components/cards/canvas/canvas.component';
import { DebuggerComponent } from './components/cards/debugger/debugger.component';
import { RaycastComponent } from './components/cards/settings/raycast/raycast.component';
import { PageComponent } from './components/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    CanvasComponent,
    DebuggerComponent,
    RaycastComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
