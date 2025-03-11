import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '**', redirectTo: 'data-table' },
    { path: 'data-table', loadComponent: () => import('./features/table-view/table-view.component').then(m => m.TableViewComponent) },
];
