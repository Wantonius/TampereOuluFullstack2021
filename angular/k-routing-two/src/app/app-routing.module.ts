import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home} from './home.component';
import {About} from './about.component';
import {Secret} from './secret.component';

const routes: Routes = [{
	path:"",component:Home
},{
	path:"about",component:About
},{
	path:"secret",component:Secret
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
