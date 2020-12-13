import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { SharedModule } from './components/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ConstantService } from './services/constant.service';
import { ConfirmacionDialogComponent } from './components/shared/confirmacion-dialog/confirmacion-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  
  providers: [ConstantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
