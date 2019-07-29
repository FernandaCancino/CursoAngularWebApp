import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoServices } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
    selector: 'producto-edit'
    ,templateUrl: '../views/producto-add.html'
    ,providers: [ ProductoServices ]  
})

export class ProductoEditComponent{
    
    public titulo:string;
    public producto: Producto;
    public filesToUpload;
    public resultUpload;

    constructor(
         private _productoService: ProductoServices
        ,private _route: ActivatedRoute
        ,private _router: Router
    ){
        this.titulo = 'Editar producto';
        this.producto = new Producto(1, '', '', 1, '');
    }


}