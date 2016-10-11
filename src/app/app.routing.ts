import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';

const appRoutes: Routes = [

    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'recipes',
        component: RecipesComponent
    },
    {
        path: 'new',
        component: RecipeDetailComponent
    },
    {
        path: 'detail/:id',
        component: RecipeDetailComponent
    },
    {
        path: 'view/:id',
        component: RecipeViewComponent
    },
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);