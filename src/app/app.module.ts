import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import {ColorSketchModule} from 'ngx-color/sketch';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatRadioModule, MatListModule, MatDialogModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InteractiveColorizationComponent } from './tools/interactive-colorization/interactive-colorization.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DragAndDropDirective } from './drag-and-drop.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {DialogComponent, OptionsComponent} from './options/options.component';
import { AutoColorizationComponent } from './tools/auto-colorization/auto-colorization.component';
import { SuperResolutionComponent } from './tools/super-resolution/super-resolution.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { SliderComponent } from './slider/slider.component';
@NgModule({
  declarations: [
    AppComponent,
    InteractiveColorizationComponent,
    NavBarComponent,
    FooterComponent,
    UploadImageComponent,
    DragAndDropDirective,
    OptionsComponent,
    AutoColorizationComponent,
    SuperResolutionComponent,
    DialogComponent,
    SliderComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatBottomSheetModule,
    MatRadioModule,
    NgbModule,
    ColorSketchModule,
    AppRoutingModule,
    MatListModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
