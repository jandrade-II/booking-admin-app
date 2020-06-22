  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SpaListComponent } from './spa-list/spa-list.component';
// import { VendorsComponent } from './vendors/vendors.component';
import { RestaurantComponent } from './restaurant.component'
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
// import { SpaAddComponent } from './spa-add/spa-add.component'
// import { FranchiseAddComponent } from './franchise-add/franchise-add.component';

const routes: Routes = [{
  path: '',
  component: RestaurantComponent,
  children: [
    {
      path: 'list',
      component: RestaurantListComponent,
    },
    {
      path: 'add',
      component: RestaurantAddComponent,
    },
    // {
    //   path: 'edit/:id',
    //   component: FranchiseAddComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule { }


export const routedComponents = [
    RestaurantComponent,
    RestaurantListComponent,
    RestaurantAddComponent,
    // SpaListComponent,
    // SpaAddComponent
//   VendorsComponent
];