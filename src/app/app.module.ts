import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// material components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatToolbarModule, MatDialogModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatTooltipModule, MatSlideToggleModule, MatProgressSpinnerModule, MatSidenavModule, MatIconModule, MatProgressBarModule, MatPaginatorModule, MatButtonModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';

// router
import { AppRouterModule } from './app-router/app-router.module';

//services
import { ConnectionService } from './services/connection.service';
import { InterceptorService } from './services/interceptor.service';
import { DialogService } from './common/notification/dialog/dialog.service';

// app sections
import { HomeComponent } from './views/home/home.component';
import { DialogComponent } from './common/notification/dialog/dialog.component';

import { ActionBarComponent } from './common/action-bar/action-bar.component';
import { TableListComponent } from './common/tables/table-list/table-list.component';
import { DynamicFormComponent } from './common/forms/dynamic-form/dynamic-form.component';
import { CheckboxComponent } from './common/input/checkbox/checkbox.component';

import { AdjustComponent } from './common/notification/dialog/adjust/adjust.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ViewTimingsComponent } from './views/view-timings/view-timings.component';
import { RowPaginatorComponent } from './views/view-timings/row-paginator/row-paginator.component';

import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import { TimePipe } from './pipes/time.pipe';
import { DataSourcePipe } from './pipes/data-source.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    ActionBarComponent,
    AdjustComponent,
    TableListComponent,
    DynamicFormComponent,
    CheckboxComponent,
    FilterPipe,
    ViewTimingsComponent,
    RowPaginatorComponent,
    TimePipe,
    DataSourcePipe,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatChipsModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTableModule,
    CdkTableModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [ConnectionService, DialogService, { provide: APP_BASE_HREF, useValue: '/' }, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  entryComponents: [ DialogComponent, AdjustComponent ],
})
export class AppModule { }
