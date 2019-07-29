import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductosListComponent } from './components/productos-list.component';
import { ProductoAddComponent } from './components/producto-add.component'
import { ProductoDetailComponent } from './components/producto-detail.component';
import { ProductoEditComponent } from './components/producto-edit.component';

const appRoutes: Routes = [
     {path: '', component: HomeComponent}
    ,{path: 'home', component: HomeComponent}
    ,{path: 'productos', component: ProductosListComponent }
    ,{path: 'crear-producto', component: ProductoAddComponent }
    ,{path: 'producto/:id', component: ProductoDetailComponent }
    ,{path: 'editar-producto/:id', component: ProductoEditComponent}
    ,{path: '**', component: ErrorComponent}
];

//carga los servicios necesarios del router para que todas las rutas funcionen
export const appRoutingProviders: any[] = [];
//forRoot recive un array de rutas, y establece la configuracion de rutas en nuestra aplicacion con el framework de angular 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

