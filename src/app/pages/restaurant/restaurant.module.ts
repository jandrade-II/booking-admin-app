import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { RestaurantRoutingModule, routedComponents  } from './restaurant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbTreeGridModule ,
  NbAccordionModule,
  NbButtonModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  NbRadioModule,
  NbSelectModule
  
} from '@nebular/theme';

// import { TagInputModule } from 'ngx-chips';
// import { NgxGeoautocompleteModule } from 'ngx-geoautocomplete';

@NgModule({
  declarations: [
    ...routedComponents,

  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbAccordionModule,
    NbButtonModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule, NbUserModule,
    NbRadioModule,
    FormsModule,
    ReactiveFormsModule,
    RestaurantRoutingModule,
    // TagInputModule,
    NbSelectModule,
    // NgxGeoautocompleteModule.forRoot()

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class RestaurantModule { }
