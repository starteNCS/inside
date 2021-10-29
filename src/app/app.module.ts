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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { SettingsComponent } from './components/cards/settings/settings.component';
import { CanvasComponent } from './components/cards/canvas/canvas.component';
import { DebuggerComponent } from './components/cards/debugger/debugger.component';
import { RaycastComponent } from './components/cards/settings/raycast/raycast.component';
import { PageComponent } from './components/page/page.component';
import { TutorialComponent } from './components/cards/tutorial/tutorial.component';
import { InPolygonComponent } from './components/cards/settings/in-polygon/in-polygon.component';
import { NonZeroComponent } from './components/cards/settings/non-zero/non-zero.component';
import { WindingNumberComponent } from './components/cards/settings/winding-number/winding-number.component';
import { CountDialogComponent } from './components/cards/debugger/count-dialog/count-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    CanvasComponent,
    DebuggerComponent,
    RaycastComponent,
    InPolygonComponent,
    TutorialComponent,
    PageComponent,
    NonZeroComponent,
    WindingNumberComponent,
    CountDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    MatTooltipModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
