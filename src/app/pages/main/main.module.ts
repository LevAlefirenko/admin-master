import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../common/material/material.module';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { AuthGuard } from '../../guards/auth.guard';

@NgModule({
    declarations: [MainComponent],
    providers: [AuthGuard],
    imports: [CommonModule, MaterialModule, RouterModule.forChild(mainRoutes)],
})
export class MainModule {}
