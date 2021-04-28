import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './routing';
import { MyComponentComponent } from './my-component/my-component.component';
import { MyComponent2 } from './my-component2/my-component2.component';
import { TableRowComponent } from './table-row/table-row.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form/form.component';
import { FormSubscribeComponent } from './form-subscribe/form-subscribe.component';
import { SelectColorComponent } from './select-color/select-color.component';
import { NavBarComponent } from './mainComponents/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SetcolorComponent } from './setcolor/setcolor.component';
import { ShowColorComponent } from './show-color/show-color.component';
import { PlusMinusComponent } from './plus-minus/plus-minus.component';
import { BtnPlusMinComponent } from './plus-minus/btn-plus-min/btn-plus-min.component';
import { Page404Component } from './mainComponents/page404/page404.component';
import { LoginComponent } from './mainComponents/login/login.component';
import { BtnNumbersComponent } from './plus-minus/btn-numbers/btn-numbers.component';
import { IfUserLogin } from './guards/ifUserLogin';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NavBarSideComponent } from './mainComponents/nav-bar-side/nav-bar-side.component';
import { ReactFormComponent } from './myTests/react-form/react-form.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TestFirestoreComponent } from './myTests/test-firestore/test-firestore.component';
import { SetDataFirebaseComponent } from './dashboard/set-data-firebase/set-data-firebase.component';
import { GetDataFirebaseComponent } from './dashboard/get-data-firebase/get-data-firebase.component';
import { NavBar2Component } from './mainComponents/nav-bar2/nav-bar2.component';
import { SpinnerComponent } from './mainComponents/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SearchPipe } from './search.pipe';
import { TimeStampToDatePipe } from './pipes/time-stamp-to-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    MyComponent2,
    TableRowComponent,
    FormComponent,
    FormSubscribeComponent,
    SelectColorComponent,
    NavBarComponent,
    SetcolorComponent,
    ShowColorComponent,
    PlusMinusComponent,
    BtnPlusMinComponent,
    Page404Component,
    LoginComponent,
    BtnNumbersComponent,
    DashboardComponent,
    NavBarSideComponent,
    ReactFormComponent,
    TestFirestoreComponent,
    SetDataFirebaseComponent,
    GetDataFirebaseComponent,
    NavBar2Component,
    SpinnerComponent,
    SearchPipe,
    TimeStampToDatePipe,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    routing,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,  
      
  ],

  providers: [IfUserLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
