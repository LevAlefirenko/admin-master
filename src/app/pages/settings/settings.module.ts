import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { settingsRoutes } from './settings.routes';
import { CommonModule } from '@angular/common';
import { TabModule } from '../../components/tab';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        TabModule,
        MatButtonToggleModule,
        RouterModule.forChild(settingsRoutes),
    ],
})
export class SettingsModule {}
