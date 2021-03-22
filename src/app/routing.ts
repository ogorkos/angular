import { Routes, RouterModule } from '@angular/router';
import { MyComponentComponent } from './my-component/my-component.component';
import { MyComponent2 } from './my-component2/my-component2.component';
import { FormComponent } from './form/form.component';
import { FormSubscribeComponent } from './form-subscribe/form-subscribe.component';
import { PlusMinusComponent } from './plus-minus/plus-minus.component';
import { Page404Component } from './mainComponents/page404/page404.component';


const arr: Routes = [

{path: '', redirectTo: '/home', pathMatch: 'full'},

{path: 'home', component: MyComponentComponent},

{path: 'table', component: MyComponent2},

{path:'formReg', component:  FormComponent},

{path:'formSub', component: FormSubscribeComponent},

{path: 'plusminus', component: PlusMinusComponent},

{path: '**', component: Page404Component}

];



export const routing = RouterModule.forRoot(arr);