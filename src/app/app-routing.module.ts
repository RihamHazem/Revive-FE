import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadImageComponent} from './upload-image/upload-image.component';
import {OptionsComponent} from './options/options.component';
import {AutoColorizationComponent} from './tools/auto-colorization/auto-colorization.component';
import {SuperResolutionComponent} from './tools/super-resolution/super-resolution.component';
import {InteractiveColorizationComponent} from './tools/interactive-colorization/interactive-colorization.component';

const routes: Routes = [
  { path: '', component: UploadImageComponent },
  {
    path: 'tools',
    component: OptionsComponent
  },
  {
    path: 'tools/auto',
    component: AutoColorizationComponent
  },
  {
    path: 'tools/super',
    component: SuperResolutionComponent
  },
  {
    path: 'tools/inter',
    component: InteractiveColorizationComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
