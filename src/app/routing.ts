import { Routes, RouterModule } from '@angular/router';
import { MyComponentComponent } from './my-component/my-component.component';
import { MyComponent2 } from './my-component2/my-component2.component';
import { FormComponent } from './form/form.component';
import { FormSubscribeComponent } from './form-subscribe/form-subscribe.component';
import { PlusMinusComponent } from './plus-minus/plus-minus.component';
import { Page404Component } from './mainComponents/page404/page404.component';
import { IfUserLogin } from './guards/ifUserLogin';
import { LoginComponent } from './mainComponents/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ReactFormComponent } from './myTests/react-form/react-form.component';
import { TestFirestoreComponent } from './myTests/test-firestore/test-firestore.component';
import { GetDataFirebaseComponent } from './dashboard/get-data-firebase/get-data-firebase.component';
import { SetDataFirebaseComponent } from './dashboard/set-data-firebase/set-data-firebase.component';


const arr: Routes = [

{path: '', redirectTo: '/login', pathMatch: 'full'},

{path: 'home', component: MyComponentComponent},

{path: 'login', component: LoginComponent},

{path: 'fs', component: TestFirestoreComponent},

{path: 'reactForm', component: ReactFormComponent},


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
            //    {
            //       path: 'table',
            //       component: MyComponent2,
            //    },
            // ],
         },
         {
            path: 'setData/:id',
            component: GetDataFirebaseComponent,
         },
         {
            path: 'getData',
            component: GetDataFirebaseComponent,
         },
      ],
      canActivate: [IfUserLogin]
 },

{path: 'table', component: MyComponent2,canActivate: [IfUserLogin]},

{path:'formReg', component:  FormComponent,canActivate: [IfUserLogin]},

{path:'formSub', component: FormSubscribeComponent,canActivate: [IfUserLogin]},

{path: 'plusminus', component: PlusMinusComponent,canActivate: [IfUserLogin]},
{path: 'plusminus/:number', component: PlusMinusComponent,canActivate: [IfUserLogin]},


{path: '**', component: Page404Component}

];



export const routing = RouterModule.forRoot(arr);