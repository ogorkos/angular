import { Routes, RouterModule } from '@angular/router';
import { MyComponentComponent } from './myTests/my-component/my-component.component';
import { MyComponent2 } from './myTests/my-component2/my-component2.component';
import { FormComponent } from './myTests/form/form.component';
import { FormSubscribeComponent } from './myTests/form-subscribe/form-subscribe.component';
import { PlusMinusComponent } from './plus-minus/plus-minus.component';
import { Page404Component } from './mainComponents/page404/page404.component';
import { IfUserLogin } from './guards/ifUserLogin';
import { LoginComponent } from './mainComponents/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ReactFormComponent } from './myTests/react-form/react-form.component';
import { TestFirestoreComponent } from './myTests/test-firestore/test-firestore.component';
import { GetDataFirebaseComponent } from './dashboard/get-data-firebase/get-data-firebase.component';
import { SetDataFirebaseComponent } from './dashboard/set-data-firebase/set-data-firebase.component';
import { SelectColorComponent } from './myTests/select-color/select-color.component';
import { AddContactsComponent } from './dashboard/add-contacts/add-contacts.component';
import { ViewContactsComponent } from './dashboard/view-contacts/view-contacts.component';


const arr: Routes = [

{path: '', redirectTo: '/login', pathMatch: 'full'},

{path: 'home', component: MyComponentComponent},

{path: 'login', component: LoginComponent},

// {path: 'fs', component: TestFirestoreComponent},

// {path: 'reactForm', component: ReactFormComponent},


{path: 'dashboard', component: DashboardComponent,
      children: [
         {
            path: 'setData', 
            component: SetDataFirebaseComponent,
            // children: [
            //    {
            //       path: 'fs', 
            //       component: TestFirestoreComponent,
            //    },
            // ],
         },
         {
            path: 'setData/:id',
            component: SetDataFirebaseComponent,
         },
         {
            path: 'getData',
            component: GetDataFirebaseComponent,
         },
         {
            path: 'addContacts', 
            component: AddContactsComponent,
         },
         {
            path: 'addContacts/:id',
            component: AddContactsComponent,
         },
         {
            path: 'viewContacts',
            component: ViewContactsComponent,
         },
      ],
      canActivate: [IfUserLogin]
 },

 

// {path: 'table', component: MyComponent2,canActivate: [IfUserLogin]},

// {path:'formReg', component:  FormComponent,canActivate: [IfUserLogin]},

// {path:'formSub', component: FormSubscribeComponent,canActivate: [IfUserLogin]},

// {path: 'plusminus', component: PlusMinusComponent,canActivate: [IfUserLogin]},
// {path: 'plusminus/:number', component: PlusMinusComponent,canActivate: [IfUserLogin]},

// {path:'color', component: SelectColorComponent,canActivate: [IfUserLogin]},

{path: '**', component: Page404Component}

];



export const routing = RouterModule.forRoot(arr);