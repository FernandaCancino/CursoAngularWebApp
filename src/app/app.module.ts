import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';

//rutas
import { routing, appRoutingProviders } from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent} from './components/error.component';
import { ProductosListComponent } from './components/productos-list.component';
import { ProductoAddComponent } from './components/producto-add.component';
import { ProductoDetailComponent } from './components/producto-detail.component';
import { ProductoEditComponent } from '../app/components/producto-edit.component';



@NgModule({
  declarations: [
     AppComponent
    ,HomeComponent
    ,ErrorComponent
    ,ProductosListComponent
    ,ProductoAddComponent
    ,ProductoDetailComponent
    ,ProductoEditComponent
  ],
  imports: [
     BrowserModule
    ,FormsModule
    // ,AppRoutingModule
    ,HttpClientModule
    ,routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
