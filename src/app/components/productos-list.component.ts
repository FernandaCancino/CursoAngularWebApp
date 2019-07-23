import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoServices } from '../services/producto.service'
import { Producto } from '../models/producto';

@Component({
    selector        : 'productos-list'
    ,templateUrl    : '../views/productos-list.html'
    //injectamos a nuestro componente el servicio de producto, y tambien se injecta como parametro en el contructor
    ,providers      : [ProductoServices]
})

export class ProductosListComponent{
    public titulo: string;
    public productos: Producto[];

    constructor(
         private _route: ActivatedRoute
        ,private _router: Router
        ,private _productoServices: ProductoServices
    ){
        this.titulo = 'Listado de Productos';
    }

    ngOnInit(){
        console.log('productos-list.component.ts cargado');
        // alert(this._productoServices.getProductos());
        this._productoServices.getProductos().subscribe(
            result=>{
                
                // console.log(result);

                if(result['code'] != 200){
                    console.log(result);
                }else{
                    this.productos = result['data'];
                }

            }
            ,
            error =>{
                console.log(<any>error);
            }
        );
    }

}