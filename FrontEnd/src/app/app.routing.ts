import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Chart1Component } from './chart1/chart1.component';
import { Chart2Component } from './chart2/chart2.component';
import { Chart3Component } from './chart3/chart3.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: LoginComponent
    },
    {
        path: 'chart1',
        component: Chart1Component
    },
    {
        path: 'chart2',
        component: Chart2Component
    },
    {
        path: 'chart3',
        component: Chart3Component
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules });
