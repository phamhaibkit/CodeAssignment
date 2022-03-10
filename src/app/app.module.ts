import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BackendService } from './backend.service';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BackendService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
